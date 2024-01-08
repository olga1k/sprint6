import "./assets/App.css";
import Home from "./pages/Home";
import MainPage from "./pages/MainPage.js"
import { Routes, Route } from 'react-router-dom'
import NewProvider from "./components/NewProvider.js";
//mport { Try } from "./Try.js";


function App() {
   return (
    <>
    <NewProvider>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/main" element={<MainPage/>} />
     </Routes>
     </NewProvider>
     </>
  );
}

export default App;
