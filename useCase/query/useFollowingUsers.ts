import {
    useGET,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";

export const useFollowingUsers = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<UserResponse[]>("/friendships/follow", token);
    return { data, error, isLoading, mutate }
}
