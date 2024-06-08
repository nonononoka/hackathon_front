import {
    useGETMutation,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useTweet = () => {
    const {
        data: getTweetResult,
        error: getTweetError,
        isMutating: getTweetLoading,
        trigger: getTweet,
        reset: getTweetReset
    } = useGETMutation<TweetResponse[]>("/tweet");
    return { getTweetResult, getTweetError, getTweetLoading, getTweet, getTweetReset }
}
