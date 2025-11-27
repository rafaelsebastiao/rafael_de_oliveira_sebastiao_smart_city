import os
import subprocess
from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Cria um superusuário de forma não interativa.'

    def handle(self, *args, **options):
        # Define os dados do superusuário
        username = "senai"
        password = "123"
        email=""

        # Comando com argumentos: --noinput, --username, --email
        comando = [
            "py", 
            "manage.py", 
            "createsuperuser", 
            "--noinput", # Flag para modo não interativo
            f"--username={username}",
            f"--email={email}",
                    
            ]

        try:
            # NOTA: Você ainda precisa garantir que a senha seja definida.
            # O jeito mais robusto é setar a variável de ambiente DJANGO_SUPERUSER_PASSWORD
            os.environ['DJANGO_SUPERUSER_PASSWORD'] = password
            
            # Execute o comando
            resultado = subprocess.run(
                comando,
                capture_output=True,
                text=True,
                check=True
            )
            self.stdout.write(self.style.SUCCESS(f"Superusuário '{username}' criado com sucesso!"))
            # print("Saída do subprocesso:", resultado.stdout)

        except subprocess.CalledProcessError as e:
            self.stderr.write(self.style.ERROR("Erro ao criar superusuário."))
            self.stderr.write(f"Detalhes: {e.stderr}")
        except FileNotFoundError:
            self.stderr.write(self.style.ERROR("O executável 'py' ou 'python' não foi encontrado. Certifique-se de que está no seu PATH."))
