import {BrowserRouter as Router , Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import Auth from "./pages/Auth";


export default function App(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/auth" element={<Auth/>}/>
            </Routes>
        </Router>
    )
}