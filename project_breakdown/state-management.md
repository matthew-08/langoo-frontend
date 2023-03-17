# State Management

### Motivation / Goals:

One of my primary goals for this application was to use redux to manage state. While the application itself is relatively small-scale and could've utilized a simpler alternative like `useContext` or Zustand, I chose Redux in order to broaden my understanding of the technology.

### State Overview:

The state is broken down into 4 slices.

1. Authentication slice - Responsible for managing the logged in user's data

2. Conversation slice - Manages user "conversations".

3. Users slice - Manages the different users of the applications.

4. Messages slice - Manages all the messages for a user.

5. View slice - Manages the state for detecting which part of the application the user is in as well as media queries.

When planning the structure of my state management for this application, I had a few ideas and principles I wanted to adhere to. Firstly, I wanted to make the slices relatively independant - such that something like a user conversation could be loaded without a user conversation or a set of messages could be loaded without the relevant user being loaded.

To achieve this, I used IDs which are generated in the database to create links between different parts of state.

As an example, here is the objeect schema I used to organize all of the messages for individual conversations:'

```typescript
export type ConversationMessages = {
  [key: ConversationId]: {
    messages: Message[];
  };
};
```

The corresponding conversation id is stored in the conversations slice here as shown here:

```typescript
export type Conversation = {
  userId: string;
  latestMessage: Message;
  conversationId: ConversationId;
  fetched: boolean;
};
```

By organizing state in this way, I achieved greater independance between different parts of the state, allowing for more efficient loading and the option to only fetch data that he user needs.
