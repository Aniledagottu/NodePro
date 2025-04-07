import './App.css';
import { SocketProvider } from './contexts/SocketContext';
import Chat from './components/Chat';
import AdminChat from './components/AdminChat';
import SignUp from './components/Singup';
import Login from './components/Login';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState("signup")
  const [logedInUser, setLogedInUser] = useState({})
  return (
    <SocketProvider>
      <div className="App">
        { page == 'login' &&
        <Login
          setPage={setPage}
          setLogedInUser={setLogedInUser}
        />}
        { page == "signup" && <SignUp setPage={setPage}/>}
        { page == 'chat' && 
        <Chat 
          setPage={setPage}
          logedInUser={logedInUser}
          />}
        {/* { page == 'admin' && <AdminChat setPage={setPage} />}         */}
      </div>
    </SocketProvider>
  );
}

export default App;
