// import { TweetResponse } from '@/types/apiTweet';
// import { FC, ReactNode, createContext, useContext } from 'react';
// import { useTaggedTweets } from '../query/useTweets';
// import { useFollowingTweets } from '../query/useFollowingTweets';
// import { useAuthToken } from '../query/useAuthToken';
// import { KeyedMutator } from 'swr';
// import { Loading } from '@/presentation/components/Loading';

// interface TweetContextType {
//     allTweets: {
//         tweets: TweetResponse[];
//         mutate: KeyedMutator<TweetResponse[]>
//     }
//     followingTweets: {
//         tweets: TweetResponse[];
//         mutate: KeyedMutator<TweetResponse[]>
//     }
// }

// // Contextの初期値
// const TweetContext = createContext<TweetContextType | undefined>(undefined);

// // Contextを使用するためのカスタムフック
// export const useTweetContext = () => {
//     const context = useContext(TweetContext);
//     if (!context) {
//         throw new Error('useTweetContext must be used within a TweetProvider');
//     }
//     return context;
// };

// // TweetProviderコンポーネント
// export const TweetContextProvider: FC<{
//     children: ReactNode;
// }> = (props) => {
//     const { children } = props
//     const { data: token } = useAuthToken()

//     // 全部のツイートとってくる。
//     const { data: allTweets, isLoading: allTweetsLoading, error: allTweetsError, mutate: allTweetsMutate } = useTaggedTweets(token, [])
//     const { data: followingTweets, isLoading: followingTweetsLoading, error: followingTweetsError, mutate: followingTweetsMutate } = useFollowingTweets(token)

//     if (allTweetsLoading || allTweetsError || !allTweets || followingTweetsLoading || followingTweetsError || !followingTweets) {
//         return <Loading />
//     }

//     return (<TweetContext.Provider value={{ allTweets: { tweets: allTweets, mutate: allTweetsMutate }, followingTweets: { tweets: followingTweets, mutate: followingTweetsMutate } }}>{children}</TweetContext.Provider>);
// };