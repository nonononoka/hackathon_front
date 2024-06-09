import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { ErrorResponse } from "@/types/apiError";
import { UserResponse } from "@/types/apiUser";
import { FollowRequest } from "@/types/apiUser";

export const useFollowFriend = (followingUserId: string | null) => {
    const {
        trigger: followUser,
        error: followUserError
    } = usePOSTMutation<UserResponse, ErrorResponse, FollowRequest>(`/friendships/${followingUserId}/follow`);
    return { followUser, followUserError }
}