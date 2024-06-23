import { Modal, Box } from "@mui/material"
import { useState } from "react";
import { Avatar } from "@files-ui/react";
import { Typography, Button, TextField } from "@mui/material";
import { usePutMe } from "@/useCase/command/putMe";
import { useTweetContext } from "@/useCase/context/TweetContext";
import { useMeContext } from "@/presentation/routing/MeRouteGuard";

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

export const UserConfigurationModal = ({ isOpenModal, handleClose }: { isOpenModal: boolean, handleClose: () => void }) => {
    const me = useMeContext()
    const [imageSource, setImageSource] = useState<string>(me.image ? me.image : "");

    const handleChangeSource = (selectedFile: File) => {
        setImageSource(window.URL.createObjectURL(selectedFile));
    };
    const { putMe } = usePutMe()
    const [name, setName] = useState(me.name);
    const [bio, setBio] = useState(me.bio);
    const { allTweets: { mutate: allTweetsMutate }, followingTweets: { mutate: followingTweetsMutate } } = useTweetContext()

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBio(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        putMe({ data: { name: name, bio: bio, image: imageSource } })
            .then(() => handleClose())
            .then(() => {
                if (allTweetsMutate) {
                    allTweetsMutate()
                }
            })
            .then(() => {
                if (followingTweetsMutate) {
                    followingTweetsMutate()
                }
            })
    }

    return (
        <Modal
            open={isOpenModal}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '16px',
                    maxWidth: '400px',
                    margin: 'auto',
                    marginTop: '64px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '8px',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Avatar changeLabel="upload avatar" src={imageSource ? imageSource : ""} variant="circle" onChange={handleChangeSource} />
                <Typography variant="h5" marginTop={5}>Edit Profile</Typography>
                <form
                    style={{ width: '100%', marginTop: '16px' }}
                    onSubmit={handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="bio"
                        label="Bio"
                        name="bio"
                        multiline
                        rows={4}
                        value={bio}
                        onChange={handleBioChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '16px' }}
                    >
                        Save Changes
                    </Button>
                </form>
            </div>
        </Modal>
    )
}