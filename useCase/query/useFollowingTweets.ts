import {
    useGET,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useFollowingTweets = (token: string | undefined, tags: string[] = []) => {
    const url = tags.length === 0 ? "/tweets/following" : "/tweets/following?"
    let queryString = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join("&");
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>(url + queryString, token);
    return { data, error, isLoading, mutate }
}
