import { fireAuth } from "@/lib/auth/firebase";
import useSWR from "swr";

const getAuthToken = async () => {
    return await fireAuth.currentUser?.getIdToken();
};

export const useAuthToken = () => {
    return useSWR("/token", async () => getAuthToken(), {
        revalidateOnMount: true,
        initialData: null
    });
};