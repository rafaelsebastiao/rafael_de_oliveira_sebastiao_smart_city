from django.db import models

class Local(models.Model):
    local = models.CharField(max_length=30, null=False, blank=False)

    def __str__(self):
        return self.local
    
class Responsible(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)

    def __str__(self):
        return self.name

class Environment(models.Model):
    local = models.ForeignKey(Local, to_field='id', on_delete=models.CASCADE)
    description = models.TextField(null=False, blank=False)
    responsible = models.ForeignKey(Responsible, to_field='id', on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.description

class Sensor(models.Model):
    TYPE_SENSORS = (
        ('temperature', 'Temperature'),
        ('luminosity', 'Luminosity'),
        ('humidity', 'Humidity'),
        ('accountant', 'Accountant')
    )

    sensor = models.CharField(null=False, blank=False, choices=TYPE_SENSORS, max_length=20)
    mac_address = models.CharField(max_length=20, null=False, blank=False)
    unity_mec = models.CharField(max_length=10, null=False, blank=False)
    latitude = models.FloatField(max_length=15, null=False, blank=False)
    longitude = models.FloatField(max_length=15, null=False, blank=False)
    status = models.BooleanField()
    environment = models.ForeignKey(Environment, to_field='id', on_delete=models.CASCADE, null=False, blank=False)

    def __str__(self):
        return self.sensor

class History(models.Model):
    sensor = models.ForeignKey(Sensor, to_field='id', on_delete=models.CASCADE, null=False, blank=False)
    value = models.FloatField(null=False, blank=False)
    timestamp = models.DateTimeField()

    def __str__(self):
        return self.timestamp