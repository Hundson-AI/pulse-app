import { useDispatch } from 'react-redux';
import wsManager from './websocketManager';
import { addChat, setAllChats, setChatsInitialized } from '@modules/chats/chats.slice';
import {
    addChatHistory,
    addManyChatHistories,
    setChatData,
    setChatHistory,
    setChatInitialized,
    prependChatHistories,
} from '@modules/chat-history/chat-history.slice';

export const registerChatListeners = (dispatch: ReturnType<typeof useDispatch>) => {
    console.log('Registering chat listeners');

    wsManager.on(ChatEvents.CHATLIST_RESPONSE, message => {
        if (message.data) {
            dispatch(setAllChats(message.data));
            dispatch(setChatsInitialized(true));
        }
    });

    wsManager.on(ChatEvents.NEW_CHAT_RESPONSE, message => {
        getChatList();
    });

    wsManager.on(ChatEvents.CHATROOM_DETAILS_RESPONSE, message => {
        if (message.data) {
            dispatch(setChatData(message.data));
            dispatch(setChatInitialized(true));
        }
    });

    wsManager.on(ChatEvents.CHATHISTORY_RESPONSE, message => {
        if (message.data) {
            dispatch(prependChatHistories(message.data));
        }
    });

    wsManager.on(ChatEvents.CHATBOT_MESSAGE_SENT, message => {
        if (message.data) {
            dispatch(addChatHistory(message.data));
        }
    });

    wsManager.on(ChatEvents.CHAT_DELETE_RESPONSE, message => {
        getChatList();
    });
};

export const unregisterChatListeners = () => {
    console.log('Unregistering chat listeners');

    wsManager.off(ChatEvents.CHATLIST_RESPONSE);
    wsManager.off(ChatEvents.NEW_CHAT_RESPONSE);
    wsManager.off(ChatEvents.CHATROOM_DETAILS_RESPONSE);
    wsManager.off(ChatEvents.CHATHISTORY_RESPONSE);
    wsManager.off(ChatEvents.CHATBOT_MESSAGE_SENT);
};

export const getChatList = () => {
    console.log('Requesting chat list');
    wsManager.send({ event: ChatEvents.CHATLIST_REQUEST, message_id: '-1' });
};

export const startNewChat = (characterId: string, chatRoomName: string) => {
    console.log('Creating new chat with character: ', characterId, ' chatRoomName: ', chatRoomName);
    wsManager.send({
        event: ChatEvents.NEW_CHAT_REQUEST,
        message_id: '-1',
        character_id: characterId,
        chat_room_name: chatRoomName,
    });
};

export const fetchChatDetails = (chatId: string) => {
    wsManager.send({
        event: ChatEvents.CHATROOM_DETAILS_REQUEST,
        message_id: '-1',
        chat_id: chatId,
    });
};

export const fetchChatHistory = (chatId: string, search_count?: number) => {
    wsManager.send({
        event: ChatEvents.CHATHISTORY_REQUEST,
        message_id: '-1',
        chat_id: chatId,
        search_count,
    });
};

export const paginateChatHistory = (chatId: string, search_point: string, search_count: number) => {
    wsManager.send({
        event: ChatEvents.CHATHISTORY_REQUEST,
        message_id: '-1',
        chat_id: chatId,
        search_point,
        search_count,
    });
};

export const sendChatMessage = (chatId: string, username: string, message: string) => {
    console.log('Sending chat message');
    markMessagesRead(chatId, username);
    wsManager.send({
        event: ChatEvents.MESSAGE_SENT,
        message_id: '-1',
        chat_id: chatId,
        username,
        user_message: message,
    });
};

export const markMessagesRead = (chatId: string, username: string) => {
    console.log('Marking messages as read');
    wsManager.send({
        event: ChatEvents.MESSAGES_READ,
        message_id: '-1',
        chat_id: chatId,
        username,
    });
};

export const deleteChats = (chatIds: string[]) => {
    console.log('Deleting chats: ', chatIds);
    wsManager.send({
        event: ChatEvents.CHAT_DELETE_REQUEST,
        message_id: '-1',
        chat_ids: chatIds,
    });
};

export const ChatEvents = {
    CHATLIST_REQUEST: 'CHATLIST_REQUEST',
    CHATLIST_RESPONSE: 'CHATLIST_RESPONSE',
    NEW_CHAT_REQUEST: 'NEW_CHAT_REQUEST',
    NEW_CHAT_RESPONSE: 'NEW_CHAT_RESPONSE',
    CHAT_DELETE_REQUEST: 'CHAT_DELETE_REQUEST',
    CHAT_DELETE_RESPONSE: 'CHAT_DELETE_RESPONSE',
    CHATHISTORY_REQUEST: 'CHATHISTORY_REQUEST',
    CHATHISTORY_RESPONSE: 'CHATHISTORY_RESPONSE',
    MESSAGE_SENT: 'MESSAGE_SENT',
    MESSAGES_READ: 'MESSAGES_READ',
    CHATBOT_MESSAGE_SENT: 'CHATBOT_MESSAGE_SENT',
    CHATROOM_DETAILS_REQUEST: 'CHATROOM_DETAILS_REQUEST',
    CHATROOM_DETAILS_RESPONSE: 'CHATROOM_DETAILS_RESPONSE',
    ADDITIONAL_MESSAGE_REQUEST: 'ADDITIONAL_MESSAGE_REQUEST',
    CHATROOM_UPDATE_REQUEST: 'CHATROOM_UPDATE_REQUEST',
    EDIT_MESSAGE_REQUEST: 'EDIT_MESSAGE_REQUEST',
    EDIT_MESSAGE_RESPONSE: 'EDIT_MESSAGE_RESPONSE',
};
