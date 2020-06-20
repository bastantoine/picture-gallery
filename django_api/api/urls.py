from django.urls import path
from rest_framework import routers

from api.views import (
    AlbumViewSet,
    PictureViewSet,
    ExifsView,
    AlbumUUIDView,
    PictureUUIDView
)

ROUTER = routers.SimpleRouter()
ROUTER.register(r'albums', AlbumViewSet)
ROUTER.register(r'pictures', PictureViewSet)
urlpatterns = ROUTER.urls

urlpatterns += [
    path('exifs/<int:id_picture>', ExifsView.as_view()),
    path('album-uuid/<int:id_album>', AlbumUUIDView.as_view()),
    path('album-uuid/<uuid:uuid>', AlbumUUIDView.as_view()),
    path('picture-uuid/<int:id_picture>', PictureUUIDView.as_view()),
    path('picture-uuid/<uuid:uuid>', PictureUUIDView.as_view()),
]
