import React, { useState, useEffect, useRef } from 'react';
import ChatList from './chat_list/ChatList';
import ChatWindow from './chat_window/ChatWindow';
import MessageInput from './message_input/MessageInput';
import './Chat.css';
import { ChatApi } from '../../api/ChatApi';

interface Message {
    type: 'input' | 'output';
    content: string;
}

const Chat: React.FC = () => {
    const [sessions, setSessions] = useState<{ session_id: string; session_name: string }[]>([]);
    const [currentSessionId, setCurrentSessionId] = useState<string>('');
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
    const [newMessage, setNewMessage] = useState<string>('');
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
                    ...(prevMessages[sessionId] || []), // 기존 메시지들을 유지
                    ...sessionMessages.flatMap((msg: any) => [
                        { type: 'input', content: msg.input },
                        { type: 'output', content: msg.output }
                    ])
                ]
            }));
        }
    };

    const handleNewSession = () => {
        // 현재 보고 있는 채팅방에 메세지가 없는 경우 새 채팅방을 만들어도 동작을 안하도록 처리
        if (!messages[currentSessionId] || messages[currentSessionId].length == 0) {
            return;
        }

        const newSessionId = `session_${sessions.length + 1}_${userId}`;
        const newSessionName = `Chat ${sessions.length + 1}`;
        
        // 세션을 맨 앞에 추가
        setSessions([{ session_id: newSessionId, session_name: newSessionName }, ...sessions]);
        setMessages({ ...messages, [newSessionId]: [] });
        setCurrentSessionId(newSessionId);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        console.log(newMessage)
        if (!newMessage.trim()) return;

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
    };

    return (
        <div className="chat">
            <ChatList 
                sessions={sessions} 
                currentSessionId={currentSessionId}  // 현재 선택된 세션 ID를 전달
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