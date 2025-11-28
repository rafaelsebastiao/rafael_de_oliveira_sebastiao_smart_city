import subprocess
from django.core.management.base import BaseCommand, CommandError


class Command(BaseCommand):
    def handle(self, *args, **options):
        subprocess.run("py manage.py pop_database", shell=True)
        subprocess.run('py manage.py create_super_user', shell=True)
   

