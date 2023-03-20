# Data Flow

One of the most fun and rewarding aspects of this application was figuring out how exactly data should flow. More specifically, how data should flow in regards to conversations and their relevant messages. I knew I wanted to use socket.io to handle the real-time aspect of the messages, PostgreSQL to persist the messages, and redux to distribute all that data to the client. I went through a few different sketches and ideas, but I ultimatley settled on this:

1. User sends a message

2. Message is immediatley dispatched to the redux store on the client-side.

3. Message event is emitted via socket.io

4. If receiving user is online, message is dispatched to their local redux store

5. Message is stored in the database.

The same type of data flow applies to both message edits and message deletes.

I found that this data-flow works really well for providing a snappy and responsive user experience as database queries are more of a side-effect rather than the primary way a user actually receive's all of their data. It's far from a perfect solution and poses problems if there's any errors that occur in the backend.
