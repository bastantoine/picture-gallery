import tempfile
from datetime import date
from io import BytesIO
from uuid import uuid4

from django.core.files import File
from django.test import override_settings
from django.urls import reverse
from PIL import Image

from api.models import Album, AlbumUUID, Picture, PictureUUID
from api.serializers import AlbumSerializer, PictureSerializer

from .test_case import APITestCase


class AlbumViewSetTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()

        cls.album_1 = Album(
            name='Album 1',
            start_date=date.today()
        )
        cls.album_1.save()

        cls.album_2 = Album(
            name='Album 2',
            start_date=date.today(),
            is_protected=True
        )
        cls.album_2.save()

        cls.album_serializer = AlbumSerializer()

    def test_list(self):
        # First try without being authenticated
        response = self.client.get(reverse('album-list'))
        expected = self.album_serializer.to_representation(self.album_1)
        self.assertEqual(response.status_code, 200)

        json_response = response.json()
        # We are not authenticated, so only album_1 should be returned
        self.assertEqual(len(json_response), 1)
        self.assertEqual(dict(expected), json_response[0])

        # Now try with an authenticated client
        response = self.auth_client.get(reverse('album-list'))
        expected = [
            dict(self.album_serializer.to_representation(self.album_1)),
            dict(self.album_serializer.to_representation(self.album_2))
        ]
        self.assertEqual(response.status_code, 200)

        json_response = response.json()
        # We are authenticated, so both album_1 and album_2 should be returned
        self.assertEqual(len(json_response), 2)
        self.assertEqual(expected, json_response)

    def test_retrieve(self):
        # First try a non protected album without being authenticated
        response = self.client.get(reverse('album-detail', args=[self.album_1.id]))
        self.assertEqual(response.status_code, 200)

        expected = self.album_serializer.to_representation(self.album_1)
        self.assertEqual(dict(expected), response.json())

        # Now try with a protected album without being authenticated
        response = self.client.get(reverse('album-detail', args=[self.album_2.id]))
        self.assertEqual(response.status_code, 404)

        # And now try with a protected album with an authenticated client
        response = self.auth_client.get(reverse('album-detail', args=[self.album_2.id]))
        self.assertEqual(response.status_code, 200)

        expected = self.album_serializer.to_representation(self.album_2)
        self.assertEqual(dict(expected), response.json())


class AlbumViewSetNoAuthTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()

        cls.album_1 = Album(
            name='Album 1',
            start_date=date.today()
        )
        cls.album_1.save()

        cls.album_2 = Album(
            name='Album 2',
            start_date=date.today(),
            is_protected=True
        )
        cls.album_2.save()

        cls.album_serializer = AlbumSerializer()

    def test_retrieve(self):
        # This view bypass the authentication used in the AlbumViewSet, so we should be able to
        # access to both protected and non protected albums
        response = self.client.get(reverse('private_album_detail_no_auth', args=[self.album_1.id]))
        self.assertEqual(response.status_code, 200)

        expected = self.album_serializer.to_representation(self.album_1)
        self.assertEqual(dict(expected), response.json())

        response = self.client.get(reverse('private_album_detail_no_auth', args=[self.album_2.id]))
        self.assertEqual(response.status_code, 200)

        expected = self.album_serializer.to_representation(self.album_2)
        self.assertEqual(dict(expected), response.json())


