import React, {useState, useEffect} from 'react'
import { Form } from 'react-bootstrap'
import fetchRequest from '../utils/request'

export const PredictionInput = ({user}) => {
    const [radio, setRadio] = useState("upload")
    const [file, setFile] = useState("")

    useEffect(() => {
        console.log("useEffect")
        if (file) {
            const extension = ["jpg", "jpeg", "png"].includes(file.name.split(".").pop())
            if (!extension) {
                console.log("Image must be jpg or png format!")
            }
            else {
                // const headers =  {'content-type': 'undefined'}
                const formData = new FormData();
                formData.append('file', file, file.name)
                fetchRequest('POST', '/predict', formData)
                .then(r => r.json())
                .then(data => console.log(data))
            }
        //     const url = "http://localhost:8000/predict"
        //     const init = {
        //         crossDomain: true,
        //         method:'POST',
        //         mode: "cors",
        //         body: formData
        //     }
        //     fetch(url, init)
        //     .then(r => r.json())
        //     .then(data => console.log(data))
        }
    }, [file])


    const radios = {
        "upload": "Upload a file",
        "webcam": "Use your webcam"
    }

    const radioForm = (
        <Form>
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
            <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Default file input example</Form.Label>
                <Form.Control type="file" name="file" accept='.jpg, .jpeg, .png' onChange={e => setFile(e.target.files[0])}/>
            </Form.Group>
            {file && <img src={URL.createObjectURL(file)} width="300"></img>}
        </>
    )

    return (
        <div>
            <h2>Choose input type</h2>
            {radioForm}
            {radio === "upload" && uploadComponent}
        </div>
    )
}
