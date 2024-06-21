import {
    useGET,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useThreadTweets = (token: string | undefined, id: string) => {
    const url = `/threads/${id}`;
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>(url, token);
    return { data, error, isLoading, mutate }
} 
