from django.contrib.auth.models import User

from rest_framework import test

from .client import APIJWTClient


class APITestCase(test.APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()
        cls.admin = User.objects.create_user('admin', 'admin@admin.com', 'admin')
        cls.admin.save()

        cls.client = APIJWTClient()
        cls.auth_client = APIJWTClient()
        cls.auth_client.login(username='admin', password='admin')
