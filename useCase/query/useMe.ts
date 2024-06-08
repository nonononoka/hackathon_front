import {
    useGETMutation,
} from "@/lib/swr/useSWR";
import { MeResponse } from "@/types/apiMe";

export const useMe = () => {
    const {
        data: getMeData, 
        error: getMeError,
        isMutating:getMeLoading,
        trigger: getMe,
        reset: getMeReset
    } = useGETMutation<MeResponse>("/me");
    return { getMeData, getMeError, getMeLoading, getMe, getMeReset}
}
