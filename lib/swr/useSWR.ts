import axios, { AxiosError } from 'axios'
import { Key } from 'swr'
// import useSWR from "swr";
import useSWRMutation from 'swr/mutation'
import { fireAuth } from '../auth/firebase'
import { ErrorResponse } from '@/types/apiError'

export const useGETMutation = <Result, Error = ErrorResponse, Params = object>(
  url: string,
) => {
  const fetcher = async (
    url: string,
    { arg }: { arg: { params?: Params } | undefined },
  ) => {
    const idToken = await fireAuth.currentUser?.getIdToken()
    return axios
      .get<Result>(`${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
        params: arg?.params,
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
    url: string,
    { arg }: { arg: { data?: Data } | undefined },
  ) => {
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
