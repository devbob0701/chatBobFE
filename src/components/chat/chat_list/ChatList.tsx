import React, { useState } from 'react';
import './ChatList.css'
import { ChatApi } from '../../../api/ChatApi';

interface ChatListProps {
    sessions: { session_id: string; session_name: string }[];
    currentSessionId: string | null; // 현재 선택된 세션 ID를 추가
    onSessionSelect: (session_id: string, messages: any[]) => void;
    onNewSession: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ sessions, currentSessionId, onSessionSelect, onNewSession }) => {
    const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
    const [newSessionName, setNewSessionName] = useState<string>('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>, sessionId: string) => {
        setNewSessionName(event.target.value);
    };

    const handleNameDoubleClick = (sessionId: string, currentName: string) => {
        setEditingSessionId(sessionId);
        setNewSessionName(currentName);
    };

    const handleSessionClick = async (sessionId: string) => {
        try {
            const messages = await ChatApi.getChatMessages(sessionId);
            onSessionSelect(sessionId, messages);
        } catch (error) {
            console.error('Failed to fetch chat messages:', error);
        }
    };

    return (
        <div className="chat-list">
            <button onClick={onNewSession}>새 채팅방 만들기</button>
            <ul>
                {sessions.map((session) => (
                    <li
                        key={session.session_id}
                        onClick={() => handleSessionClick(session.session_id)}
                        className={currentSessionId === session.session_id ? 'selected' : ''}
                    >
                        {editingSessionId === session.session_id ? (
                            <input
                                type="text"
                                value={newSessionName}
                                onChange={(event) => handleNameChange(event, session.session_id)}
                                autoFocus
                            />
                        ) : (
                            <span onDoubleClick={() => handleNameDoubleClick(session.session_id, session.session_name)}>
                                {session.session_name}
                            </span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;