import {
    useGET,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";

export const useMe = (token: string | undefined) => {
    const { data, error, isLoading, mutate} = useGET<UserResponse>("/me", token);
    return { data, error, isLoading, mutate}
}
