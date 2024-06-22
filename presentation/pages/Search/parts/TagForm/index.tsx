import { TriggerWithOptionsArgs } from "swr/mutation";
import { TweetResponse } from "@/types/apiTweet";
import { ErrorResponse } from "@/types/apiError";
import { Key } from "swr";
import { TweetPostRequest } from "@/types/apiTweet";
import { KeyedMutator } from "swr";
import { MuiChipsInput } from "mui-chips-input";
import { useTweetContext } from "@/useCase/context/TweetContext";
import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

type TagFormProps = {
    tags :string[]
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export const TagForm: React.FC<TagFormProps> = (props: TagFormProps) => {
    const {tags, setTags} = props
    const handleChange = (tags: string[]) => {
        setTags(tags);
    };

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '16px',
                backgroundColor: '#f0f0f0',
                borderRadius: '8px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            }}
        >
            <MuiChipsInput
                style={{ marginBottom: '16px' }}
                placeholder="Type hashtags and press enter"
                helperText={tags.length > 0 ? "Double click to edit a chip" : ""}
                clearInputOnBlur
                value={tags}
                onChange={handleChange}
            />
        </Box>
    );
};