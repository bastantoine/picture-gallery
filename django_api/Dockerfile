FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install -r /requirements.txt

# Make sure there's a folder for the media files
RUN mkdir /media

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY . /code/

EXPOSE 8080

# Start the API server when the image is launched
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8080"]
