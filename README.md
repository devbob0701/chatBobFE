# ChatBob 서비스 개요

**ChatBob**은 React로 구현된 프론트엔드 프로젝트로, ChatGPT와 유사한 UI를 제공하는 AI 서비스입니다. 이 서비스는 사용자와 AI 에이전트 간의 채팅을 관리하고, 메시지를 주고받는 기능을 갖추고 있습니다.

## 주요 기능

1. **채팅 목록 표시**:
   - 좌측에 현재 사용자의 채팅 목록이 표시됩니다.
   - 각 채팅방은 `session_{index+1}_{user_id}` 형식의 키값으로 관리됩니다.

2. **메시지 입력 및 전송**:
   - 하단에 메시지 입력 창이 있어 사용자가 메시지를 입력하고 전송하면 AI 에이전트에 질문을 보낼 수 있습니다.

## 프로젝트 구성
```
src
├── api
│   ├─── ChatApi.tsx
├── common
│   ├─── apiClient.tsx
└── components
    └── chat
        ├── chat_list
        │       ├────── ChatList.css
        │       └────── ChatList.tsx
        ├── chat_message
        │       ├────── ChatMessage.css
        │       └────── ChatMessage.tsx
        ├── chat_window
        │       ├────── ChatWindow.css
        │       └────── ChatWindow.tsx
        ├── message_input
        │       ├────── MessageInput.css
        │       └────── MessageInput.tsx
        ├── Chat.css
        └── Chat.tsx
```

- **api**: API 호출 관리를 위한 패키지.
- **common**: 공통 API 클라이언트가 구현된 패키지.
- **components**: 채팅 관련 컴포넌트를 모듈화한 패키지.

## API 호출

1. **질문 전달하기**
   - **URL**: `http://localhost:8000/chat`
   - **Method**: `POST`
   - **Body**:
     ```json
     {
         "user_id": {user_id},
         "session_id": {session_id},
         "session_name": {session_name},
         "question_message": {question_message}
     }
     ```
   - **Response 예시**:
     ```json
     {
         "answer": {
             "input": "API 스펙 중 aNS는 어떤 것을 뜻하나요?",
             "output": "\"aNS\"는 일반적으로 \"Application Name Server\"의 약어로 사용됩니다..."
         }
     }
     ```

2. **채팅방 목록 가져오기**
   - **URL**: `http://localhost:8000/get-chat-list?user_id={user_id}`
   - **Method**: `GET`
   - **Response 예시**:
     ```json
     [
         {
             "session_id": "session_1_user_1",
             "session_name": "Chat 1"
         },
         {
             "session_id": "session_2_user_1",
             "session_name": "Chat 2"
         }
     ]
     ```

3. **채팅 메시지 목록 가져오기**
   - **URL**: `http://localhost:8000/get-chat-messages?session_id={session_id}`
   - **Method**: `GET`
   - **Response 예시**:
     ```json
     [
         {
             "input": "안녕?",
             "output": "안녕하세요! 어떻게 도와드릴까요?"
         },
         {
             "input": "마이데이터에 대해 설명해줘",
             "output": "마이데이터(MyData)는 개인이 자신의 데이터를 주체적으로 관리하고 활용할 수 있도록..."
         }
     ]
     ```

## 개발 환경

- **Node 버전**: v22.5.1
- **Npm 버전**: 10.8.2

## 실행 방법

1. `npm install` 명령어로 필요한 패키지를 설치합니다.
2. `npm start` 명령어로 프로젝트를 실행합니다.
3. 브라우저에서 `http://localhost:3000`에 접속하여 서비스를 확인합니다.

## 실행 예시
![스크린샷 2024-08-18 오후 8 52 31](https://github.com/user-attachments/assets/13e2c233-e4bb-456f-b512-d2a6bbcff28a)
