import React, { useState, useEffect, useRef } from 'react';
import './AiChat.css';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';
import { API_BASE_URL } from '../../api/config';
const AiChat = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messageListRef = useRef(null);

    useEffect(() => {
        if (messageListRef.current) {
            messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputValue.trim() === '' || isTyping) return;

        const userMessageText = inputValue;
        
        const userMessage = {
            id: Date.now(),
            text: userMessageText,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/ai/chat`, {
                prompt: userMessageText
            });

            if (response.data.success) {
                const aiResponse = {
                    id: Date.now() + 1,
                    text: response.data.reply,
                    sender: 'ai',
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                };
                setMessages(prev => [...prev, aiResponse]);
            } else {
                throw new Error("Failed to get AI response.");
            }
        } catch (error) {
            const errorResponse = {
                id: Date.now() + 1,
                text: "Sorry, I'm having a little trouble connecting right now. Please try again in a moment.",
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, errorResponse]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            <div className="ai-chat-page">
                <div className="chat-window">
                    <header className="chat-header">
                        <h2>Glo, your Beauty AI</h2>
                        <div className="status-indicator">
                            <span className="online-dot"></span> Online
                        </div>
                    </header>
                    <main className="message-list" ref={messageListRef}>
                        {messages.length === 0 && (
                            <div className="empty-chat-welcome">
                            </div>
                        )}
                        {messages.map(message => (
                            <div key={message.id} className={`message-container ${message.sender === 'user' ? 'user-message' : 'ai-message'}`}>
                                <div className="message-bubble">
                                    <p className="message-text">{message.text}</p>
                                    <span className="message-timestamp">{message.timestamp}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                             <div className="message-container ai-message">
                                <div className="message-bubble typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                    </main>
                    <form className="chat-input-form" onSubmit={handleSendMessage}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Ask Glo anything..."
                            disabled={isTyping}
                        />
                        <button type="submit" disabled={isTyping}>
                            <FaPaperPlane />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AiChat;