export interface CreatePostReponse {
    post: {
        id: number
        text: string
        likes_counter: number
        comments_counter: number
    }
    message: string
}

export interface RemovePostResponse {
    message: string
}