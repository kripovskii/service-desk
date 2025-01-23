import 'react';
import LoginPage from './pages/login.jsx';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
import Tickets from "./pages/Tickets.jsx";
import Details from "./pages/Detail.jsx";
import Edit from "./pages/Edit.jsx";
import Create from "./pages/Create.jsx";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/" element={<Main />}/>
                <Route path="/tickets" element={<Tickets />}/>
                <Route path="/ticket/:ticketId" element={<Details />}/>
                <Route path="/ticket/:ticketId/edit" element={<Edit />}/>
                <Route path="/create" element={<Create />}/>

            </Routes>
        </Router>
    );
}

export default App;