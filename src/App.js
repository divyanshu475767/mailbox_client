import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Signup from "./components/Signup";
import CreateMail from "./components/CreateMail";
import Sidebar from "./components/Sidebar";
import './App.css'
import ReceivedEmailList from "./components/ReceivedEmailList";
import DetailedMail from "./components/DetailedMail";
import SentEmailList from "./components/SentMailList";





function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="App">

      <Router>
        <Sidebar/>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {token && <Route path="/" element={<ReceivedEmailList/>} />}
          {token && <Route path="/newMail" element={<CreateMail/>} />}
          {token && <Route path="/mail/:id" element={<DetailedMail/>} />}
          {token && <Route path="/sentMails" element={<SentEmailList/>} />}


          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
