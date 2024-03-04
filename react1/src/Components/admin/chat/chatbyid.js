import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import getMessages from "./../../messages/getMessages.js";
import Spinner from "../../spinner";
import RenderMessages from "./../../messages/rendermessages.js";
import { useUser } from "../../funcionalidades/userContext";
import Sidebar from "../sidebar";
import sendMessageDB from "./../../messages/sendMessage.js";

function ChatById() {
    const [data, setData] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const [link, setLink] = useState('');
    const messagesEndRef = useRef(null);
    const {id, type, user} = useParams();
    
    const {userData} = useUser();
    const getAllMessages = async() => {
        let admin = true;
        await getMessages(id, type, setMessages, admin);
        setData(true);
    }

    useEffect(()=> {
        if (id && type && !data) {
            if (type === 1 || type === '1') {
                setLink('/chatClientes/mensajesClientes/chat_messages/1');
            } else {
                setLink('/chatEmpresas/mensajesEmpresas/chat_messages_empresa/2');
            }
            getAllMessages();

        }
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const interval = setInterval(() => {
            getAllMessages();
        }, 2000);
       
    return () => clearInterval(interval);
    }, []);

    const handleInput = (event) => {
        setInputText(event.target.value);
      };

    const scrollToBottom = () => {
    if (messagesEndRef.current) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
        console.log('Ref is not set');
    }
    };

    const handleSendMessageAdmin = async () => {
        if (inputText.trim() !== '' && userData) {
            const newMessage = { message: inputText, sender_id: id, sender_type: 'admin', timestamp: new Date().toISOString() };
            setMessages([...messages, newMessage]);
            setInputText('');
            await sendMessageDB(inputText, id, type, 'admin');
          }
    };
    const handleKey = async(event) => {
        if (event.key === 'Enter') {
            await handleSendMessageAdmin();
        }
    }

    if (!userData) {
        return <Spinner />;
      }
    
      return (
        <div className="dashboard">
            <Sidebar/>
            <div className="chatAdmin"> 
                <Link className='back_link' to={link}><i className="fa-solid fa-circle-chevron-left"></i></Link>
                <h1><i className="fa-solid fa-comments"></i>    Chat De Asistencia para Usuario "{user}" </h1>
                <div className="chat-messagesadmin">
                    <RenderMessages messages={messages} type={'admin'}/>
                    <div ref={messagesEndRef} />
                </div>
                <div className="chatInputAdmin form-search">
                    <input
                    type="text"
                    value={inputText}
                    onChange={handleInput}
                    placeholder="Escribe un mensaje..."
                    className="texto_barra leftEspacio"
                    onKeyDown={handleKey}
                    />
                    <button className="button_class" onClick={handleSendMessageAdmin}>
                    <i className="fa-solid fa-paper-plane"></i>
                    </button>
                </div>
            </div>
        </div>
      );
    };

export default ChatById;