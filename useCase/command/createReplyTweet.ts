import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";
import { ErrorResponse } from "@/types/apiError";
import { TweetPostRequest } from "@/types/apiTweet";

export const useCreateReplyTweet = (tweetId: string | null) => {
    const {
        data: createReplyTweetResult,
        error: createReplyTweetError,
        isMutating: createReplyTweetIsMutating,
        trigger: createReplyTweetTrigger,
        reset: createReplyTweetReset,
    } = usePOSTMutation<TweetResponse, ErrorResponse, TweetPostRequest>(`/tweets/${tweetId}/reply`);
    return { createReplyTweetResult, createReplyTweetTrigger}
}
