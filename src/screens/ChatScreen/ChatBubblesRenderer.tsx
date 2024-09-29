import React from 'react';
import DateChangeBubble from './DateChangeBubble';
import { useSelector } from 'react-redux';
import {
    ChatRole,
    selectAllChatHistories,
    selectChatRoomName,
} from '@modules/chat-history/chat-history.slice';
import { dateStringToDate, isSameDay } from '@utils/dateUtils';
import UserChatBubble from './UserChatBubble';
import CharChatBubble from './CharChatBubble';
import BackgroundMessage from './BackgroundMessage';
import ActionMessage from './ActionMessage';

const parseMessage = (message: string) => {
    const regex = /\*\((.*?)\)\*/g;
    let result = [];
    let lastIndex = 0;
    let match;

    while ((match = regex.exec(message)) !== null) {
        if (match.index > lastIndex) {
            // Add regular text before the action text
            result.push({
                type: 'regular',
                text: message.substring(lastIndex, match.index),
            });
        }
        // Add the action text
        result.push({
            type: 'action',
            text: match[1],
        });
        lastIndex = regex.lastIndex;
    }

    if (lastIndex < message.length) {
        // Add any remaining regular text
        result.push({
            type: 'regular',
            text: message.substring(lastIndex),
        });
    }

    return result;
};

const ChatBubblesRenderer = () => {
    const messages = useSelector(selectAllChatHistories);
    const chatRoomName = useSelector(selectChatRoomName);

    const renderChatBubbles = () => {
        const chatElements: React.ReactElement[] = [];

        for (let i = 0; i < messages.length; i++) {
            const message = messages[i];
            // Date bubble just in case
            // if (
            //     i === 0 ||
            //     !isSameDay(
            //         dateStringToDate(messages[i].created_at),
            //         dateStringToDate(messages[i - 1].created_at),
            //     )
            // ) {
            //     chatElements.push(
            //         <DateChangeBubble
            //             key={`date-${i}`}
            //             date={dateStringToDate(message.created_at)}
            //         />,
            //     );
            // }

            switch (message.chat_role) {
                case ChatRole.USER:
                    const userSegment = parseMessage(message.chat_message);
                    const userFirst = i === 0 || messages[i - 1].chat_role !== message.chat_role;
                    for (let j = 0; j < userSegment.length; j++) {
                        const segment = userSegment[j];
                        if (segment.type === 'regular') {
                            chatElements.push(
                                <UserChatBubble
                                    key={`chat-${i}-segment-${j}`}
                                    message={{ ...message, chat_message: segment.text }}
                                    first={userFirst && j === 0}
                                />,
                            );
                        } else if (segment.type === 'action') {
                            chatElements.push(
                                <ActionMessage
                                    key={`chat-${i}-segment-${j}`}
                                    text={`*(${segment.text})*`}
                                />,
                            );
                        }
                    }
                    break;
                case ChatRole.CHAR:
                    const charSegment = parseMessage(message.chat_message);
                    const charFirst = i === 0 || messages[i - 1].chat_role !== message.chat_role;
                    for (let j = 0; j < charSegment.length; j++) {
                        const segment = charSegment[j];
                        if (segment.type === 'regular') {
                            chatElements.push(
                                <CharChatBubble
                                    key={`chat-${i}-segment-${j}`}
                                    message={{ ...message, chat_message: segment.text }}
                                    first={charFirst && j === 0}
                                />,
                            );
                        } else if (segment.type === 'action') {
                            chatElements.push(
                                <ActionMessage
                                    key={`chat-${i}-segment-${j}`}
                                    text={`*(${segment.text})*`}
                                />,
                            );
                        }
                    }
                    break;
                case ChatRole.STATUS:
                    chatElements.push(
                        <BackgroundMessage
                            key={`chat-${i}`}
                            text={message.chat_message}
                            title={`시작 상황`}
                        />,
                    );
                    break;
                case ChatRole.WORLD:
                    chatElements.push(
                        <BackgroundMessage
                            key={`chat-${i}`}
                            text={message.chat_message}
                            title={`${chatRoomName}의 세계관`}
                        />,
                    );
                    break;
                default:
                    break;
            }
        }

        return chatElements;
    };

    return <>{renderChatBubbles()}</>;
};

export default ChatBubblesRenderer;
