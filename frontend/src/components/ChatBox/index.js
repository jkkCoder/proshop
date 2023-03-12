import React, { useEffect, useRef, useState } from 'react';
import './styles.css';

const Chatbox = ({messages,setMessages}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages([...messages, { text: inputValue.trim(), isUser: true }]);

      //call the dialogflow api here



      setInputValue('');
    }
  };

  return (
    <div className="chatbox-container">
      <div className="chatbox" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user-message' : 'bot-message'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form style={{display:"flex"}} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type your message here"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="input-message"
        />
        <button type="submit" className="send-message-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbox;