import { useDispatch, useSelector } from 'react-redux';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Dispatch, State } from '@modules/store';

interface User {
	username: string;
}

interface AuthState {
	token: string | null;
	user: User | null;
	loggedIn: boolean;
	wsAuthorized: boolean;
}

const initialState: AuthState = {
	token: null,
	user: null,
	loggedIn: false,
	wsAuthorized: false,
};

const slice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken: (state: AuthState, { payload }: PayloadAction<string>) => {
			state.token = payload;
		},
		setUser: (state: AuthState, { payload }: PayloadAction<any>) => {
			state.user = payload;
		},
		resetUser: (state: AuthState) => {
			state.user = null;
		},
		resetToken: (state: AuthState) => {
			state.token = null;
		},
		setLoggedIn: (
			state: AuthState,
			{ payload }: PayloadAction<boolean>
		) => {
			state.loggedIn = payload;
		},
		signIn: (
			state: AuthState,
			{ payload }: PayloadAction<{ token: string; user: any }>
		) => {
			state.token = payload.token;
			state.user = payload.user;
			state.loggedIn = true;
		},
		signOut: (state: AuthState) => {
			state.token = null;
			state.user = null;
			state.loggedIn = false;
		},
		authorizeWs: (state: AuthState) => {
			state.wsAuthorized = true;
		},
		reset: () => initialState,
	},
});

export function useAuthSlice() {
	const dispatch = useDispatch<Dispatch>();
	const state = useSelector(({ auth }: State) => auth);
	return { dispatch, ...state, ...slice.actions };
}

export default slice.reducer;

export const {
	setToken,
	setUser,
	resetUser,
	resetToken,
	setLoggedIn,
	authorizeWs,
	reset,
} = slice.actions;

export const selectIsAuthenticated = (state: State) => state.auth.loggedIn;

export const selectUser = (state: State) => state.auth.user;

export const { signIn, signOut } = slice.actions;
