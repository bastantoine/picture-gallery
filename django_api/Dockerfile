FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install -r /requirements.txt

# Make sure there's a folder for the media files
RUN mkdir /media-gallery

# Set work directory.
RUN mkdir /code
WORKDIR /code

# Copy project code.
COPY . /code/

EXPOSE 8080

# Start the API server when the image is launched
ENTRYPOINT [ "./docker-entrypoint.sh" ]
