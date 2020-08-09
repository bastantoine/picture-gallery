# picture-gallery
A simple picture gallery built using Django and Angular

# How to run it?

Run `django-compose up` in the root folder (First run can take some time)

# Settings to set

API:

In `django-api/django-api/private_setings.py` define the following:

Settings|Description
--------|-----------
[`SECRET_KEY`](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key)|The secret key of the project. Same as Django's
[`ALLOWED_HOSTS`](https://docs.djangoproject.com/en/3.0/ref/settings/#allowed-hosts)|The hosts Django can serve. Same as Django's
[`MEDIA_ROOT`](https://docs.djangoproject.com/en/3.0/ref/settings/#media-root)|Absolute path where to store the pictures uploaded. Same as Django's
[`MEDIA_URL`](https://docs.djangoproject.com/en/3.0/ref/settings/#media-url)|URL where to serve the pictures uploaded. Same as Django's
[`CORS_ORIGIN_WHITELIST`](https://github.com/adamchainz/django-cors-headers#cors_origin_whitelist)|Urls allowed to make CORS requests.

Front:

In `front/src/app/api-config.ts` define the following:

Settings|Description
--------|-----------
`endpoint`|The full endpoint where to make the API calls
