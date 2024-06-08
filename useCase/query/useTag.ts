import {
    useGETMutation,
} from "@/lib/swr/useSWR";
import { TagResponse } from "@/types/apiTag";

export const useTag = () => {
    const {
        data: getTagData, 
        error: getTagError,
        isMutating:getTagLoading,
        trigger: getTag,
        reset: getTagReset
    } = useGETMutation<TagResponse[]>("/tags");
    return { getTagData, getTagError, getTagLoading, getTag, getTagReset}
}
