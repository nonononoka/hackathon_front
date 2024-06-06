import {
    usePOSTMutation,
} from "@/lib/swr/useSWR";
import { MePostRequest, MeResponse } from "@/types/apiMe";
import { ErrorResponse } from "@/types/apiError";

export const useCreateMe = () => {
    const {
        data: postMeResult,
        error: postMeError,
        isMutating: postMeIsMutating,
        trigger: postMeTrigger,
        reset: postMeReset,
    } = usePOSTMutation<MeResponse, ErrorResponse, MePostRequest>("/me");
    return { postMeResult, postMeError, postMeIsMutating, postMeTrigger, postMeReset }
}
