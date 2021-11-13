import "./App.css";
import { Home } from "./pages";
import Login from "./components/Login";
import { Routes, Route } from "react-router-dom";
import { checkInitialAuth } from "./api/connection";

function App() {
  //check access
  checkInitialAuth();
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
