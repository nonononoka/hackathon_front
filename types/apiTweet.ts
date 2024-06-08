/**
 * /tweet のGETリクエスト
 */
export type TweetResponse = {
    id: string;
    body: string;
    postedBy: string;
    postedAt: string;
    replyTo: {String: string, Valid: boolean};
    likeCount: number,
    tags: string[]
}

/**
 * /tweet のPOSTリクエスト
 */
export type TweetPostRequest = {
    body: string;
    tags: string[];
}

