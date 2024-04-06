import { createContext } from 'react';
import { io, Socket } from 'socket.io-client'; 

// 创建 WebSocket 连接
// 根据 WebSocket 服务器的 地址来确定 (这里我们的 nestjs-websocket-app 运行在本地)
export const socket = io('http://localhost:9001');

// 创建 WebSocket 上下文
export const WebsocketContext = createContext<Socket>(socket);

// 创建 WebSocket 提供者
export const WebsocketProvider = WebsocketContext.Provider;
