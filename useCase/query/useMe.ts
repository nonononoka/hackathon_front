import {
    useGET,
} from "@/lib/swr/useSWR";
import { MeResponse } from "@/types/apiMe";

export const useMe = (token: string | undefined) => {
    const { data, error, isLoading, mutate} = useGET<MeResponse>("/me", token);
    return { data, error, isLoading, mutate}
}
