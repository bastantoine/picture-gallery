from rest_framework import viewsets
from rest_framework import permissions

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
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]


# pylint: disable=too-many-ancestors
class PictureViewSet(viewsets.ModelViewSet):

    queryset = Picture.objects.all()
    serializer_class = PictureSerializer
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
