import { useEffect, useState } from "react";
import { getRooms, createRoom, getMessages, socket } from "../Services/api";
import ChatRoom from "../components/chatRoom";


export default function Home({ user }){
    const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        fetchRooms();
        socket.connect();
        return () => socket.disconnect();
    }, []);


    const fetchRooms = async () => {
        try {
            const res = await getRooms();
            setRooms(res.data);
        } catch (error) {
            console.error("Failed to fetch rooms", error.message)
        }
    };
    const handleCreateRoom = async (roomName) => {
        try {
            const res = await createRoom({ name: roomName });
            setRooms((prevRooms) => [...prevRooms, res.data]);
        } catch (error) {
            console.error("Failed to create room", error.message);
        }
    };
    const handleJoinRoom = async (room) => {
        socket.emit("joinRoom", { username: user.username, roomId: room._id });
        setCurrentRoom(room);
        const res = await getMessages(room._id);
        setMessages(res.data)
    };

    return(
        <div className="flex h-screen">
            <aside className="w-1/4 bg-gray-800 text-white p-4">
                <h2 className="text-lg mb-2">Rooms</h2>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                        const roomName = e.target.elements.roomName.value.trim();
                        if (roomName) {
                            handleCreateRoom(roomName);
                            e.target.reset();
                        }
                    }}
                    className="mb-4 white"
                >
                    <input
                        type="text"
                        name="roomName"
                        placeholder="New room name"
                        className="w-full p-2 rounded text-white mb-2"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 p-2 rounded hover:bg-blue-500"
                    >
                        Create Room
                    </button>
                </form>
                <ul>
                    {rooms.map((room) => {
                        return(
                            <li key={room._id} className="mb-2">
                                <button onClick={() => handleJoinRoom(room)} className="w-full bg-gray-700 p-2 rounded hover:bg-gray-600">
                                    {room.name}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </aside>

            <main className="flex-1 p-4">
                {currentRoom ? (
                    <ChatRoom 
                        room={currentRoom}
                        messages={messages}
                        user={user}
                        socket={socket}
                    />
                ): (
                    <p>Select a room to join</p>
                )}
            </main>
        </div>
    )
}