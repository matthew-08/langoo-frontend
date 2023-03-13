export type Views = 'chat' | 'discover' | 'settings'

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

export type LanguageChoices =
    | 'japanese'
    | 'vietnamese'
    | 'french'
    | 'chinese'
    | 'english'

export interface SignUpForm {
    username: string
    email: string
    password: string
    confirmPassword: string
    languages: LanguageChoices[]
    nativeLanguage: LanguageChoices
    profilePic: string
}

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

export type Conversation = {
    userId: string
    latestMessage: Message
    conversationId: ConversationId
}

export type ConversationId = string

export type Message = {
    content: string
    userId: string
    timestamp: string | number
}

export type SetActiveView = (arg0: Views) => void

export interface InitialConversationFetch extends Conversation {
    latestMessage: Message
}

export type MessagePayload = {
    conversationId: ConversationId
    message: Message
}
