import axios, { AxiosError } from 'axios'
import useSWR, { Key } from 'swr'
import useSWRMutation from 'swr/mutation'
import { fireAuth } from '../auth/firebase'
import { ErrorResponse } from '@/types/apiError'

export const useGET = <Result, Error = ErrorResponse>(
  url: string,
  token: string | undefined,
) => {
  const fetcher = async ([url, token]: [url: string, token: string]) => {
    return axios
      .get<Result>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data
      })
  }
  return useSWR<Result, Error, [url: string, token: string] | null>(
    token ? [url, token] : null,
    fetcher,
  )
}

export const useGETMutation = <Result, Error = ErrorResponse, Params = object>(
  url: string,
) => {
  const fetcher = async (url: string) => {
    const idToken = await fireAuth.currentUser?.getIdToken()
    return axios
      .get<Result>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data
      })
  }
  return useSWRMutation<Result, Error, Key, { params?: Params } | undefined>(
    url,
    fetcher,
  )
}

export const usePOSTMutation = <Result, Error = ErrorResponse, Data = object>(
  url: string,
) => {
  const fetcher = async (
    url: string, // これはuseSWRMutationのurlがくる。
    { arg }: { arg: { data?: Data } | undefined },
  ) => {
    console.log(url) // mee
    const idToken = await fireAuth.currentUser?.getIdToken()
    return axios
      .post<Result>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, arg?.data, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data
      })
  }
  return useSWRMutation<Result, Error, Key, { data?: Data } | undefined>(
    url,
    fetcher,
  )
}

export const usePUTMutation = <Result, Error = ErrorResponse, Data = object>(
  url: string,
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { data: Data } | undefined },
  ) => {
    const idToken = await fireAuth.currentUser?.getIdToken()
    return axios
      .put<Result>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, arg?.data, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data
      })
  }
  return useSWRMutation<Result, Error, Key, { data: Data } | undefined>(
    url,
    fetcher,
  )
}

export const useDELETEMutation = <
  Result,
  Error = ErrorResponse,
  Params = object,
>(
  url: string,
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { data?: Params } | undefined },
  ) => {
    console.log(url)
    const idToken = await fireAuth.currentUser?.getIdToken()
    return axios
      .delete<Result>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
        data: arg?.data,
      })
      .then((res) => res.data)
      .catch((e: AxiosError<ErrorResponse>) => {
        throw e.response?.data
      })
  }
  return useSWRMutation<Result, Error, Key, { data?: Params } | undefined>(
    url,
    fetcher,
  )
}
