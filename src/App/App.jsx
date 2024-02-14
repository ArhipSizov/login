import "./App.css";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import Cat from "../pages/Cat/Cat";


import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";

function App() {

  return (
    <Router>
      <div></div>
      <Routes>
        <Route path="/" element={<Cat />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </Router>
  );
}
export default App;