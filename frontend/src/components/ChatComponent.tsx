import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode'; // Using jwt-decode for decoding JWT tokens

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface JwtPayload {
  sub: string; // user ID
  exp: number; // expiration time
  iat: number; // issued at time
}

interface ChatComponentProps {
  userId?: string;
}

const ChatComponent: React.FC<ChatComponentProps> = ({ userId: propUserId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | undefined>(propUserId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();

    // Try to get user ID from stored JWT token if not provided as prop
    if (!userId) {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          setUserId(decoded.sub);
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Determine the user ID to use
    let effectiveUserId = userId;
    if (!effectiveUserId) {
      // If no user ID is set, try to get it from token or create a guest ID
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const decoded = jwtDecode<JwtPayload>(token);
          effectiveUserId = decoded.sub;
          setUserId(decoded.sub); // Update state for future messages
        } catch (error) {
          console.error('Error decoding token:', error);
          // Use a guest ID if token is invalid
          effectiveUserId = 'guest-' + Date.now().toString();
          setUserId(effectiveUserId); // Update state for future messages
        }
      } else {
        // No token, use a guest ID
        effectiveUserId = 'guest-' + Date.now().toString();
        setUserId(effectiveUserId); // Update state for future messages
      }
    }

    // Add user message to the UI immediately
    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: inputValue,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Send the message to the backend with authorization header if not a guest user
      const headers: Record<string, string> = {};

      // Only add authorization header if not using guest user ID
      if (effectiveUserId && effectiveUserId !== 'user-123' && !effectiveUserId.startsWith('guest-')) {
        const token = localStorage.getItem('access_token');
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }
      }

      const response = await axios.post(`/api/${effectiveUserId}/chat`, {
        message: inputValue,
        conversation_id: currentConversationId
      }, { headers });

      // Update conversation ID if it's the first message
      if (!currentConversationId) {
        setCurrentConversationId(response.data.conversation_id);
      }

      // Add AI response to messages
      const aiMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: response.data.response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);

      // Add error message to the chat
      const errorMessage: Message = {
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
    <div className="chat-container bg-white rounded-lg shadow-lg p-4 w-full max-w-2xl">
      <div className="chat-header mb-4">
        <h2 className="text-xl font-bold text-gray-800">AI Assistant</h2>
        <p className="text-sm text-gray-600">Ask me anything about your tasks!</p>
        {!userId && (
          <p className="text-xs text-blue-500 mt-1">Note: You're using the chatbot as a guest. Sign in to save your conversations.</p>
        )}
      </div>
      
      <div className="chat-messages h-96 overflow-y-auto mb-4 border rounded p-2">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500">
            <p>Start a conversation with the AI assistant...</p>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message mb-3 p-2 rounded ${
                  msg.role === 'user' ? 'bg-blue-100 ml-auto max-w-[80%]' : 'bg-gray-100 mr-auto max-w-[80%]'
                }`}
              >
                <div className="message-content">
                  <strong className="font-medium">{msg.role === 'user' ? 'You:' : 'Assistant:'}</strong>
                  <p className="mt-1">{msg.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message mb-3 p-2 rounded bg-gray-100 mr-auto max-w-[80%]">
                <div className="message-content">
                  <strong className="font-medium">Assistant:</strong>
                  <p className="mt-1"><em>Thinking...</em></p>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form flex">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          disabled={isLoading}
          className="flex-grow border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-r disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;