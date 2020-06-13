from django.urls import path
from rest_framework import routers

from api.views import (
    AlbumViewSet,
    PictureViewSet,
    ExifsView
)

router = routers.SimpleRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'pictures', PictureViewSet)
urlpatterns = router.urls

urlpatterns += [
    path('exifs/<int:id_picture>', ExifsView.as_view()),
]
