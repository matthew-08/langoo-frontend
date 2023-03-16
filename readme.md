# Langooo

Langoo is a language-exchange themed chat app built in order to further my understanding of WebSockets, Redux, and Redis. Users are able to engagine in real-time conversations and find other users based on their selected languages.

Notable features:

- Real-time chatting: The app uses socket.io to provide real-time messaging between users and enables them to edit and delete messages in real time.

- Online status tracking: The app utilizes a Redis cache to track the online status of individual users.

- Persisted sessions: User sessions are persisted with Redis and express-session.

- API Rate Limiting: Resource intensive endpoints are safeguarded using Redis to limit the amount of requests that can be sent to the server.

- Profile images: The app employs the use of AWS S3 to provides users with the ability to upload their own images.
