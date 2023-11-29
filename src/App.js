import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Login from "./components/Login";
import Lemon from "./components/Lemon";
import Signup from "./components/Signup";

function App() {
  const token = useSelector((state) => state.auth.token);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {token && <Route path="/" element={<Lemon />} />}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
