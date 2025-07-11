import React, { useState, useEffect, useRef } from 'react';

const ChatRoom = ({ socket, room, username }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (!socket) return;

        const handleMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on('chat message', handleMessage);

        return () => {
            socket.off('chat message', handleMessage);
        };
    }, [socket]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && socket) {
            socket.emit('chat message', { user: username, text: input, roomId: room._id });
            setInput('');
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10">
            <div className="h-96 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow p-4">
                {messages.map((msg, idx) => (
                    <div
                        key={idx}
                        className={`my-2 flex ${msg.user === username ? 'justify-end' : 'justify-start'}`}
                    >
                        <div className={`px-4 py-2 rounded-lg max-w-xs break-words
                            ${msg.user === username
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-900'
                            }`}
                        >
                            <span className="font-semibold">{msg.user}:</span> {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="flex mt-4 gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="px-6 py-2 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default ChatRoom;