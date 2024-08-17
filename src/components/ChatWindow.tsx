import React from 'react';
import Message from './Message';

interface Message {
    type: 'input' | 'output';
    content: string;
}

interface ChatWindowProps {
    messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
    return (
        <div className="chat-window">
            {messages.map((msg, index) => (
                <Message key={index} message={msg} />
            ))}
        </div>
    );
};

export default ChatWindow;