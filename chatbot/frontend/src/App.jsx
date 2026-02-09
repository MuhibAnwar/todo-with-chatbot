import React from 'react';
import './App.css';
import ChatComponent from './components/ChatComponent';

function App() {
  // In a real app, this would come from authentication
  const userId = 'user-123'; 

  return (
    <div className="App">
      <header className="app-header">
        <h1>Todo AI Chatbot</h1>
        <p>Manage your tasks with natural language</p>
      </header>
      
      <main className="app-main">
        <div className="chat-container-wrapper">
          <ChatComponent userId={userId} />
        </div>
      </main>
      
      <footer className="app-footer">
        <p>© 2026 Todo AI Chatbot. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;