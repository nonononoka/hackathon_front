import {
    useGET,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useTweet = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>("/tweets", token);
    return { data, error, isLoading, mutate }
}
