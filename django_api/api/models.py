import uuid

from django.db import models


class Album(models.Model):

    name = models.CharField(max_length=100)
    description = models.TextField(null=True, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    parent_album = models.ForeignKey('self',
                                     null=True,
                                     blank=True,
                                     on_delete=models.CASCADE
                                    )
    is_protected = models.BooleanField(default=False)

    def __str__(self):
        return self.name


class AlbumUUID(models.Model):

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    album = models.ForeignKey(Album, on_delete=models.CASCADE)


class Picture(models.Model):

    path = models.ImageField()
    # related_name is used here to add the pictures of an album in its serializer
    album = models.ForeignKey('Album',
                              on_delete=models.CASCADE,
                              related_name='pictures'
                             )


class PictureUUID(models.Model):

    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    picture = models.ForeignKey(Picture, on_delete=models.CASCADE)
