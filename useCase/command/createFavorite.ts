import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { ErrorResponse } from "@/types/apiError";
import { UserResponse } from "@/types/apiUser";
import { FollowRequest } from "@/types/apiUser";

export const useCreateFavorite = (tweetId: string | null) => {
    const {
        trigger: createFavorite,
        error: createFavoriteError
    } = usePOSTMutation<UserResponse, ErrorResponse, FollowRequest>(`/tweets/${tweetId}/favorites`);
    return { createFavorite, createFavoriteError }
}