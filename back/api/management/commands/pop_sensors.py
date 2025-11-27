import pandas as pd
import datetime as dt
from datetime import timezone, datetime
from pathlib import Path
from django.conf import settings

from django.utils import timezone

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from api.models import Sensor, Environment, History
from random import randint


class Command(BaseCommand):
    def add_arguments(self, parser):
        default_file_path = Path(settings.BASE_DIR) / "api" / "population" / "sensores.csv"
        parser.add_argument('--file', default=str(default_file_path))
        parser.add_argument('--update',  action="store_true", help="Faz upsert (update_or_create) em vez de inserir em massa")

    @transaction.atomic
    def handle(self, *args, **opts):
        csv_path = Path(opts["file"])

        if not csv_path.exists():
            raise CommandError(f"Arquivo não encontrado: {csv_path}")
        
        df = pd.read_csv(csv_path)

        criados = 0
        atualizados = 0

        # Primeiro: criar um mapeamento de environment_id para instâncias
        environment_ids = df['ambiente'].astype(int).unique()
        environment_mapping = {
            env.id: env 
            for env in Environment.objects.filter(id__in=environment_ids)
        }


        # Converter nome dos sensores para inglês
        def convertNameSensor(sensor):
            NAME_SENSORS = {
                "temperature" : "temperatura",
                "luminosity" : "luminosidade",
                "humidty" : "umidade",
                "accountant" : "contador"
            }

            key_list = NAME_SENSORS.keys()

            for key in key_list: 
                if sensor == NAME_SENSORS[key]: return key

        if opts["update"]: 
            for row in df.itertuples(index=False):
                environment_id = int(row.ambiente)
                environment_instance = environment_mapping.get(environment_id)
                
                if not environment_instance:
                    self.stdout.write(self.style.ERROR(f"Environment ID {environment_id} não encontrado. Pulando..."))
                    continue
                obj, created = Sensor.objects.update_or_create(
                    mac_address=row.mac_address,
                    defaults={
                        'sensor' : convertNameSensor(row.sensor),
                        'mac_address': row.mac_address.strip(),
                        'unity_mec': row.unidade_medida.strip(),
                        'latitude': row.latitude,
                        'longitude': row.longitude,
                        'status': row.status if type(row.status) == bool else True if row.status=='ativo' else False,
                        'environment': environment_instance 
                        
                    }

                )
                
                if created:
                    criados += 1
                else:
                    atualizados += 1
                if(criados):
                    History.objects.create(
                        sensor = obj,
                        value = randint(0, 100),
                        timestamp = timezone.now()
                    )
        else:
            # Inserção usando create() em loop (mais lento, mas funciona)
            for row in df.itertuples(index=False):
                environment_id = int(row.ambiente)
                environment_instance = environment_mapping.get(environment_id)
                
                if not environment_instance:
                    self.stdout.write(self.style.ERROR(f"Environment ID {environment_id} não encontrado. Pulando..."))
                    continue

                sensor_instance = Sensor.objects.create(
                    sensor=convertNameSensor(row.sensor),
                    mac_address=row.mac_address.strip(),
                    unity_mec=row.unidade_medida.strip(),
                    latitude=row.latitude,
                    longitude=row.longitude,
                    status= row.status if type(row.status) == bool else True if row.status=='ativo' else False,
                    environment=environment_instance
                )

                criados += 1

                if(criados):
                    History.objects.create(
                        sensor = sensor_instance,
                        value = randint(0, 100),
                        timestamp = timezone.now()
                    )

        msg = f"Concluído. Criados: {criados}"
        if opts["update"]:
            msg += f" | Atualizados: {atualizados}"
        self.stdout.write(self.style.SUCCESS(msg))