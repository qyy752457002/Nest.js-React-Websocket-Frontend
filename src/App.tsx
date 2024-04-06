import React from 'react';
import './App.css';
import { socket, WebsocketProvider } from './contexts/WebsocketContext';
import { Websocket } from './components/Websocket';

/*

  在React应用中，有时候我们需要在多个组件之间共享某些状态或者数据。

  Context提供了一种在组件树中共享数据的方式，
  而不需要通过逐层传递 props 的方式。

  在这个例子中，WebsocketContext就是一个Context，
  它的目的是在整个组件树中共享 WebSocket 实例，
  以便在需要的地方使用。

  通过在App组件中使用WebsocketContext.Provider，
  我们将socket实例作为值传递给了整个应用程序的组件树。

  这样，在任何一个被包裹在WebsocketContext.Provider内的组件中，
  我们都可以通过useContext(WebsocketContext)来获取到socket实例，
  而不需要通过 props 逐层传递。

  这种方式在需要在多个组件中使用 WebSocket 连接时非常方便，
  而不必在每个组件中都去单独创建 WebSocket 连接

*/

// 应用主组件
function App() {
  return (
    // 提供 WebSocket 上下文给子组件
    <WebsocketProvider value={socket}>
      {/* 渲染 WebSocket 组件 */}
      <Websocket /> 
    </WebsocketProvider>
  );
}

export default App;
