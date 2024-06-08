import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { MeResponse } from "@/types/apiMe";
import { ErrorResponse } from "@/types/apiError";

export const useCreateMe = () => {
    const {
        data: postMeResult,
        error: postMeError,
        isMutating: postMeIsMutating,
        trigger: postMeTrigger,
        reset: postMeReset,
    } = usePOSTMutation<MeResponse, ErrorResponse>("/me");
    return { postMeResult, postMeError, postMeIsMutating, postMeTrigger, postMeReset }
}
