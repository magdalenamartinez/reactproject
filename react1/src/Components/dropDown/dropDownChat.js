import React, { useEffect, useRef, useState } from "react";
import sendMessageDB from "./../messages/sendMessage.js";
import getMessages from "./../messages/getMessages.js";
import Spinner from "../spinner.js";
import RenderMessages from "./../messages/rendermessages.js";

const DropDownChat = ({ openclass, userData }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState('');
  const messagesEndRef = useRef(null);
  
  const getAllMessages = async () => {
    try {
      await getMessages(userData.id, userData.typeUser, setMessages, false);
      setData(true);
    } catch (error) {
      console.error('Error al recuperar los mensajes:', error);
    }
  };

  useEffect(() => {
    if (userData && userData.typeUser !== 3 && !data) {
      getAllMessages();
    }
  }, [userData]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
  
    const interval = setInterval(() => {
        getAllMessages();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log('Ref is not set');
    }
  };

  const handleInput = (event) => {
    setInputText(event.target.value);
  };

  const handleSendMessage = async () => {
    if (inputText.trim() !== '' && userData) {
      const newMessage = { message: inputText, sender_id: userData.id, sender_type: 'user', timestamp: new Date().toISOString() };
      setMessages([...messages, newMessage]);
      setInputText('');
      await sendMessageDB(inputText, userData.id, userData.typeUser, 'user');
    }
  };

  const handleKey = async(event) => {
    if (event.key === 'Enter') {
        await handleSendMessage();
    }
  }

  if (!userData) {
    return <Spinner />;
  }

  return (
    <div className={openclass} id="drop_menu">
        <p className="chat_asistencia">Chat de Asistencia</p>
      <div className="chat-messages">
        <RenderMessages messages={messages} type={'user'}/>
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input form_search">
        <input
          type="text"
          value={inputText}
          onChange={handleInput}
          placeholder="Escribe un mensaje..."
          className="texto_barra"
          onKeyDown={handleKey}
        />
        <button className="button_class" onClick={handleSendMessage}>
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};

export default DropDownChat;
