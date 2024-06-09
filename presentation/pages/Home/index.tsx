import { TweetPostSection } from "./parts/TweetPostSection"
import { UsersSection } from "./parts/UsersSection"
import { useFollowingTweets } from "@/useCase/query/useFollowingTweets"
import { useAuthToken } from "@/useCase/query/useAuthToken"

export const Home = () => {
  const { data: token } = useAuthToken()
  const {data: followingTweets, error, isLoading, mutate} = useFollowingTweets(token)

  return (
    <>
      <TweetPostSection followingTweets = {followingTweets}/>
      <UsersSection followingTweetsMutate = {mutate}/>
    </>
  )
}
