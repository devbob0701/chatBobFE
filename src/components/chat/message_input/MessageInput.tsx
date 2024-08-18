import React from 'react';
import './MessageInput.css';  // 스타일 파일도 별도로 관리할 수 있습니다.

interface MessageInputProps {
    newMessage: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendMessage: () => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ newMessage, onInputChange, onSendMessage }) => {
    return (
        <div className="message-input">
            <input
                type="text"
                value={newMessage}
                onChange={onInputChange}
                placeholder="질문을 입력하세요..."
            />
            <button onClick={onSendMessage}>전송</button>
        </div>
    );
};

export default MessageInput;