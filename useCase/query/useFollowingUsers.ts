import {
    useGET,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";

export const useFollowingUsers = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<UserResponse[]>("/users/me/following", token);
    return { data, error, isLoading, mutate }
}
