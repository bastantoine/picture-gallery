from django.http import JsonResponse
from django.views import View
from django.shortcuts import get_object_or_404
import exifread
from rest_framework import viewsets

from api.models import (
    Album,
    Picture
)
from api.serializers import (
    AlbumSerializer,
    PictureSerializer
)


# pylint: disable=too-many-ancestors
class AlbumViewSet(viewsets.ModelViewSet):

    queryset = Album.objects.all()
    serializer_class = AlbumSerializer


# pylint: disable=too-many-ancestors
class PictureViewSet(viewsets.ModelViewSet):

    queryset = Picture.objects.all()
    serializer_class = PictureSerializer


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
