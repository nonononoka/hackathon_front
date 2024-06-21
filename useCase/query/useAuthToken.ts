import { fireAuth } from "@/lib/auth/firebase";
import useSWR from "swr";

const getAuthToken = async () => {
    const token = await fireAuth.currentUser?.getIdToken();
    // console.log(token)
    return token;
};

export const useAuthToken = () => {
    return useSWR("/token", async () => getAuthToken(), {
        revalidateOnMount: true,
        initialData: null
    });
};