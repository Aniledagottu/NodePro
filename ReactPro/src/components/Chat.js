
import { useState, useEffect, useMemo } from 'react';
import { useSocket } from '../contexts/SocketContext';

const Chat = ({
  setPage,
  logedInUser
}) => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('user1'); // default username

  useEffect(() => {
    if(!socket){
      return;
    }
    socket.emit('register', username);

    socket.on('chat_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('chat_message');
    };
  }, [socket, username]);

  const handleSendMessage = () => {
    if (message) {
      socket.emit('chat_message', { target: username == 'admin'? "my user": "admin", message, sender: username });
      setMessages((prevMessages) => [...prevMessages, { message, sender: 'You' }]);
      setMessage('');
    }
  };

  useEffect(() => {
    setUsername(logedInUser.name);
  }, [logedInUser])
  return (
    <div className="container">
      <h2 className='center-heading'>Chat</h2>
      <h3>{logedInUser?.name}</h3>

      <div>
        {messages.map((msg, index) => (
          <>
            <div key={index} className={msg.sender == 'You' ? 'right-text' : ''}>
              <strong>{msg.sender}</strong>
            </div>
            <div key={index + "msg"} className={msg.sender == 'You' ? 'right-text' : ''}>
              {msg.message}
            </div>
            <br/>
          </>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default Chat;
