/**
 * /me のGETレスポンス
 */
export type UserResponse = {
  id: string;
  name: string;
  email: string;
  // このユーザーをフォローしてるか
  isFollowing: boolean;
  // このユーザーにフォローされてるか
  isFollowed: boolean;
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