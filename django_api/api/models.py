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

    def __str__(self):
        return self.name


class Picture(models.Model):

    path = models.ImageField()
    # related_name is used here to add the pictures of an album in its serializer
    album = models.ForeignKey('Album',
                              on_delete=models.CASCADE,
                              related_name='pictures'
                             )
