import { useDispatch } from 'react-redux';
import wsManager from './websocketManager';
import { signOut, authorizeWs } from '@modules/auth/auth.slice';

export const registerAuthListeners = (
	dispatch: ReturnType<typeof useDispatch>
) => {
	console.log('Registering auth listeners');

	wsManager.on(AuthEvents.AUTH_RESPONSE, (message) => {
		if (!message.data.result) {
			console.error('Authentication failed');

			dispatch(signOut());
			return;
		} else {
			dispatch(authorizeWs());
			console.log('Authentication successful');
		}
	});
};

export const authenticateWS = (token: string) => {
	console.log('Authenticating WS');
	wsManager.send({ event: AuthEvents.AUTH_REQUEST, token, message_id: '-1' });
};

export const AuthEvents = {
	AUTH_REQUEST: 'AUTH_REQUEST',
	AUTH_RESPONSE: 'AUTH_RESPONSE',
};

export const unregisterAuthListeners = () => {
	console.log('Unregistering auth listeners');
	wsManager.off(AuthEvents.AUTH_RESPONSE);
};
