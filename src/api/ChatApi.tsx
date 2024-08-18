import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export class ChatApi {
    static async getChatSessions(userId: string) {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-chat-list`, {
                params: {
                    user_id: userId
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('채팅방 조회에 실패했습니다.');
        }
    }

    static async getChatMessages(sessionId: string) {
        try {
            const response = await axios.get(`${API_BASE_URL}/get-chat-messages`, {
                params: {
                    session_id: sessionId
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('채팅내역 조회에 실패했습니다.');
        }
    }

    static async sendMessage(userId: string, sessionId: string, sessionName: string, message: string) {
        try {
            const response = await axios.post(`${API_BASE_URL}/chat`, {
                user_id: userId,
                session_id: sessionId,
                session_name: sessionName,
                question_message: message,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            throw new Error('메세지 전달에 실패했습니다.');
        }
    }
}