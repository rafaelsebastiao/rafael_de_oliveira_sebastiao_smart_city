import subprocess
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    def handle(self, *args, **options):
        user = "senai"
        password = "123"
        
        subprocess.run("py manage.py migrate", shell=True)
        subprocess.run('py manage.py pop_locals', shell=True)
        subprocess.run('py manage.py pop_responsibles', shell=True)
        subprocess.run('py manage.py pop_environments', shell=True)
        subprocess.run('py manage.py pop_sensors', shell=True)

