import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

import {ThemeProvider} from "styled-components";
import { GlobalStyles } from "../utils/GlobalStyle";
import { lightTheme, darkTheme } from "../utils/Themes"

import Navigation from "../components/Navigation"
import { Profile } from '../components/Profile';
import { PredictionInput } from '../components/PredictionInput';

const Home = ({user, setUser}) => {

    // component to display when nav item is clicked
    const [view, setView] = useState("")

    const [theme, setTheme] = useState('dark');
    const handleThemeToggle = () => theme === 'light' ? setTheme('dark') : setTheme('light')

    const ThemeToggler = () => (
        <Button id="theme-toggler"
                className='spotify-green'
                onClick={handleThemeToggle}>
                    Switch Theme
        </Button>
    )

    // const views = {
    //     "Dashboard": <Dashboard />,
    //     "Analyze": <Analyze />,
    //     "Other": <Main />,
    // }

    const handleReset = () => {
        localStorage.clear()
        setUser(null)
    }

    const resetBtn = (
        <Button className="fa-brands fa-name"
                variant="danger"
                onClick={handleReset}>
            Reset
        </Button>
    )

    useEffect(() => {

    }, [])

    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles/>
                <div className='App'>
                    <Navigation setView={setView} ThemeToggler={ThemeToggler} theme={theme}/>
                    <Container fluid>
                        <Profile user={user}/>
                        <PredictionInput user={user} />
                        {/* {
                            !isLinked ? <Login /> :
                            view === "Dashboard" ? <Dashboard /> :
                            view === "Analyze" ? <Analyze />  :
                            view === "Other" && <Main />
                        } */}
                        {/* <Analyze/> */}
                        <Row>
                            <Col md={4}>{/* <SideMenu /> */}</Col>
                            <Col md={8}>{/* <Main/> */}</Col>
                        </Row>
                        {resetBtn}
                    </Container>
                </div>
        </ThemeProvider>
    );
}
export default Home