
import { useState, useEffect } from 'react';
import { useSocket } from '../contexts/SocketContext';

const AdminChat = () => {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('admin'); 

  useEffect(() => {
    if(!socket){
      return;
    }
    socket.emit('register', username);

    socket.on('admin_chat_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('admin_chat_message');
    };
  }, [socket, username]);

  const handleSendMessage = () => {
    if (message) {
      socket.emit('admin_chat_message', { target: 'user1', message, sender: username });
      setMessages((prevMessages) => [...prevMessages, { message, sender: 'You' }]);
      setMessage('');
    }
  };

  return (
    <div className="container">
      <h2>Chat with User</h2>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
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

export default AdminChat;
