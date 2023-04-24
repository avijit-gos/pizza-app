
# Project Title

A Pizza delivery app


## Run Locally

Clone the project

```bash
  git clone https://github.com/avijit-gos/pizza-app.git
```

Go to the project directory

```bash
  cd pizza-app
```
Go to the backend folder

```bash
  cd backend
```

Install backend dependency
```bash
npm install
```

For start backend
```bash
npm run dev
```
Go to the admin folder

```bash
  cd admin
```

Install frontend dependency
```bash
npm install
```

For start admin frontend which is start on localhost 3000(default)
```bash
npm start
```
Go to the customer folder

```bash
  cd customer
```

Install frontend dependency
```bash
npm install
```

For start customer frontend which is start on localhost 3100
```bash
npm start
```
## Tech Stack

**Client:** React, chakraui, react-icons, react ContextApi, react-router-dom v6, socket.io-client

**Server:** Node, Express,jwt, bcrypt, errors-http, cors, morgan, socket.io

**Database:** MongoDB Atlas


## Environment Variables

* To run this project, you will need to add the following environment variables to your **_ customer_** frontend .env file
port = YOUR_PREFERRED_PORT(MINE 3100) ##
REACT_APP_BASE_URL = http://localhost:7001/


* To run this project, you will need to add the following environment variables to your **_ admin _** frontend .env file
port = YOUR_PREFERRED_PORT(MINE 3100) ##
REACT_APP_BASE_URL = http://localhost:7001/


* To run this project, you will need to add the following environment variables to your **_ backend _** frontend .env file
DB_URL = YOUR_MONGODB_CONNECT_URL
SECRET_KEY = YOUR_SECRET_KEY

* CLOUDINARY
CLOUD_NAME = YOUR_CLOUD_NAME
API_KEY = YOUR_API_KEY
API_SECRET = YOUR_API_SECRET
