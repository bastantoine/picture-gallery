from rest_framework.test import APIClient
from rest_framework import status
from rest_framework_simplejwt.settings import api_settings


class APIJWTClient(APIClient):
    """Custom subclass of APIClient that allows the usage of JWT as authentications in the test suite

    From https://github.com/SimpleJWT/django-rest-framework-simplejwt/pull/41/commits/a9f51ae61dca76b3f4f416471cd0292729516342
    """

    def login(self, url="/api/token/", get_response=False, token="access", auth_header_type=0, **credentials):
        """
        url: default is "/api/token/", can get string or a django reverse() method to specify login url.
        get_response: default is False, if True response object will be returned too.
        token: default is "access", specify response data token key.
        auth_header_type: default is 0, will specify which header to use for setting Authorization
                          header (can also get string for custom header)
        credentials: HTTP headers and other data.

        Returns True if login is possible, else False
                Will set Authorization header based on first element in api_settings.AUTH_HEADER_TYPES.
                Ff "get_response" is set to True, additionally will return response object too.
        """
        if auth_header_type < len(api_settings.AUTH_HEADER_TYPES):
            auth_header_type = auth_header_type
        else:
            auth_header_type = 0

        response = self.post(url, credentials, format='json')
        http_status = False
        if response.status_code == status.HTTP_200_OK:
            if isinstance(auth_header_type, int):
                auth_header_type = api_settings.AUTH_HEADER_TYPES[auth_header_type]
            self.credentials(HTTP_AUTHORIZATION="{0} {1}".format(auth_header_type, response.data[token]))
            http_status = True

        if get_response:
            return (http_status, response)

        return http_status