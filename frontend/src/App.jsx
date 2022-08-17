import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginApp from './pages/LoginApp';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const App = () => {
    const [user, setUser] = useState("");
    return (
        <BrowserRouter>
            <Routes>
                { user ?
                    <Route path='/' element={<Home user={user} setUser={setUser}/>}/> :
                    <Route path='/' element={<LoginApp setUser={setUser} />}/>
                }
                <Route path='/*' element={<NotFound />}/>
                {/* <Route path='/' element={}/> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
