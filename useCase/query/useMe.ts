import {
    useGETMutation,
} from "@/lib/swr/useSWR";
import { MeResponse } from "@/types/apiMe";

export const useMe = () => {
    const {
        data, 
        error,
        isMutating:isLoading,
        trigger: getMe,
    } = useGETMutation<MeResponse>("/me");
    return { data, error, isLoading, getMe}
}
