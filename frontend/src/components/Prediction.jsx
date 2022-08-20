import React, {useState, useEffect} from 'react'
import { Alert, Col, Row, Container, Form } from 'react-bootstrap'
import fetchRequest from '../utils/request'

import BarChart from './vizualization/BarChart';
import AudioPlayer from './AudioPlayer';

const Prediction = ({user}) => {
    const [radio, setRadio] = useState("upload")
    const [file, setFile] = useState(null)
    const [results, setResults] = useState(null)
    const [max, setMax] = useState(null)
    const [alert, setAlert] = useState(null)

    useEffect(() => {
        if (file) {
            setResults(null)
            setMax(null)
            setAlert(null)

            const extension = ["jpg", "jpeg", "png"].includes(file.name.split(".").pop())
            if (!extension) {
                console.log("Image must be jpg or png format!")
            }
            else {
                const formData = new FormData();
                formData.append('file', file, file.name)
                fetchRequest('POST', '/predict', formData)
                .then(r => r.json())
                .then(data => {
                    console.log(data)
                    if (data.status_code == 204) {
                        setAlert(data.detail)
                    } else {
                        setResults(data)
                    }
                })
                .catch(err => {
                    console.error(err)
                })
            }
        }
    }, [file])

    useEffect(() => {
        // get the key, value and index of the max entry in results
        results && setMax(Object.entries(results).map(([k, v], idx) => [k, v, idx]).reduce((a, r) => a[1] > r[1] ? a : r))
    }, [results])


    const radios = {
        "upload": "Upload a file",
        "url": "From an URL",
        "webcam": "Use your webcam"
    }

    const radioForm = (
        <Form>
            <Form.Label>Choose input type</Form.Label>
            {Object.entries(radios).map(([key, value]) => {
                return <Form.Check
                    type="radio"
                    id={key}
                    label={value}
                    key={key}
                    value={value}
                    checked={radio === key}
                    onChange={() => setRadio(key)}
                />
            })}
        </Form>
    )

    const uploadComponent = (
        <>
            {radio === "upload" &&
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Label>Import your photo</Form.Label>
                    <Form.Control type="file" name="file" accept='.jpg, .jpeg, .png' onChange={e => setFile(e.target.files[0])}/>
                </Form.Group>}
            {/* {radio === "url" &&
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Import your photo</Form.Label>
                <Form.Control type="text" name="text" onSubmit={e => setUrl(e.target.files[0])}/>
            </Form.Group>} */}

        </>
    )

    const imageDisplayComponent = (
        <div id="img-container">
            <img src={file && URL.createObjectURL(file)} width="400"></img>
            {(alert || max) &&
                <Alert className="alert-component" variant={alert ? 'danger' : 'info'}>
                    {alert ?? `${max[0]} - Confidence : ${Math.round(max[1] * 100)}%`}
                </Alert>}
                {max && <AudioPlayer emotion={max[0]}/>}
        </div>
    )

    return (
        <Container>
            <Row>
                {radioForm}
            </Row>
            <Row>
                {radio === "upload" && uploadComponent}
            </Row>
            <Row>
                <Col md="6" style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                    {file && imageDisplayComponent}
                </Col>
                <Col>
                    <div style={{width: "600px"}}>
                        {results && <BarChart results={results} />}
                    </div>
                </Col>
            </Row>

        </Container>
    )
}

export default Prediction