/**
 * /me のGETレスポンス
 */
export type UserResponse = {
  id: string;
  name: string;
  email: string;

};

/**
 * /me のPUTリクエスト
 */
export type MePutRequest = {
  user_name: string;
  email: string;
};

export type FollowRequest = {
  id: string
}