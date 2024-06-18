import {
    useGET,
} from "@/lib/swr/useSWR";
import { TweetResponse } from "@/types/apiTweet";

export const useTaggedTweets = (token: string | undefined, tags: string[]) => {
    const url = tags.length === 0 ? "/tweets" : "/tweets?"
    let queryString = tags.map(tag => `tags=${encodeURIComponent(tag)}`).join("&");
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>(url + queryString, token);
    return { data, error, isLoading, mutate }
}

export const useTweets = (token: string | undefined, id: string) => {
    const encodedId = encodeURIComponent(id);
    const queryParams = `id=${encodedId}`;
    const url = `/tweets?${queryParams}`;
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>(url, token);
    return { data, error, isLoading, mutate }
} 

export const useUserTweets = (token: string | undefined, userID: string) => {
    const url = `/users/${userID}/tweets`;
    const { data, error, isLoading, mutate } = useGET<TweetResponse[]>(url, token);
    return { data, error, isLoading, mutate }
}
