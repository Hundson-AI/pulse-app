import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';

interface ChatListState {
    editMode: boolean;
    selectedChatIds?: string[];
}

const initialState: ChatListState = {
    editMode: false,
    selectedChatIds: [],
};

const slice = createSlice({
    name: 'chat-list',
    initialState,
    reducers: {
        setEditMode: (state: ChatListState, { payload }: PayloadAction<boolean>) => {
            state.editMode = payload;
        },
        selectChatId: (state: ChatListState, { payload }: PayloadAction<string>) => {
            if (!state.selectedChatIds) {
                state.selectedChatIds = [];
            }
            state.selectedChatIds.push(payload);
        },
        deselectChatId: (state: ChatListState, { payload }: PayloadAction<string>) => {
            state.selectedChatIds = state.selectedChatIds?.filter(id => id !== payload);
        },
        selectAllChats: (state: ChatListState, { payload }: PayloadAction<string[]>) => {
            state.selectedChatIds = payload;
        },
        deselectAllChats: (state: ChatListState) => {
            state.selectedChatIds = [];
        },
        reset: () => initialState,
    },
});

export function useChatListSlice() {
    const dispatch = useDispatch<Dispatch>();
    const state = useSelector(({ chatList }: State) => chatList);
    return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;

export const selectChatListEditMode = (state: State) => state.chatList.editMode;

export const selectIsChatSelected = (state: State, chatId: string) =>
    state.chatList.selectedChatIds?.includes(chatId);

export const selectSelectedChatIds = (state: State) => state.chatList.selectedChatIds;
