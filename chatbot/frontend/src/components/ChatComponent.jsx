import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChatComponent = ({ userId }) => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [currentConversationId, setCurrentConversationId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to the UI immediately
    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send the message to the backend
      const response = await axios.post(`/api/${userId}/chat`, {
        message: inputValue,
        conversation_id: currentConversationId
      });

      // Update conversation ID if it's the first message
      if (!currentConversationId) {
        setCurrentConversationId(response.data.conversation_id);
      }

      // Add AI response to messages
      const aiMessage = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to the chat
      const errorMessage = {
        id: Date.now() + 2,
        role: 'assistant',
        content: 'Sorry, I encountered an error processing your request. Please try again.',
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
          >
            <div className="message-content">
              <strong>{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong>
              <p>{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai-message">
            <div className="message-content">
              <strong>Assistant:</strong>
              <p><em>Thinking...</em></p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chat-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;