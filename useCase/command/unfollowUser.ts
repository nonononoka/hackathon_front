import {
    useDELETEMutation,
} from "@/lib/swr/useSWR";
import { ErrorResponse } from "@/types/apiError";
import { UserResponse } from "@/types/apiUser";
import { FollowRequest } from "@/types/apiUser";

export const useUnfollowUser = (followingUserId: string | null) => {
    const {
        trigger: unfollowUser,
        error: unfollowUserError
    } = useDELETEMutation<UserResponse, ErrorResponse, FollowRequest>(`/users/me/following?id=${followingUserId}`);
    return { unfollowUser, unfollowUserError }
}