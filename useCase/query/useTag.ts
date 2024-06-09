import {
    useGET,
} from "@/lib/swr/useSWR";
import { TagResponse } from "@/types/apiTag";

export const useTag = (token: string | undefined) => {
    const { data, error, isLoading } = useGET<TagResponse[]>("/tags", token);
    return { data, error, isLoading }
}
