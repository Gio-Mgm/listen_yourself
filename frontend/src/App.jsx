import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginApp from './pages/LoginApp';
import NotFound from './pages/NotFound';
import Home from './pages/Home';

const App = () => {
    const [isLogged, setIsLogged] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<LoginApp setIsLogged={setIsLogged} />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='/*' element={<NotFound />}/>
                {/* <Route path='/' element={}/> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;
