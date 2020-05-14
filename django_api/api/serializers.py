from rest_framework import serializers

from api.models import (
    Album,
    Picture
)


class AlbumSerializer(serializers.ModelSerializer):

    class Meta:
        model = Album
        fields = '__all__'


class PictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Picture
        fields = '__all__'
