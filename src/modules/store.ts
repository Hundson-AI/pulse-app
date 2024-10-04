import { configureStore } from '@reduxjs/toolkit';
import app from '@modules/app/app.slice';
import createCharacter from '@modules/create-character/create-character.slice';
import tempCharacter from '@modules/create-character/update-tempcharacter.slice';
import auth from '@modules/auth/auth.slice';
import userCharacters from '@modules/user-characters/user-characters.slice';
import chats from '@modules/chats/chats.slice';
import chatHistory from '@modules/chat-history/chat-history.slice';
import chatList from '@modules/chat-list/chat-list.slice';
import config from '@utils/config';
import chatInput from '@modules/chat-input/chat-input.slice';
import chatMode from '@modules/chat-mode/chat-mode.slice';

const store = configureStore({
	reducer: {
		app,
		auth,
		chats,
		chatList,
		chatInput,
		chatHistory,
		chatMode,
		userCharacters,
		createCharacter,
		tempCharacter,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: config.ENV === 'dev',
});

export type State = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export default store;
