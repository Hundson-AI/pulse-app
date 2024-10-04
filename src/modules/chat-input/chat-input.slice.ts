import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';

export enum MessageType {
	TEXT = 'text',
	ACTION = 'action',
}

interface ChatInput {
	text: string;
	type: MessageType;
}

interface ChatInputState {
	inputs: ChatInput[];
	focused: number | null;
}

const initialState: ChatInputState = {
	inputs: [
		{
			text: '',
			type: MessageType.TEXT,
		},
	],
	focused: null,
};

const slice = createSlice({
	name: 'chat-input',
	initialState,
	reducers: {
		add: (state, action: PayloadAction<ChatInput>) => {
			state.inputs.unshift(action.payload);
		},
		remove: (state, action: PayloadAction<number>) => {
			state.inputs.splice(action.payload, 1);
		},
		edit: (
			state,
			action: PayloadAction<{ index: number; input: ChatInput }>
		) => {
			state.inputs[action.payload.index] = action.payload.input;
		},
		editInputType: (
			state,
			action: PayloadAction<{ index: number; type: MessageType }>
		) => {
			state.inputs[action.payload.index].type = action.payload.type;
		},
		clear: (state) => {
			state.inputs = [
				{
					text: '',
					type: MessageType.TEXT,
				},
			];
			state.focused = 0;
		},
		focus: (state, action: PayloadAction<number>) => {
			state.focused = action.payload;
		},
		blur: (state) => {
			state.focused = null;
		},
	},
});

export function useChatInput() {
	const dispatch = useDispatch<Dispatch>();
	const state = useSelector(({ chatInput }: State) => chatInput);
	return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;

export const selectChatInputByIndex = (state: State, idx: number | null) => {
	if (idx === null) return null;
	return state.chatInput.inputs[idx];
};

export const selectChatInputFocused = (state: State) => state.chatInput.focused;

export const selectChatInputCount = (state: State) =>
	state.chatInput.inputs.length;

export const selectChatInputsSendable = (state: State) => {
	if (state.chatInput.inputs.every((input) => !input.text)) return false;
	return true;
};
