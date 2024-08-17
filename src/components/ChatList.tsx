import React from 'react';

interface ChatListProps {
    sessions: { id: string; name: string }[];
    onSessionSelect: (sessionId: string) => void;
    onNewSession: () => void;
}

const ChatList: React.FC<ChatListProps> = ({ sessions, onSessionSelect, onNewSession }) => {
    return (
        <div className="chat-list">
            <button onClick={onNewSession}>새 채팅방 만들기</button>
            <ul>
                {sessions.map((session) => (
                    <li key={session.id} onClick={() => onSessionSelect(session.id)}>
                        {session.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChatList;