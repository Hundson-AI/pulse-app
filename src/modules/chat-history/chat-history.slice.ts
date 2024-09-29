import { useDispatch, useSelector } from 'react-redux';
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';

export enum ChatRole {
    USER = 'HUMAN',
    CHAR = 'AI',
    WORLD = 'WORLD',
    STATUS = 'STATUS',
}

export interface ChatHistoryItem {
    chat_message: string;
    chat_message_id: string;
    created_at: string;
    chat_role: ChatRole;
}

export interface ChatCharacterData {
    chara_name: string;
    chara_world_background: string;
    chara_cur_status: string;
    chara_img_url: string;
}

export interface ChatHistoryState {
    initialized: boolean;
    fetching: boolean;
    chat_room_id: string;
    chat_room_name: string;
    cur_chat_mode: string;
    character_data: ChatCharacterData;
}

export const chatHistoryAdapter = createEntityAdapter({
    selectId: (chat: ChatHistoryItem) => chat.chat_message_id || '',
});

const initialState = chatHistoryAdapter.getInitialState({
    initialized: false,
    fetching: false,
    chat_room_id: '',
    chat_room_name: '',
    cur_chat_mode: '',
    character_data: {
        chara_name: '',
        chara_world_background: '',
        chara_cur_status: '',
        chara_img_url: '',
    },
});

const slice = createSlice({
    name: 'chat-history',
    initialState,
    reducers: {
        addChatHistory: chatHistoryAdapter.addOne,
        addManyChatHistories: chatHistoryAdapter.addMany,
        updateChat: chatHistoryAdapter.updateOne,
        upsertChat: chatHistoryAdapter.upsertOne,
        removeChatHistory: chatHistoryAdapter.removeOne,
        removeManyChatHistories: chatHistoryAdapter.removeMany,
        setChatHistory: chatHistoryAdapter.setAll,
        resetChatHistoryState: () => initialState,
        setChatData: (state, { payload }: { payload: ChatHistoryState }) => {
            state.chat_room_id = payload.chat_room_id || '';
            state.chat_room_name = payload.chat_room_name || '';
            state.cur_chat_mode = payload.cur_chat_mode || '';
            state.character_data = payload.character_data;
        },
        setChatInitialized: (state, { payload }: { payload: boolean }) => {
            state.initialized = payload;
        },
        prependChatHistories: (state, action) => {
            const newMessages: ChatHistoryItem[] = action.payload;
            chatHistoryAdapter.upsertMany(state, newMessages);
            const newIds = newMessages.map(chat => chat.chat_message_id || '');
            state.ids = [...newIds, ...state.ids.filter(id => !newIds.includes(id))];
        },
    },
});

export function useChatsSlice() {
    const dispatch = useDispatch<Dispatch>();
    const state = useSelector(({ chatHistory }: State) => chatHistory);
    return { dispatch, ...state, ...slice.actions };
}

export const {
    addChatHistory,
    addManyChatHistories,
    updateChat,
    upsertChat,
    removeChatHistory,
    removeManyChatHistories,
    setChatHistory,
    resetChatHistoryState,
    setChatData,
    setChatInitialized,
    prependChatHistories,
} = slice.actions;

export default slice.reducer;

export const {
    selectById: selectChatHistoryById,
    selectIds: selectChatHistoryIds,
    selectEntities: selectChatHistoryEntities,
    selectAll: selectAllChatHistories,
    selectTotal: selectTotalChatHistories,
} = chatHistoryAdapter.getSelectors((state: State) => state.chatHistory);

export const selectChatInitialized = (state: State) => state.chatHistory.initialized;

export const selectChatFetching = (state: State) => state.chatHistory.fetching;

export const selectChatRoomName = (state: State) => state.chatHistory.chat_room_name;

export const selectChatRoomImage = (state: State) => state.chatHistory.character_data.chara_img_url;

export const selectChatRoomId = (state: State) => state.chatHistory.chat_room_id;

export const selectLastChatMessage = (state: State) => {
    const chatHistory = selectAllChatHistories(state);
    return chatHistory[chatHistory.length - 1];
};

export const selectOldestChatMessage = (state: State) => {
    const chatHistory = selectAllChatHistories(state);
    return chatHistory[0];
};
