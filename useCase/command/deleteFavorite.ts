import {
    useDELETEMutation,
} from "@/lib/swr/useSWR";
import { ErrorResponse } from "@/types/apiError";
import { UserResponse } from "@/types/apiUser";
import { FollowRequest } from "@/types/apiUser";

export const useDeleteFavorite = (tweetId: string | null) => {
    const {
        trigger: deleteFavorite,
        error: deleteFavoriteError
    } = useDELETEMutation<UserResponse, ErrorResponse, FollowRequest>(`/tweets/favorites?id=${tweetId}`);
    return { deleteFavorite, deleteFavoriteError }
}