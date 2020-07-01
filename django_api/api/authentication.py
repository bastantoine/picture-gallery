from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import TokenError

from api.models import Album


class Authentication(JWTAuthentication):

    def authenticate(self, request):

        try:
            # First try the basic JWT authentication
            return super().authenticate(request)
        except TokenError as tokenError:
            # The authentication as raised a TokenError, this means that either
            # the token was invalid, expired or not safe to use. We should see
            # if we can still allow access to the data

            if request.path.endswith('/'):
                # The user wanted to access to api/albums/, a filter will be put
                # later to show only the non-protected albums
                return (AnonymousUser(), None)

            id_album = request.path.split('/')[-1]
            album = Album.objects.filter(id=id_album)
            if album:
                album = album[0]
                if not album.is_protected:
                    return (AnonymousUser(), None)

            return None
        except Exception as exp:
            raise exp
