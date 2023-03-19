import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { getReplyMessage } from '../../utils/getChatbotReply';
import './styles.css';

const Chatbox = ({messages,setMessages}) => {
  const [inputValue, setInputValue] = useState('');
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setMessages(msgs => [...msgs, { text: inputValue.trim(), isUser: true }]);

      //set input value empty again
      setInputValue('');

      //call the dialogflow api here
      const config = {
        headers:{
            "Content-Type":"application/json"
            }
        }
        const res = await axios.post("/dialogflow",{message:inputValue},config)
        console.log("response is ",res)
        const reply = getReplyMessage(res.data.message,setMessages)

        if(reply.shouldSet === true){
          setMessages(msgs => [...msgs, { text: reply.text, isUser: false }]);
        }
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