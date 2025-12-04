import pandas as pd
from pathlib import Path
from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from api.models import Responsible

class Command(BaseCommand):
    def add_arguments(self, parser):
        default_file_path = Path(settings.BASE_DIR) / "api" / "population" / "nomes.csv"
        parser.add_argument('--file', default=str(default_file_path))
        parser.add_argument('--update',  action="store_true", help="Faz upsert (update_or_create) em vez de inserir em massa")

    
    @transaction.atomic
    def handle(self, *args, **opts):
        csv_path = Path(opts["file"])

        if not csv_path.exists:
            raise CommandError(f"Arquivo não encontrado: {csv_path}")
        
        df = pd.read_csv(csv_path)

        criados = 0
        atualizados = 0

        df.columns.values[0] = df.columns.values[0].strip()

        if opts["update"]: 
            for row in df.itertuples(index=False):
                obj, created = locals.objects.update_or_create(
                    name=row.nome.strip()
                    
                    )

                if created:
                    criados += 1
                else:
                    atualizados += 1

                
        else:
            # Inserção em massa (rápida)
            buffer = []
            for row in df.itertuples(index=False):
                buffer.append(Responsible(
                    name=row.nome.strip()
                    
                ))

            Responsible.objects.bulk_create(buffer, ignore_conflicts=True)
            criados = len(buffer)

        msg = f"Concluído. Criados: {criados}"
        if opts["update"]:
            msg += f" | Atualizados: {atualizados}"
        self.stdout.write(self.style.SUCCESS(msg))



