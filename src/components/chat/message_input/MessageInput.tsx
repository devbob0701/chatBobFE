import React from 'react';
import './MessageInput.css';

interface MessageInputProps {
    newMessage: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ newMessage, onInputChange, onSendMessage }) => {
    
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            onSendMessage(); // 메시지 전송
        }
    };

    return (
        <div className="message-input">
            <input
                type="text"
                value={newMessage}
                onChange={onInputChange}
                onKeyDown={handleKeyDown} // 엔터 키 핸들러 추가
                placeholder="ChatBob에게 메시지 쓰기"
            />
            <button onClick={onSendMessage}>전송</button>
        </div>
    );
};

export default MessageInput;