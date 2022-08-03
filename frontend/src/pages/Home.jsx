import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "../utils/GlobalStyle";
import { lightTheme, darkTheme } from "../utils/Themes"

const Home = () => {

    // is linked to spotify or not
    const [isLinked, setIsLinked] = useState(false)
    // component to display when nav item is clicked
    const [view, setView] = useState("Dashboard")
    // token for spotify API queries
    const [token, setToken] = useState("")
    // handle color scheme
    const [theme, setTheme] = useState('light');
    const handleThemeToggle = () => theme === 'light' ? setTheme('dark') : setTheme('light')

    const ThemeToggler = () => (
        <Button id="theme-toggler"
                className='spotify-green'
                onClick={handleThemeToggle}>
                    Switch Theme
        </Button>
    )

    const views = {
        "Dashboard": <Dashboard />,
        "Analyze": <Analyze />,
        "Other": <Main />,
    }

    const handleReset = () => {
        setView("Dashboard")
        resetCookies(setIsLinked)
    }

    const checkAccessToken = () => {
        localStorage.getItem("me") && setToken(localStorage.getItem("me"))
    }

    useEffect(() => {
        // check if we were already connected to spotify
        if ( document.cookie && getCookie("access_token")) {
            const _access_token = getCookie("access_token")
                localStorage.setItem("access_token", _access_token)
                setToken(_access_token)
                setIsLinked(true)
        } else {
            // create cookies and store tokens
            const _access_token = getTokenFromUrl().access_token
            if (_access_token) {
                setToken(_access_token)
                setIsLinked(true)
                generateCookies()
            }
        }
        // clean the adress bar
        history.replaceState(null, document.getElementsByTagName("title")[0].innerHTML, window.location.pathname)
    }, [token]); // dependencies : re-run only when one of these values change

    const resetCookiesBtn = (
        <Button className="spotify-btn fa-brands fa-name"
                variant="danger"
                onClick={handleReset}>
            Reset cookies
        </Button>
    )

    // spotifyApi.setAccessToken(token)
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles/>
                <div className='App'>
                    <Navigation isLinked={isLinked} setView={setView} ThemeToggler={ThemeToggler} theme={theme}/>
                    <Container fluid>
                        {/* {
                            !isLinked ? <Login /> :
                            view === "Dashboard" ? <Dashboard /> :
                            view === "Analyze" ? <Analyze />  :
                            view === "Other" && <Main />
                        } */}
                        {!isLinked ? <Login /> : views[view]}
                        {/* <Analyze/> */}
                        <Row>
                            <Col md={4}>{/* <SideMenu /> */}</Col>
                            <Col md={8}>{/* <Main/> */}</Col>
                        </Row>
                        {resetCookiesBtn}
                    </Container>
                </div>
        </ThemeProvider>
    );
}
export default Home