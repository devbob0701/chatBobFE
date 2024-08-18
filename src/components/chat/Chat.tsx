import React, { useState, useEffect, useRef } from 'react';
import ChatList from './chat_list/ChatList';
import ChatWindow from './chat_window/ChatWindow';
import MessageInput from './message_input/MessageInput';
import './Chat.css';
import { ChatApi } from '../../api/ChatApi';

// Message 인터페이스 정의
interface Message {
    type: 'input' | 'output';
    content: string;
}

const Chat: React.FC = () => {
    const [sessions, setSessions] = useState<{ session_id: string; session_name: string }[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string>('');
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
    const [newMessage, setNewMessage] = useState<string>('');
    const [isSending, setIsSending] = useState<boolean>(false); // 메시지 전송 상태를 관리하는 상태 추가
    const userId = 'user_1';
    const initialLoad = useRef(true);

    useEffect(() => {
        const fetchChatSessions = async () => {
            const response = await ChatApi.getChatSessions(userId);
            let sessions = response;
            let currentSessionId;

            if (!sessions || sessions.length === 0) {
                currentSessionId = `session_1_${userId}`;
                sessions = [{ session_id: currentSessionId, session_name: 'Chat 1' }];
                setMessages({ [currentSessionId]: [] });
            } else {
                currentSessionId = sessions[sessions.length - 1].session_id;
                setCurrentSessionId(currentSessionId);
                handleSessionSelect(currentSessionId);
            }

            setSessions(sessions.reverse());
        };

        if (initialLoad.current) {
            fetchChatSessions();
            initialLoad.current = false;
        }
    }, [userId]);

    const handleSessionSelect = async (sessionId: string) => {
        setCurrentSessionId(sessionId);
        if (!messages[sessionId]) {
            const sessionMessages = await ChatApi.getChatMessages(sessionId);

            setMessages(prevMessages => ({
                ...prevMessages,
                [sessionId]: [
                    ...(prevMessages[sessionId] || []),
                    ...sessionMessages.flatMap((msg: any) => [
                        { type: 'input', content: msg.input },
                        { type: 'output', content: msg.output }
                    ])
                ]
            }));
        }
    };

    const handleNewSession = () => {
        if (!messages[currentSessionId] || messages[currentSessionId].length == 0) {
            return;
        }

        const newSessionId = `session_${sessions.length + 1}_${userId}`;
        const newSessionName = `Chat ${sessions.length + 1}`;

        setSessions([{ session_id: newSessionId, session_name: newSessionName }, ...sessions]);
        setMessages({ ...messages, [newSessionId]: [] });
        setCurrentSessionId(newSessionId);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim() || isSending) return; // isSending이 true일 경우 전송 중단

        setIsSending(true); // 메시지 전송 시작

        const currentSessionName = sessions.find(session => session.session_id === currentSessionId)?.session_name || '';

        setMessages(prevMessages => ({
            ...prevMessages,
            [currentSessionId]: [...(prevMessages[currentSessionId] || []), { type: 'input', content: newMessage }]
        }));

        setNewMessage('');

        const response = await ChatApi.sendMessage(
            userId,
            currentSessionId,
            currentSessionName,
            newMessage
        );

        const answer = response.answer.output;

        setMessages(prevMessages => ({
            ...prevMessages,
            [currentSessionId]: [...(prevMessages[currentSessionId] || []), { type: 'output', content: answer }]
        }));

        // 1초 후 isSending 상태를 false로 변경하여 다시 메시지 전송 가능하도록 설정
        setTimeout(() => {
            setIsSending(false);
        }, 1000);
    };

    return (
        <div className="chat">
            <ChatList 
                sessions={sessions} 
                currentSessionId={currentSessionId} 
                onSessionSelect={handleSessionSelect} 
                onNewSession={handleNewSession}
            />
            <div className="chat-container">
                <ChatWindow messages={messages[currentSessionId] || []} />
                <MessageInput 
                    newMessage={newMessage}
                    onInputChange={handleInputChange}
                    onSendMessage={handleSendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;