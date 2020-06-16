from django.urls import path
from rest_framework import routers

from api.views import (
    AlbumViewSet,
    PictureViewSet,
    ExifsView
)

ROUTER = routers.SimpleRouter()
ROUTER.register(r'albums', AlbumViewSet)
ROUTER.register(r'pictures', PictureViewSet)
urlpatterns = ROUTER.urls

urlpatterns += [
    path('exifs/<int:id_picture>', ExifsView.as_view()),
]
