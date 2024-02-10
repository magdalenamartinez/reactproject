

function RenderMessages({messages, type}) {
  const formatTimestamp = (timestamp) => {
    const currentDate = new Date();
    const messageDate = new Date(timestamp);
    if (messageDate.toDateString() === currentDate.toDateString()) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' +
             messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  
  return(
    messages.map((message, index) => (
      <div key={index} className={`message ${message.sender_type === type ? 'sent' : 'received'}`}>
        <div>{message.message}</div>
        <div className="time">{formatTimestamp(message.timestamp)}</div>
      </div>))
  );
}

export default RenderMessages;