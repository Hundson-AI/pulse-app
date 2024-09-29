import { useDispatch, useSelector } from 'react-redux';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';

export interface Chat {
    chat_room_id: string;
    chat_room_name: string;
    chat_last_message: string;
    chat_none_response_count: number;
    chat_thumb_img_src: string;
    chat_last_message_time: string;
}

export const chatsAdapter = createEntityAdapter({
    selectId: (chat: Chat) => chat.chat_room_id || '',
});

const initialState = chatsAdapter.getInitialState({
    initialized: false,
});

const slice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        addChat: chatsAdapter.addOne,
        addManyChats: chatsAdapter.addMany,
        updateChat: chatsAdapter.updateOne,
        upsertChat: chatsAdapter.upsertOne,
        removeChat: chatsAdapter.removeOne,
        removeManyChats: chatsAdapter.removeMany,
        resetChats: chatsAdapter.removeAll,
        setAllChats: chatsAdapter.setAll,
        setChatsInitialized: (state, { payload }) => {
            state.initialized = payload;
        },
        markChatAsRead: (state, { payload }) => {
            const chat = state.entities[payload];
            if (chat) {
                chat.chat_none_response_count = 0;
            }
        },
    },
});

export function useChatsSlice() {
    const dispatch = useDispatch<Dispatch>();
    const state = useSelector(({ chats }: State) => chats);
    return { dispatch, ...state, ...slice.actions };
}

export const {
    addChat,
    addManyChats,
    updateChat,
    upsertChat,
    removeChat,
    removeManyChats,
    resetChats,
    setAllChats,
    setChatsInitialized,
    markChatAsRead,
} = slice.actions;

export default slice.reducer;

export const {
    selectById: selectChatById,
    selectIds: selectChatIds,
    selectEntities: selectChatEntities,
    selectAll: selectAllChats,
    selectTotal: selectTotalChats,
} = chatsAdapter.getSelectors((state: State) => state.chats);

export const selectChatsInitialized = (state: State) => state.chats.initialized;

export const selectHasUnreadChats = (state: State) => {
    const chats = selectAllChats(state);
    return chats.some(chat => chat.chat_none_response_count > 0);
};
