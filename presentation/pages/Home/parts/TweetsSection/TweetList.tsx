import { TweetResponse } from "@/types/apiTweet";
import { useCreateFavorite } from "@/useCase/command/createFavorite";
import { useState, useEffect } from "react";
import Link from 'next/link'

type Tweets = {
  tweets: TweetResponse[]
}

export const TweetList = (props: Tweets) => {
  const tweets = props.tweets;
  const [favoriteTweetID, setFavoriteTweetID] = useState<string | null>(null)
  const { createFavorite } = useCreateFavorite(favoriteTweetID)
  const handleFav = (tweetID: string) => {
    setFavoriteTweetID(tweetID)
  }

  useEffect(() => {
    if (!!favoriteTweetID) {
      createFavorite()
        .catch((e) => alert(e))
    }
  }, [favoriteTweetID])

  return (
    <>
      {tweets.map((tweet) =>
        <div key={tweet.id}>
          <button onClick={() => handleFav(tweet.id)}>likes</button>
          <p >{tweet.body}, {tweet.postedAt}, {tweet.postedBy}, {tweet.likeCount} , {tweet.tags}</p>
          <Link href={`/reply/${tweet.id}`}>
            reply
          </Link>
        </div>
      )}
    </>
  )
}