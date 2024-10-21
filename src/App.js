import Registerpage from "./pages/Registerpage";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import DashBoardPage from "./pages/Dashboard";
import Loginpage from "./pages/Loginpage";
import Homepage from "./pages/Homepage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Registerpage/>}/>
          <Route path="/login" element={<Loginpage/>}/>
          <Route path="/dashboard" element={<DashBoardPage/>}/>
          <Route path="/" element={<Homepage/>}/>
        </Routes>
      </BrowserRouter>     
    </div>

  );
}

export default App;
