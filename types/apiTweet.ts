/**
 * /tweet のGETリクエスト
 */
export type TweetResponse = {
    id: string;
    body: string;
    postedByName: string;
    postedByImage: {String: string, Valid: boolean};
    postedBy: string;
    postedAt: string;
    replyTo: {String: string, Valid: boolean};
    likeCount: number,
    replyCount: number,
    tags: string[],
    isFaved: boolean
}

/**
 * /tweet のPOSTリクエスト
 */
export type TweetPostRequest = {
    body: string;
    tags: string[];
}



