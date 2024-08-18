import React from 'react';
import ReactMarkdown from 'react-markdown';
import './ChatMessage.css'

interface MessageProps {
    message: {
        type: 'input' | 'output';
        content: string;
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className={`message ${message.type}`}>
            {message.type === 'output' ? (
                <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
                <span>{message.content}</span>
            )}
        </div>
    );
};

export default Message;