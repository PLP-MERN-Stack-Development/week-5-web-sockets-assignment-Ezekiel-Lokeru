# MERN Web Sockets Chat Application

A real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.IO. Users can register, join chat rooms, send messages, and see who is online—all in real time.

---

## Features

- **User Registration/Login:** Simple username-based login (no password).
- **Chat Rooms:** Create and join chat rooms.
- **Real-Time Messaging:** Send and receive messages instantly using Socket.IO.
- **Message Persistence:** Messages are saved in MongoDB and loaded per room.
- **User List:** See who is online and in each room.
- **Typing Indicator:** See when other users are typing.
- **Private Messaging:** Send direct messages to other users.

---

## Project Structure

```
/client      # React frontend
/server      # Express backend, Socket.IO, MongoDB models
```

---

## Getting Started

### Prerequisites

- Node.js v18+ (LTS recommended)
- MongoDB running locally or a MongoDB Atlas URI

---

### 1. Clone the repository

```sh
git clone <repo-url>
cd week-5-web-sockets-assignment-Ezekiel-Lokeru
```

---

### 2. Setup Environment Variables

Create a `.env` file in `/server`:

```
MONGO_URI=mongodb://localhost:27017/chatapp
CLIENT_URL=http://localhost:5173
PORT=5000
```

---

### 3. Install Dependencies

#### Server

```sh
cd server
npm install
```

#### Client

```sh
cd ../client
npm install
```

---

### 4. Run the Application

#### Start the backend server

```sh
cd ../server
npm start
```

#### Start the frontend (React) dev server

```sh
cd ../client
npm run dev
```

---

### 5. Open in Browser

Visit [http://localhost:5173](http://localhost:5173)

---

## API Endpoints

- `POST /api/users` — Register/login a user
- `GET /api/rooms` — List all chat rooms
- `POST /api/rooms` — Create a new chat room
- `GET /api/messages/:roomId` — Get messages for a room

---

## Socket.IO Events

- `chat message` — Send/receive chat messages (with `{ user, text, roomId }`)
- `joinRoom` — Join a chat room
- `user_join`, `user_left` — User presence
- `typing` — Typing indicator
- `private_message` — Direct messages

---

## Notes

- Make sure MongoDB is running before starting the server.
- The frontend expects the backend to run on port 5000 and the client on 5173 (default Vite port).
- All messages are stored in MongoDB and loaded per room.

---

## License

MIT

---
