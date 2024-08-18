import { apiClient } from "../common/apiClient";

const API_BASE_URL = 'http://localhost:8000';

export class ChatApi {
    static async getChatSessions(userId: string) {
        try {
            const data = await apiClient.get(API_BASE_URL, '/get-chat-list', { user_id: userId });
            return data;
        } catch (error) {
            throw new Error('채팅방 조회에 실패했습니다.');
        }
    }

    static async getChatMessages(sessionId: string) {
        try {
            const data = await apiClient.get(API_BASE_URL, '/get-chat-messages', { session_id: sessionId });
            return data;
        } catch (error) {
            throw new Error('채팅내역 조회에 실패했습니다.');
        }
    }

    static async sendMessage(userId: string, sessionId: string, sessionName: string, message: string) {
        try {
            const data = await apiClient.post(API_BASE_URL, '/chat', {
                user_id: userId,
                session_id: sessionId,
                session_name: sessionName,
                question_message: message,
            });
            return data;
        } catch (error) {
            throw new Error('메세지 전달에 실패했습니다.');
        }
    }
}