import React, { useState, useEffect } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';

import Navigation from "../components/Navigation"
import Profile from '../components/Profile';
import Prediction from '../components/Prediction';

const Home = ({user, setUser}) => {

    // component to display when nav item is clicked
    const [view, setView] = useState("Prediction")

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
        "Prediction": <Prediction user={user}/>,
        "Profile": <Profile user={user}/>,
        // "Other": <Main />,
    }

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
        <div className='App'>
            <Navigation setView={setView} view={view} />
            <Container >
                {views[view]}
                <Row>
                    <Col md={4}>{/* <SideMenu /> */}</Col>
                    <Col md={8}>{/* <Main/> */}</Col>
                </Row>
                {resetBtn}
            </Container>
        </div>
    );
}
export default Home