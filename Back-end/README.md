For the installation :

You need Mongo, NodeJS and npm


First, you need to install all the package :

npm i

Second, copy the file .env.example and rename it .env.
Also change the information to connect your database and transform the secret key for JWT.


If you want you can insert some data into your database :

npm run seed


To start the server :

npm start


The server listen on port 5000