/**
 * Live Chat Widget Component
 * Floating chat widget for customer support
 * @module components/shop
 */

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ChatMessage {
  id: string;
  user_name: string;
  message: string;
  is_staff_reply: boolean;
  staff_name?: string;
  created_at: string;
}

interface ChatWidgetProps {
  productId?: string;
}

export function ChatWidget({ productId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generate or retrieve session ID
  useEffect(() => {
    let sid = localStorage.getItem('chat_session_id');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('chat_session_id', sid);
    }
    setSessionId(sid);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch messages periodically when open
  useEffect(() => {
    if (!isOpen || !sessionId || !isNameSet) return;

    const fetchMessages = async () => {
      try {
        const response = await api.get(`/products/chat/${sessionId}/messages/`);
        setMessages(response.data);
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds

    return () => clearInterval(interval);
  }, [isOpen, sessionId, isNameSet]);

  const startChat = async () => {
    if (!userName.trim()) return;

    try {
      await api.post('/products/chat/start/', {
        session_id: sessionId,
        user_name: userName,
        product_id: productId,
      });
      setIsNameSet(true);
    } catch (error) {
      console.error('Failed to start chat:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const response = await api.post(`/products/chat/${sessionId}/send/`, {
        message: inputMessage,
        user_name: userName,
      });
      
      setMessages([...messages, response.data]);
      setInputMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
        aria-label="Open chat"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 h-96 bg-white rounded-lg shadow-2xl flex flex-col overflow-hidden border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4">
            <h3 className="font-semibold text-lg">Live Chat Support</h3>
            <p className="text-sm text-purple-100">We're here to help!</p>
          </div>

          {!isNameSet ? (
            /* Name Input */
            <div className="flex-1 p-6 flex flex-col justify-center">
              <h4 className="font-semibold mb-2">Start a conversation</h4>
              <p className="text-sm text-gray-600 mb-4">Please enter your name to begin</p>
              <Input
                placeholder="Your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && startChat()}
                className="mb-3"
              />
              <Button onClick={startChat} className="w-full">
                Start Chat
              </Button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 text-sm mt-8">
                    <p>No messages yet.</p>
                    <p className="mt-1">Send a message to start the conversation!</p>
                  </div>
                )}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'mb-3 flex',
                      msg.is_staff_reply ? 'justify-start' : 'justify-end'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-[80%] rounded-lg px-3 py-2',
                        msg.is_staff_reply
                          ? 'bg-white border border-gray-200'
                          : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      )}
                    >
                      <p className={cn(
                        'text-xs font-semibold mb-1',
                        msg.is_staff_reply ? 'text-purple-600' : 'text-purple-100'
                      )}>
                        {msg.is_staff_reply ? msg.staff_name || 'Support' : msg.user_name}
                      </p>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={sendMessage} className="p-3 border-t border-gray-200 bg-white">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    disabled={isSending}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isSending || !inputMessage.trim()} size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}
