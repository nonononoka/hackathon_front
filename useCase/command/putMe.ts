import {
    usePUTMutation,
} from "@/lib/swr/useSWR";
import { UserResponse } from "@/types/apiUser";
import { ErrorResponse } from "@/types/apiError";

export const usePutMe = () => {
    const {
        data: putMeData,
        error: putMeError,
        isMutating: putMeLoading,
        trigger: putMe,
        reset: putMeReset,
    } = usePUTMutation<UserResponse, ErrorResponse>("/me");
    return { putMeData, putMeError, putMeLoading, putMe, putMeReset }
}
