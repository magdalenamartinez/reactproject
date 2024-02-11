import React, {useEffect, useState, useRef} from "react";
import { useUser } from "../funcionalidades/userContext";
import Spinner from "../spinner";
import { useParams } from "react-router-dom";
import RenderMessages from "../messages/rendermessages";
import sendMessageDBApply from "./sendMessage";
import { Link } from "react-router-dom";
import getMessagesApply from "./getMessagesApply";
function ChatEmpresaCliente() {

    const {idEmpresa, idCliente, user, type} = useParams();
    const [data, setData] = useState('');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');
    const messagesEndRef = useRef(null);

    const {userData} = useUser();

    useEffect(() => {
        const getAllMessages= async()=> {
            await getMessagesApply(idCliente, idEmpresa, type, setMessages); //en caso de q la conversacion ya este iniciada.
            setData(true);
        }
        if (idEmpresa && idCliente && user && type) {
            getAllMessages();
        }

    }, [])

    useEffect(() => {
        scrollToBottom();
      }, [messages]);

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

    useEffect(() => {
        const interval = setInterval(() => {
            getAllMessages();
        }, 5000);
    return () => clearInterval(interval);
    }, []);

    const handleSendMessage = async () => {
        if (inputText.trim() !== '' && userData) {
          const newMessage = { message: inputText, sender_id: (type==='empresa')? idEmpresa:idCliente, sender_type: type, 
          timestamp: new Date().toISOString() };
          setMessages([...messages, newMessage]);
          setInputText('');
          //texto, idEmpresa, idCliente, empresa(tipoUsuario)
          await sendMessageDBApply(inputText, idEmpresa, idCliente, type);
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
        <div className="contenedor"> 
        <div className="chatEmpresaUser"> 
        {type === 'empresa'? (<Link className='back_link' to='/ofertasCreadas'><i className="fa-solid fa-circle-chevron-left"></i></Link>):(<Link className='back_link' to='/perfilUsuario'><i className="fa-solid fa-circle-chevron-left"></i></Link>)}
        
        <h1><i className="fa-solid fa-comments"></i>  Chat con el Usuario {user}</h1>
        <div className="chat-messagesempresauser">
            <RenderMessages messages={messages} type={type} changeMessage={true}/>
            <div ref={messagesEndRef} />
        </div>
        <div className="chatInputempresauser form-search">
            <input
            type="text"
            value={inputText}
            onChange={handleInput}
            placeholder="Escribe un mensaje..."
            className="texto_barra leftEspacio"
            onKeyDown={handleKey}
            />
            <button className="button_class" onClick={handleSendMessage}>
            <i className="icon_class fa-solid fa-paper-plane"></i>
            </button>
        </div>
    </div>
    <br/>
    <br/>
    </div>
      );
}


export default ChatEmpresaCliente;