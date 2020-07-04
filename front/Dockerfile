FROM node:12.18.2

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY package.json package-lock.json /app/

RUN npm install -g @angular/cli

# Install app dependencies.
RUN npm install

# Copy app files.
COPY . /app

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disableHostCheck"]
