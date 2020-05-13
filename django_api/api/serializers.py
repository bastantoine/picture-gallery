from rest_framework import serializers

from api.models import (
    Album,
    Picture
)


class AlbumSerializer(serializers.HyperlinkedModelSerializer):

    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Album
        fields = '__all__'


class PictureSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Picture
        fields = '__all__'