# Override the MEDIA_ROOT value to a temp dir so that tests won't fill up the real MEDIA_ROOT
# Taken from https://gist.github.com/drillbits/5432699#gistcomment-2690991
@override_settings(MEDIA_ROOT=tempfile.gettempdir())
class PictureViewSetTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()

        cls.album = Album(
            name='Album 1',
            start_date=date.today()
        )
        cls.album.save()

        cls.picture_1 = Picture(
            path=get_image_file('picture_1'),
            album=cls.album
        )
        cls.picture_1.save()

        cls.picture_2 = Picture(
            path=get_image_file('picture_2'),
            album=cls.album
        )
        cls.picture_2.save()


    def test_list(self):
        response = self.client.get(reverse('picture-list'))
        # We need to setup the request in the context of the serializer to make sure we build the
        # full links of the images
        picture_serializer = PictureSerializer(context={'request': response.wsgi_request})
        expected = [
            dict(picture_serializer.to_representation(self.picture_1)),
            dict(picture_serializer.to_representation(self.picture_2))
        ]
        self.assertEqual(response.status_code, 200)

        json_response = response.json()
        self.assertEqual(len(json_response), 2)
        self.assertEqual(expected, json_response)

    def test_retrieve(self):
        response = self.client.get(reverse('picture-detail', args={self.picture_1.id}))
        picture_serializer = PictureSerializer(context={'request': response.wsgi_request})
        expected = dict(picture_serializer.to_representation(self.picture_1))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(expected, response.json())


class AlbumUUIDViewTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()

        cls.album_1 = Album(
            name='Album 1',
            start_date=date.today()
        )
        cls.album_1.save()
        cls.uuid_album_1 = AlbumUUID(album=cls.album_1)
        cls.uuid_album_1.save()

        cls.album_2 = Album(
            name='Album 2',
            start_date=date.today(),
            is_protected=True
        )
        cls.album_2.save()
        cls.uuid_album_2 = AlbumUUID(album=cls.album_2)
        cls.uuid_album_2.save()

        cls.album_serializer = AlbumSerializer()

    def test_get(self):
        response = self.client.get(reverse('album_uuid_view', args=[uuid4()]))
        # UUID that doesn't exists
        self.assertEqual(response.status_code, 404)

        response = self.client.get(reverse('album_uuid_view', args=[self.album_1.id]))
        expected = {
            'uuid': str(self.uuid_album_1.uuid),
            'album': self.uuid_album_1.album.id
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected)

        response = self.client.get(reverse('album_uuid_view', args=[str(self.uuid_album_2.uuid)]))
        # We should be redirected to AlbumViewSetNotAuth
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('private_album_detail_no_auth', args=[self.album_2.id]))

        response = self.client.get(reverse('album_uuid_view', args=[str(self.uuid_album_2.uuid)]), follow=True)
        self.assertEqual(response.status_code, 200)
        expected = self.album_serializer.to_representation(self.album_2)
        self.assertEqual(dict(expected), response.json())


class PictureUUIDViewTestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        super().setUpTestData()

        cls.album = Album(
            name='Album 1',
            start_date=date.today()
        )
        cls.album.save()

        cls.picture_1 = Picture(
            path=get_image_file('picture_1'),
            album=cls.album
        )
        cls.picture_1.save()
        cls.uuid_picture_1 = PictureUUID(picture=cls.picture_1)
        cls.uuid_picture_1.save()

    def test_get(self):
        response = self.client.get(reverse('picture_uuid_view', args=[uuid4()]))
        # UUID that doesn't exists
        self.assertEqual(response.status_code, 404)

        response = self.client.get(reverse('picture_uuid_view', args=[self.picture_1.id]))
        expected = {
            'uuid': str(self.uuid_picture_1.uuid),
            'picture': self.uuid_picture_1.picture.id
        }
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json(), expected)

        response = self.client.get(reverse('picture_uuid_view', args=[str(self.uuid_picture_1.uuid)]))
        # We should be redirected to PictureViewSet
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.url, reverse('picture-detail', args=[self.picture_1.id]))

        response = self.client.get(reverse('picture_uuid_view', args=[str(self.uuid_picture_1.uuid)]), follow=True)
        self.assertEqual(response.status_code, 200)
        picture_serializer = PictureSerializer(context={'request': response.wsgi_request})
        expected = picture_serializer.to_representation(self.picture_1)
        self.assertEqual(dict(expected), response.json())

def get_image_file(name, ext='png', size=(50, 50), color=(256, 0, 0)):
    # Small helper to create a dummy image used for testing.
    # Taken from https://stackoverflow.com/a/58404919/10104112
    file_obj = BytesIO()
    image = Image.new("RGBA", size=size, color=color)
    image.save(file_obj, ext)
    file_obj.seek(0)
    return File(file_obj, name=name)
