import pandas as pd
import datetime as dt
from pathlib import Path
from django.conf import settings

from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from api.models import Local, Responsible, Environment

class Command(BaseCommand):
    def add_arguments(self, parser):
        default_file_path = Path(settings.BASE_DIR) / "api" / "population" / "ambientes.csv"
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
        responsibles_ids = df['responsavel'].astype(int).unique()
        responsibles_mapping = {
            responsible.id: responsible
            for responsible in Responsible.objects.filter(id__in=responsibles_ids)
        }

        locals_ids = df['local'].astype(int).unique()
        local_mapping = {
            local.id: local 
            for local in Local.objects.filter(id__in=locals_ids)
        }

        if opts["update"]: 
            for row in df.itertuples(index=False):
                local_id = int(row.local)
                local_instance = local_mapping.get(local_id)

                responsible_id = int(row.responsavel)
                responsible_instance = responsibles_mapping.get(responsible_id)
                
                if not local_instance:
                    self.stdout.write(self.style.ERROR(f"Local ID {local_id} não encontrado. Pulando..."))
                    continue
                    
                if not responsible_instance:
                    self.stdout.write(self.style.ERROR(f"Responsible ID {responsible_id} não encontrado. Pulando..."))

                obj, created = Environment.objects.update_or_create(
                    mac_address=row.mac_address,
                    defaults={
                        'local': local_instance,
                        'description': row.descricao.strip(),
                        'responsible': responsible_instance
                    }
                )
                
                if created:
                    criados += 1
                else:
                    atualizados += 1
                
        else:
            # Inserção usando create() em loop (mais lento, mas funciona)
            for row in df.itertuples(index=False):
                local_id = int(row.local)
                local_instance = local_mapping.get(local_id)

                responsible_id = int(row.responsavel)
                responsible_instance = responsibles_mapping.get(responsible_id)

                
                if not local_instance:
                    self.stdout.write(self.style.ERROR(f"Local ID {local_id} não encontrado. Pulando..."))
                    continue

                if not responsible_instance:
                    self.stdout.write(self.style.ERROR(f"Responsible ID {responsible_id} não encontrado. Pulando..."))
                    continue

                Environment.objects.create(
                    local=local_instance,
                    description=row.descricao,
                    responsible=responsible_instance
                )
                criados += 1

        msg = f"Concluído. Criados: {criados}"
        if opts["update"]:
            msg += f" | Atualizados: {atualizados}"
        self.stdout.write(self.style.SUCCESS(msg))