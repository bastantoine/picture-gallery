#!/bin/bash

# From https://stackoverflow.com/questions/33992867/how-do-you-perform-django-database-migrations-when-using-docker-compose

# Apply database migrations
echo "Collect database migrations"
python manage.py makemigrations

# Apply database migrations for the API
echo "Collect database migrations"
python manage.py makemigrations api

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

echo "Creating superuser account"
python manage.py initadmin

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8080
