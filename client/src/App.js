import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Hotel from "./pages/hotel/Hotel";
import Login from "./pages/login/Login";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={!user ? <Login /> : <Home />} />
        <Route path="/hotels" element={user ? <List /> : <Login />} />
        <Route path="/hotels/:id" element={user ? <Hotel /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
