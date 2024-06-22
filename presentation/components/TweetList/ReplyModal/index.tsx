import { Modal, Box } from "@mui/material"
import { useCreateReplyTweet } from '@/useCase/command/createReplyTweet';
import { TweetForm } from "../../TweetForm";
import { KeyedMutator } from "swr";
import { TweetResponse } from "@/types/apiTweet";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export type FormType = {
    tweet: string;
}

export const ReplyModal = ({ tweetID, isOpenModal, handleClose, otherMutates }: { tweetID: string, isOpenModal: boolean, handleClose: () => void, otherMutates?: KeyedMutator<TweetResponse[]>[] }) => {
    const { createReplyTweetTrigger } = useCreateReplyTweet(tweetID)

    return (
        <Modal
            open={isOpenModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TweetForm handleClose={handleClose} createTweetTrigger={createReplyTweetTrigger} otherMutates={otherMutates} />
            </Box>
        </Modal>
    )
}