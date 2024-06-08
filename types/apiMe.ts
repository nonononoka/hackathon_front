/**
 * /me のGETレスポンス
 */
export type MeResponse = {
  id: string;
  name: string;
  email: string;
} | 'error' | 'alreadyExists';

/**
 * /me のPUTリクエスト
 */
export type MePutRequest = {
  user_name: string;
  email: string;
};