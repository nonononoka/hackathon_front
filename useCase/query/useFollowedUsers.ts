import {
    useGET,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";

export const useFollowedUsers = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<UserResponse[]>("/users/me/followed", token);
    return { data, error, isLoading, mutate }
}
