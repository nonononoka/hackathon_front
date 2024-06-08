import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { MeResponse } from "@/types/apiMe";
import { ErrorResponse } from "@/types/apiError";

export const useCreateMe = () => {
    const {
        data: createMeData,
        error: createMeError,
        isMutating: createMeLoading,
        trigger: createMe,
        reset: createMeReset,
    } = usePOSTMutation<MeResponse, ErrorResponse>("/me");
    return { createMeData, createMeError, createMeLoading, createMe, createMeReset }
}
