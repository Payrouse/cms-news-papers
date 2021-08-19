export interface Comment{
    commentId: string;
    body: string;
    createdAt: Date;
    commentRoot: string;
    userId: string;
    articleId: string;
    user: {
        fullName: string;
        avatar: string;
    }
}
