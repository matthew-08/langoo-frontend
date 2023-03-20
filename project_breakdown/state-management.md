# State Management

### Motivation / Goals:

One of my primary goals for this application was to use redux to manage state. While the application itself is relatively small-scale and could've utilized a simpler alternative like `useContext` or Zustand, I chose decided to with Redux in order to broaden my understanding of the technology. Of course, at times it felt overkill, but I certainly feel like it gave me a much stronger understanding of when and how Redux would be the appropriate tool to reach for.

### State Overview:

The state is broken down into 5 main slices.

1. Authentication slice - Responsible for managing the logged in user's data.

2. Conversation slice - Manages the logged-in user's active conversations.

3. Users slice - Manages the different users of the applications.

4. Messages slice - Manages all the messages for a user.

5. View slice - Manages the state for detecting which part of the application the user is in as well media queries and what content or component should be displayed based on the client's device.

When planning the overall structure for this application, I had a few ideas and principles I wanted to adhere to. Firstly, I wanted to make the slices relatively independant - such that something like a user conversation could be loaded without a user conversation or a set of messages could be loaded without the relevant user being loaded.

To achieve this, I used IDs which are generated in the database to create links between different parts of state.

As an example, here is the objeect schema I used to organize all of the messages for individual conversations:'

```typescript
export type ConversationMessages = {
  [key: ConversationId]: {
    messages: Message[];
  };
};
```

The corresponding conversation ID is stored in the conversations slice here as shown here:

```typescript
export type Conversation = {
  userId: string;
  latestMessage: Message;
  conversationId: ConversationId;
  fetched: boolean;
};
```

The idea here is that upon load of the application the user really only needs to see what conversations they're currently engaged in and what the last message of that conversation is. Initially I was loading all the messages for a user's conversations alongside each conversation which resulted in an unnecessarily long intial render.

I also applied this idea to the user's slice by only fetching a user's information when needed. For example, if a user has an active conversation with a particular user - that user's information doesn't need to be fetched again whenever the "Discover" section of the application is loaded

By organizing state in this way, I achieved greater independance between different parts of the state, allowing for more efficient loading and the option to only fetch data that the user needs.
