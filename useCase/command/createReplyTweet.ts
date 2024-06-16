import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { ReplyPostRequest, TweetResponse } from "@/types/apiTweet";
import { ErrorResponse } from "@/types/apiError";

export const useCreateReplyTweet = (tweetId: string | null) => {
    const {
        data: createReplyTweetResult,
        error: createReplyTweetError,
        isMutating: createReplyTweetIsMutating,
        trigger: createReplyTweetTrigger,
        reset: createReplyTweetReset,
    } = usePOSTMutation<TweetResponse, ErrorResponse, ReplyPostRequest>(`/tweets/${tweetId}/reply`);
    return { createReplyTweetResult, createReplyTweetTrigger}
}
