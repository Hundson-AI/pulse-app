import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';

export enum ChatMode {
	REGULAR = 'regular',
	SECRET = 'secret',
}

interface ChatModeState {
	mode: ChatMode;
	open: boolean;
}

const initialState: ChatModeState = {
	mode: ChatMode.REGULAR,
	open: false,
};

const slice = createSlice({
	name: 'chat-input',
	initialState,
	reducers: {
		setChatMode: (state, action: PayloadAction<ChatMode>) => {
			state.mode = action.payload;
		},
		resetChatMode: (state) => {
			state.mode = ChatMode.REGULAR;
			state.open = false;
		},
		openChatMode: (state) => {
			state.open = true;
		},
		closeChatMode: (state) => {
			state.open = false;
		},
	},
});

export function useChatModeSlice() {
	const dispatch = useDispatch<Dispatch>();
	const state = useSelector(({ chatMode }: State) => chatMode);
	return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;

export const selectChatModeOpen = (state: State) => state.chatMode.open;
