
# React App with Node.js

A React typescript application with nodejs server, There are three different ways to run this application

* Docker compose, running both, server & client
* Docker, by running each container
* Npm, by running each app separatly

## Docker Compose -recommended

On the root folder of the project, open the terminal to run the following command line, "--build" is only necessary if you are running this command for the first time
```$bash
docker compose up --build
```

Now, both server and client should be running on localhost, `http://localhost:3000` for client and `http://localhost:8080` for the server.


### Docker

#### Server

To build the image, needed only once
On the back folder, open the terminal and run the following command

```$bash
docker build -f Dockerfile -t server .
```

Once the build is completed, run this command line to run the container

```$bash
docker run -it -p 8080:8080 server
```
Now the server is up on `http://localhost:8080`

### Client

To build the image, needed only once
On the front folder, open the terminal and run the following command

```$bash
docker build -f Dockerfile -t client .
```

Once the build is completed, run this command line to run the container

```$bash
docker run -it -p 3000:3000 server
```
Now the client is up on `http://localhost:3000`


### Npm

#### Server

On the back folder, open the terminal to run the following command
Installing dependencies with npm

```$bash
npm install
```
Running the server, can be run with nodemon aswell
```$bash
node app.js
```
Now the server is up on `http://localhost:8080`

#### Client

On the front folder, open the terminal to run the following command
Installing dependencies with npm

```$bash
npm install
```
Running the server
```$bash
npm start
```
Now the client is up on `http://localhost:3000`


## Test

On the back folder, open the terminal to run the following command to run the test

```$bash
npm run test
```