FROM node:12.18.2

# Set working directory.
RUN mkdir /app
WORKDIR /app

# Copy app dependencies.
COPY package.json package-lock.json /app/

RUN npm install -g @angular/cli

# Install app dependencies.
RUN npm install --verbose

# Copy app files.
COPY . /app

# Port used to access the app in dev mode
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--disableHostCheck"]
