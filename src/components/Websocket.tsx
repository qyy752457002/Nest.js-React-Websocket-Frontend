import { useContext, useEffect, useState } from "react";
import { WebsocketContext } from "../contexts/WebsocketContext";

type MessagePayload = {
  content: string;
  msg: string;
};

export const Websocket = () => {

  // 定义状态用于存储输入框的值和接收到的消息
  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  
  // 使用 useContext 获取 WebSocket 上下文
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    // 当组件挂载时，注册事件监听器
    socket.on('connect', () => {
      console.log('Connected');
    })

    socket.on('onMessage', (newMessage: MessagePayload) => {
      console.log('onMessage event received!');
      console.log(newMessage);
      // 接收到新消息时更新状态
      setMessages((prev) => [...prev, newMessage])
    });

    // 当组件卸载时，取消注册事件监听器
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('onMessage');
    };
  }, []);

  // 提交消息的处理函数
  const onSubmit = () => {
    // 发送新消息
    socket.emit('newMessage', value);
    // 清空输入框的值
    setValue('');
  }

  return (
    <div>
      <div>
        <h1>Websocket Component</h1>
        <div>
          {/* 显示消息列表 */}
          {messages.length === 0 ? (
            <div>No Messages</div>
          ) : (
            <div>
              {messages.map((msg, index) => (
                <div key={index}>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* 输入框和提交按钮 */}
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button onClick={onSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};
