from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt import views as jwt_views

from .views import (AlbumUUIDView, AlbumViewSet, AlbumViewSetNotAuth,
                    ExifsView, PictureUUIDView, PictureViewSet)

ROUTER = routers.SimpleRouter()
ROUTER.register(r'albums', AlbumViewSet)
ROUTER.register(r'pictures', PictureViewSet)
urlpatterns = ROUTER.urls

urlpatterns += [
    path('exifs/<int:id_picture>', ExifsView.as_view(), name='exifs_view'),
    path('album-uuid/<int:id_album>', AlbumUUIDView.as_view(), name='album_uuid_view'),
    path('album-uuid/<uuid:uuid>', AlbumUUIDView.as_view(), name='album_uuid_view'),
    path('picture-uuid/<int:id_picture>', PictureUUIDView.as_view(), name='picture_uuid_view'),
    path('picture-uuid/<uuid:uuid>', PictureUUIDView.as_view(), name='picture_uuid_view'),
    path('token/',
         jwt_views.TokenObtainPairView.as_view(),
         name='token_obtain_pair'
        ),
    path('token/refresh/',
         jwt_views.TokenRefreshView.as_view(),
         name='token_refresh'
        ),
]

# Urls used only internally
urlpatterns += [
    path('p/album-detail-no-auth/<int:pk>',
         AlbumViewSetNotAuth.as_view({'get': 'retrieve'}),
         name='private_album_detail_no_auth'
        )
]
