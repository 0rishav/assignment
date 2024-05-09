import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/updateUser";
import {Toaster} from "react-hot-toast"
import MyProfile from "./components/MyProfile";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/getuser" element={<MyProfile/>} />
          


        </Routes>
        <Toaster position="bottom-center"/>
      </Router>

    </div>
  );
};

export default App;
