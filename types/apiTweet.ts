/**
 * /tweet のGETリクエスト
 */
export type TweetResponse = {
    id: string;
    body: string;
    postedBy: string;
}

/**
 * /tweet のPOSTリクエスト
 */
export type TweetPostRequest = {
    text: string;
}

