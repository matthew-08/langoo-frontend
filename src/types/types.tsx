// Auth
export type UserAuthSchema = {
    username: string | null
    loggedIn: boolean | null
    userId: string | null
    userImg: string | null
    learningLanguages: LanguageChoices[] | null
    nativeLanguage: LanguageChoices | null
    bio: string | null
}
export interface AuthState {
    user: UserAuthSchema
    loading: boolean
    error: string | null
}
export type LoginForm = {
    username: string
    password: string
}
export interface SignUpForm {
    username: string
    email: string
    password: string
    confirmPassword: string
    languages: LanguageChoices[]
    nativeLanguage: LanguageChoices
    profilePic: string
}

// USER
export type LanguageChoices =
    | 'japanese'
    | 'vietnamese'
    | 'french'
    | 'chinese'
    | 'english'
export interface User {
    username: string
    userId: string
    nativeLanguage: LanguageChoices
    learningLanguages: LanguageChoices[]
    onlineStatus: boolean
    userImg: string
    bio: string
    lastLogin: number
}
// CONVERSATION
export type Conversation = {
    userId: string
    latestMessage: Message
    conversationId: ConversationId
    fetched: boolean
}
export type ConversationId = string
export interface InitialConversationFetch extends Conversation {
    latestMessage: Message
}

export type ConversationMessages = {
    [key: ConversationId]: {
        messages: Message[]
    }
}

// MESSAGE
export type Message = {
    content: string
    userId: string
    timestamp: string | number
}
export type MessagePayload = {
    conversationId: ConversationId
    message: Message
}
export type MessagesState = {
    conversationMessages: ConversationMessages
    loading: boolean
}
export interface SocketMessage extends MessagePayload {
    to: string
}

// VIEW
export type SetActiveView = (arg0: Views) => void
export type Views = 'chat' | 'discover' | 'settings'
