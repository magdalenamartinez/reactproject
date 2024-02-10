import React from "react";
import Image_oferta from '../../headerpages/image_oferta.js';
import ChatButton from "../../headerpages/botones/botonchat.js";
import DeleteButton from "../../headerpages/botones/botonEliminar.js";
import ChatButtonOpen from "../../headerpages/botones/botonchatopen.js"
function ChatComponent({conversaciones, handleConversation, deleteConversation, deleteStates, hide}) {

    return(
        <ul className="ul_class">
        {conversaciones.length > 0 ? (
            conversaciones.map((conversacion) => (
                (deleteStates && deleteStates[conversacion.id] === false ) &&
                (hide ? (conversacion.readByAdmin === 0) : true) &&
                <div key={conversacion.id} className="redimensionar_bloque">
                    <li className="bloque_view round_bloque" style={{ listStyle: 'none' }}>
                        <div className="leftright" style={{ maxWidth: '100%' }}>
                            <Image_oferta oferta={conversacion} imagenPorDefecto={"/images/user.png"}/>
                            <div className="right-verybig">
                                <h1 className="title_container" style={{margin: '0px'}}>{conversacion.user}</h1>
                                <div className="description_container">
                                    <p className="">Correo Electrónico: {conversacion.name}</p>                                
                                    <p className="">Nº de Teléfono: {conversacion.correo}</p>                                
                                </div>
                        </div>
                            {conversacion.readByAdmin===1 ? (
                                <ChatButtonOpen notext={true} onClick={() => handleConversation(conversacion.id, conversacion.user)} />
                            ) : (
                                <ChatButton notext={true} onClick={() => handleConversation(conversacion.id, conversacion.user)} />
                            )}
                            <DeleteButton notext={true} onClick={()=>deleteConversation(conversacion.id)}/>
                        </div>
                    </li>
                </div>
            ))
        ) : (
            <p>No hay conversaciones.</p>
          )}
    </ul>
    );
}
export default ChatComponent;