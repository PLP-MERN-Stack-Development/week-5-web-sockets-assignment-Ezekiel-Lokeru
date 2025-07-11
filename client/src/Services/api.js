import axios from "axios";
import { io } from "socket.io-client";


const BackendBaseUrl = "http://localhost:5000";
const APIBaseUrl = import.meta.env.VITE_API_BASE_URL || `${BackendBaseUrl}/api`;

const API = axios.create({
    baseURL: APIBaseUrl,
});


export const registerUser = ( username )=> API.post("/auth/register", { username });

export const getRooms = ()=> API.get("/rooms");
export const createRoom = (roomData) => API.post("/rooms", roomData);

export const getMessages = (roomId) => API.get(`/messages/${roomId}`);


export const socket = io(BackendBaseUrl, { autoConnect: false });