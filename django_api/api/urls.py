from rest_framework import routers

from api.views import (
    AlbumViewSet,
    PictureViewSet
)

router = routers.SimpleRouter()
router.register(r'albums', AlbumViewSet)
router.register(r'pictures', PictureViewSet)
urlpatterns = router.urls
