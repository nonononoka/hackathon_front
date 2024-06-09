import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";
import { ErrorResponse } from "@/types/apiError";

export const useCreateMe = () => {
    const {
        data: createMeData,
        error: createMeError,
        isMutating: createMeLoading,
        trigger: createMe,
        reset: createMeReset,
    } = usePOSTMutation<UserResponse, ErrorResponse>("/me");
    return { createMeData, createMeError, createMeLoading, createMe, createMeReset }
}
