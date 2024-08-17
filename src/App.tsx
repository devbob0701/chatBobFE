import React, { useState } from 'react';
import axios from 'axios';
import ChatList from './components/ChatList';
import ChatWindow from './components/ChatWindow';
import './App.css'

interface Message {
    type: 'input' | 'output';
    content: string;
}

const App: React.FC = () => {
    const [sessions, setSessions] = useState<{ id: string; name: string }[]>([
        { id: 'session_1', name: 'Chat 1' }
    ]);
    const [currentSessionId, setCurrentSessionId] = useState<string>('session_1');
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
        session_1: [
            { type: 'input', content: '마이데이터 api 조회를 하기위한 토큰은 어떻게 발급 받아?' },
            { type: 'output', content: '마이데이터 API를 조회하기 위한 토큰을 발급받는 과정은 일반적으로...' }
        ]
    });
    const [newMessage, setNewMessage] = useState<string>('');

    const handleSessionSelect = (sessionId: string) => {
        setCurrentSessionId(sessionId);
    };

    const handleNewSession = () => {
        const newSessionId = `session_${sessions.length + 1}`;
        setSessions([...sessions, { id: newSessionId, name: `Chat ${sessions.length + 1}` }]);
        setMessages({ ...messages, [newSessionId]: [] });
        setCurrentSessionId(newSessionId);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = async () => {
        if (!newMessage.trim()) return;

        // 사용자가 입력한 질문을 messages 상태에 추가
        setMessages(prevMessages => ({
            ...prevMessages,
            [currentSessionId]: [...(prevMessages[currentSessionId] || []), { type: 'input', content: newMessage }]
        }));

        try {
            const response = await axios.post('http://localhost:8000/chat', {
                session_id: currentSessionId,
                question_message: newMessage,
            });

            const answer = response.data.answer.output;

            // 서버로부터 받은 응답을 messages 상태에 추가
            setMessages(prevMessages => ({
                ...prevMessages,
                [currentSessionId]: [...(prevMessages[currentSessionId] || []), { type: 'output', content: answer }]
            }));

            setNewMessage(''); // 입력 필드 초기화
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="app">
            <ChatList 
                sessions={sessions} 
                onSessionSelect={handleSessionSelect} 
                onNewSession={handleNewSession} 
            />
            <div className="chat-container">
                <ChatWindow messages={messages[currentSessionId] || []} />
                <div className="message-input">
                    <input
                        type="text"
                        value={newMessage}
                        onChange={handleInputChange}
                        placeholder="질문을 입력하세요..."
                    />
                    <button onClick={handleSendMessage}>전송</button>
                </div>
            </div>
        </div>
    );
};

export default App;