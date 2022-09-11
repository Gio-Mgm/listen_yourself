import React, {useState, useEffect, useRef} from 'react'
import { Alert, Col, Row, Container, Form, Button, InputGroup } from 'react-bootstrap'
import fetchRequest from '../utils/request'

import BarChart from './vizualization/BarChart';
import AudioPlayer from './AudioPlayer';

const Prediction = ({user}) => {
    const [radio, setRadio] = useState("upload")
    const [file, setFile] = useState(null)
    const [results, setResults] = useState(null)
    const [max, setMax] = useState(null)
    const [alert, setAlert] = useState(null)
    const [added, setAdded] = useState(null)
    const [truePred, setTruePred] = useState(null)
    const [img64, setimg64] = useState(null)

    useEffect(() => {
        if (file) {
            setResults(null)
            setMax(null)
            setAlert(null)
            setAdded(null)

            const extension = ["jpg", "jpeg", "png"].includes(file.name.split(".").pop())
            if (!extension) {
                console.log("Image must be jpg or png format!")
            }
            else {
                const formData = new FormData();
                formData.append('file', file, file.name)
                fetchRequest('POST', '/predict', formData)
                .then(r => {
                    if (r.status === 200) {
                        return r.json();
                    } else if (r.status === 204) {
                        setAlert("No face detected !")
                        throw new Error(r.statusText)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
                .then(data => setResults(data))
            }
        }
    }, [file])

    useEffect(() => {
        // get the key, value and index of the max entry in results
        results && setMax(Object.entries(results[0]).map(([k, v], idx) => [k, v, idx]).reduce((a, r) => a[1] > r[1] ? a : r))
    }, [results])

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            user_id: user.user_id,
            prediction_img: results[1],
            predictions: Object.values(results[0]).map(x => Math.round(x * 100) / 100).join(' '),
            prediction_true: truePred ?? max[0],
            prediction_major: max[0]
        }
        const headers = {
            "Content-Type": "application/json"
        }

        console.log(JSON.stringify(data))
        fetchRequest('POST', '/prediction/', JSON.stringify(data), headers)
        .then(res => {
            if (res.status >= 200 && res.status <= 299) {
                return res.json()
            } else {
                throw new Error(res.statusText)
            }
        })
        .then(_ => setAdded("Thanks for your feedback"))
    }

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

    const AlertCustom = ({msg, variant}) => {
        return (
        <Alert className="alert-component" variant={variant}>
            {msg}
        </Alert>
        )
    }

    const imageDisplayComponent = (
        <div id="img-container">
            <img src={file && URL.createObjectURL(file)} style={{width:"400px"}}></img>
            {(alert || max) && <AlertCustom
                msg={alert ?? `${max[0]} - Confidence : ${Math.round(max[1] * 100)}%`}
                variant={alert ? 'danger' : 'info'}/>}
                {max && <AudioPlayer emotion={max[0]}/>}
        </div>
    )

    const SubmitPrediction = () => {
        return (
            <div id="predict-submit">
                <Form>
                <Form.Group>
                    <Form.Label>
                        Please confirm our prediction or change it below
                    </Form.Label>
                    <InputGroup>
                    <Form.Control as="select" onChange={e => setTruePred(e.target.value)}>
                        <option></option>
                        {Object.keys(results[0]).map(key => {
                            return (
                                <option value={key}
                                        key={key}
                                        defaultValue={key == max[0]}>
                                    {key}
                                </option>
                            )
                        })}
                    </Form.Control>
                    <Button variant="primary" type="submit" onClick={e => handleSubmit(e)}>Submit</Button>
                    </InputGroup>
                </Form.Group>
                </Form>
            </div>
        )
    }

    return (
        <Container>
            {results && console.log(results)}
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
                    <div style={{width: "600px", marginTop: "60px"}}>
                        {results && <BarChart results={results[0]} />}
                        {added && <AlertCustom msg={added} variant="info"/> || max && <SubmitPrediction />}
                    </div>
                </Col>
                {results && <img src={`data:image/jpeg;base64,${results[1]}`} style={{width:"150px"}} />}
            </Row>

        </Container>
    )
}

export default Prediction