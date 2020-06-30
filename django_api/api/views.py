from django.http import JsonResponse
from django.views import View
from django.shortcuts import (
    get_object_or_404,
    redirect
)
import exifread
from rest_framework import viewsets

from api.models import (
    Album,
    Picture,
    AlbumUUID,
    PictureUUID
)
from api.serializers import (
    AlbumSerializer,
    PictureSerializer,
)
from api.authentication import Authentication


# pylint: disable=too-many-ancestors
class AlbumViewSet(viewsets.ModelViewSet):

    authentication_classes = [Authentication]
    queryset = Album.objects.all()
    serializer_class = AlbumSerializer

    def get_queryset(self):
        user = self.request.user
        if not user.is_authenticated:
            # User is not authenticated, we should display him only the non protected albums
            return Album.objects.filter(is_protected=False)
        return Album.objects.all()


# pylint: disable=too-many-ancestors
class PictureViewSet(viewsets.ModelViewSet):

    queryset = Picture.objects.all()
    serializer_class = PictureSerializer


class AlbumUUIDView(View):

    def get(self, request, id_album=None, uuid=None):
        if not id_album and not uuid:
            # This shouldn't happen, but just in case
            return JsonResponse({})

        if uuid:
            album_uuid_obj = get_object_or_404(AlbumUUID, pk=uuid)
            return redirect('album-detail', pk=album_uuid_obj.album.id)

        album_uuid_obj = get_object_or_404(AlbumUUID, album__exact=id_album)
        return JsonResponse({
            'uuid': album_uuid_obj.uuid,
            'album': album_uuid_obj.album.id
        })


class PictureUUIDView(View):

    def get(self, request, id_picture=None, uuid=None):
        if not id_picture and not uuid:
            # This shouldn't happen, but just in case
            return JsonResponse({})

        if uuid:
            picture_uuid_obj = get_object_or_404(PictureUUID, pk=uuid)
            return redirect('picture-detail', pk=picture_uuid_obj.picture.id)

        picture_uuid_obj = get_object_or_404(PictureUUID, picture__exact=id_picture)
        return JsonResponse({
            'uuid': picture_uuid_obj.uuid,
            'picture': picture_uuid_obj.picture.id
        })


class ExifsView(View):

    def get(self, request, id_picture):
        # https://github.com/ianare/exif-py
        # https://www.awaresystems.be/imaging/tiff/tifftags/privateifd/exif.html
        keys = {
            # Camera constructor
            'Image Make': 'camera_constructor',
            # Camera model
            'Image Model': 'camera_model',
            # Lens model
            'EXIF LensModel': 'lens',
            # Exposure time
            'EXIF ExposureTime': 'exposure_time',
            # Apperture
            'EXIF ApertureValue': 'apperture',
            # ISO
            'EXIF ISOSpeedRatings': 'ISO',
            # Focal length
            'EXIF FocalLength': 'focal_length',
        }
        picture = get_object_or_404(Picture, pk=id_picture)
        tags = exifread.process_file(picture.path)
        formatted_values = {
            api_key: str(tags.get(exif_key, ''))
            for exif_key, api_key in keys.items()
        }
        return JsonResponse(formatted_values)
