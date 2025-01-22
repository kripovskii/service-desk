import 'react';
import LoginPage from './pages/login.jsx';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Main from './pages/Main';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />}/>
                <Route path="/main" element={<Main />}/>

            </Routes>
        </Router>
    );
}

export default App;