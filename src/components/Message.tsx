import React from 'react';

interface MessageProps {
    message: {
        type: 'input' | 'output';
        content: string;
    };
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <div className={`message ${message.type}`}>
            <div className="message-content">{message.content}</div>
        </div>
    );
};

export default Message;