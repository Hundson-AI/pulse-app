import FAB from '@components/FAB';
import TrashIcon from '@components/svgs/TrashIcon';
import PlusIcon from '@components/svgs/PlusIcon';
import { selectSelectedChatIds, useChatListSlice } from '@modules/chat-list/chat-list.slice';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { deleteChats } from 'src/ws/chats.ws';
import { removeManyChats } from '@modules/chats/chats.slice';

const ChatFAB = () => {
    const { editMode, setEditMode, deselectAllChats } = useChatListSlice();
    const dispatch = useDispatch();

    const selectedChatIds = useSelector(selectSelectedChatIds);

    const canDelete = selectedChatIds && selectedChatIds.length > 0;

    const handleDelete = () => {
        if (!selectedChatIds) return;
        deleteChats(selectedChatIds);
        dispatch(removeManyChats(selectedChatIds));
        dispatch(setEditMode(false));
        dispatch(deselectAllChats());
    };

    return (
        <FAB
            onPress={handleDelete}
            icon={editMode ? <TrashIcon /> : <PlusIcon />}
            style={{
                position: 'absolute',
                bottom: 16,
                right: 16,
            }}
            disabled={!canDelete}
        />
    );
};

export default ChatFAB;
