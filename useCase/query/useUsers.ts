import {
    useGET,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";

export const useUsers = (token: string | undefined) => {
    const { data, error, isLoading, mutate } = useGET<UserResponse[]>("/users", token);
    return { data, error, isLoading, mutate }
}
