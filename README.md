# picture-gallery
A simple picture gallery built using Django and Angular

# How to run it?

Run `django-compose up` in the root folder (First run can take some time)

# Settings to set

## API

In `django-api/django-api/private_setings.py` define the following:

Settings|Description
--------|-----------
[`SECRET_KEY`](https://docs.djangoproject.com/en/3.0/ref/settings/#secret-key)|The secret key of the project. Same as Django's
[`ALLOWED_HOSTS`](https://docs.djangoproject.com/en/3.0/ref/settings/#allowed-hosts)|List of the hosts Django can serve. Same as Django's
[`MEDIA_ROOT`](https://docs.djangoproject.com/en/3.0/ref/settings/#media-root)|Absolute path on the file system where to store the pictures uploaded. Same as Django's
[`MEDIA_URL`](https://docs.djangoproject.com/en/3.0/ref/settings/#media-url)|URL where to serve the pictures uploaded. Same as Django's
[`CORS_ORIGIN_WHITELIST`](https://github.com/adamchainz/django-cors-headers#cors_origin_whitelist)|List of urls allowed to make CORS requests. Should be absolute urls with http(s) included.

## Front

In `front/src/app/api-config.ts` define the following:

Settings|Description
--------|-----------
`endpoint`|The full endpoint where to make the API calls. Should be one set in `CORS_ORIGIN_WHITELIST`, at least for the root part.
 
 Do not forget to prefix the variable definition by `export`to make sure the value is accesible by the services.
