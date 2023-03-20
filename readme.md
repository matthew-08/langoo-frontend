# Langooo

Langoo is a language-exchange themed chat app built in order to further my understanding of WebSockets, Redux, and Redis. Users are able to engagine in real-time conversations and find other users based on their selected languages.

## Notable features:

- Real-time chatting: The app uses socket.io to provide real-time messaging between users and enables them to edit and delete messages in real time.

- Persistant data: Data such as messages, conversations, and user information is stored and persisted in a PostgreSQL database.

- Online status tracking: The app utilizes a Redis cache to track the online status of individual users.

- Persisted sessions: User sessions are persisted with Redis and express-session.

- API Rate Limiting: Resource intensive endpoints are safeguarded using Redis to limit the amount of requests that can be sent to the server.

- Profile images: The app employs the use of AWS S3 to provides users with the ability to upload their own images.

## Technology stack:

- Frontend

  - React
  - TypeScript
  - ChakraUI
  - Redux Toolkit
  - Socket.io

- Backend

  - Node.js
  - Express
  - PostgreSQL
  - Redis
  - Socket.io
  - AWS S3

  Clone the repository.

Install dependencies.

npm install

Start the app.

npm run dev

# Getting Started

1. Clone the repository.
2. Install dependencies.


    ```npm install```

3. Start the development environment.

    ```npm run dev```
