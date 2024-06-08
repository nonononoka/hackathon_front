import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { TweetPostRequest, TweetResponse } from "@/types/apiTweet";
import { ErrorResponse } from "@/types/apiError";

export const useCreateTweet = () => {
    const {
        data: createTweetResult,
        error: createTweetError,
        isMutating: createTweetIsMutating,
        trigger: createTweetTrigger,
        reset: createTweetReset,
    } = usePOSTMutation<TweetResponse, ErrorResponse, TweetPostRequest>("/tweet");
    return { createTweetResult, createTweetError, createTweetIsMutating, createTweetTrigger, createTweetReset }
}
