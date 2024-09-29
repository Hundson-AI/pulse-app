import wsManager from './websocketManager';

export const registerErrorListener = () => {
    console.log('Registering error listeners');

    wsManager.on('ERROR', message => {
        console.log('Error:', message);
    });
};
