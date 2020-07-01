from rest_framework import serializers

from django_api.api.models import Album, Picture


class PictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Picture
        fields = '__all__'


class AlbumSerializer(serializers.ModelSerializer):

    pictures = PictureSerializer(many=True, read_only=True)
    class Meta:
        model = Album
        fields = '__all__'
