from django.apps import AppConfig


class UpostConfig(AppConfig):
    name = 'upost'

    def ready(self):
        import upost.signals
