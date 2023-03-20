# Database Design

![image description](../public//chatappdb.jpg)

The database for this application is split into 6 simple tables.

1. User
2. User image.
3. Languages the user's actively learning.
4. Language (a table of all languages in the application and their names)
5. Conversation.
6. Message.

### Notable Relationships:

- User and user's languages

  - In this application, a user can choose (a limited number) of languages which they are actively studying. This relationship between a user and their languages is a many-to-many relationship which I've represented using a join table called user_language. This table acts as a link between the user table and the language table.

- User and converstation

  - The conversations in this application occur between two users. I used a join table called conversation here which simply links the users by their respective user IDs.

- Conversation and Message
  - The relationship between a conversation and its messages is one-to-many as a conversation can have many messages and each message can only belong to one conversation.
