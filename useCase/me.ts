// import {
//     apiGETMutation,
//     apiPOSTMutation,
//     apiPUTMutation,
// } from "@/lib/swr/useSWR";
// import { ErrorResponse } from "@/types/apiError";
// import { MeResponse, MePostRequest, MePutRequest } from "@/types/apiMe";

// export const useMe = () => {
//     const {
//         data: me,
//         error: getMeError,
//         isMutating: getMeIsMutating,
//         trigger: getMeTrigger,
//         reset: meReset,
//     } = apiGETMutation<MeResponse>("/me");
//     const {
//         data: postMeResult,
//         error: postMeError,
//         isMutating: postMeIsMutating,
//         trigger: postMeTrigger,
//         reset: postMeReset,
//     } = apiPOSTMutation<string, ErrorResponse, MePostRequest>("/me");
//     const {
//         data: putMeResult,
//         error: putMeError,
//         isMutating: putMeIsMutating,
//         trigger: putMeTrigger,
//         reset: putMeReset,
//     } = apiPUTMutation<string, ErrorResponse, MePutRequest>("/me");

//     return {
//         get: { me, getMeError, getMeIsMutating, getMeTrigger, meReset },
//         post: {
//             mePostResult: postMeResult,
//             mePostError: postMeError,
//             mePostIsMutating: postMeIsMutating,
//             mePostTrigger: postMeTrigger,
//             mePostReset: postMeReset,
//         },
//         put: {
//             mePutResult: putMeResult,
//             mePutError: putMeError,
//             mePutIsMutating: putMeIsMutating,
//             mePutTrigger: putMeTrigger,
//             mePutReset: putMeReset,
//         },
//     };
// };