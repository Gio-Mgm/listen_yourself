import React, { useState, useEffect }from 'react'
import { Button, Table, Card, Accordion } from 'react-bootstrap'

import fetchRequest from '../utils/request'

const Profile = ({user}) => {
    const [predictions, setPredictions] = useState(null)

    useEffect(() => {
        fetchRequest('GET', '/predictions?user_id=' + user.user_id)
        .then(res => res.json())
        .then(data => setPredictions(data))

        return () => setPredictions(null)
    }, [])

    const predictionItem = prediction => {
        const img_src = `data:image/jpeg;base64,${prediction.prediction_img}`
        const max_probability = Math.max(...prediction.predictions.split(' ').map(p => parseFloat(p)))
        const title = `Predicted emotion : ${prediction.prediction_major}`
        const text = (
            <ul>
                <li>{`Confidence : ${max_probability} %`}</li>
                <li>{`Real emotion : ${prediction.prediction_true}`}</li>
            </ul>
        )
        return (
            <div key={prediction.prediction_id} style={{display: 'flex'}}>
                <img
                src={img_src}
                width='138'

                />
                <Card style={{ width: '24rem' }}>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text as="div">
                            {text}
                        </Card.Text>
                    </Card.Body>
                    {/* <ListGroup className="list-group-flush">
                        <ListGroup.Item>Cras justo odio</ListGroup.Item>
                        <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                        <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body> */}
                </Card>
            </div>

        )
    }
    // const PredictionTable = predictions => {
    //     const preds = predictions
    //     return (
    //         <Table striped bordered hover size="sm">
    //             <thead>
    //                 <tr>
    //                     {Object.keys(preds[0]).map(key =>{
    //                         return <td key={`head_${key}`}>{key}</td>
    //                     })}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                     {Object.entries(preds).map(([key, value], idx) =>{
    //                         return (<tr key={`${key}_${idx}`}>
    //                             {Object.values(value).map(v => {
    //                                 console.log(v)
    //                                 return <td key={`${key}_${idx}_${value}`}>{v}</td>
    //                             })}
    //                         </tr>)
    //                     })}
    //             </tbody>
    //         </Table>
    //     )
    // }

    return (
        <>
            <h1 className='display-1'>Profile</h1>
            {Object.entries(user).map(([key, value]) => {
                return (key != "user_id" && key != "user_is_admin") && <p key={key}><strong>{key.replace("user_", "").replace('_', ' ')}</strong> : {value}</p>
            })}
            <Accordion defaultActiveKey="0" className="predictions">
                {predictions && predictions.map((prediction) => {
                    return predictionItem(prediction)
                })}
            </Accordion>
        </>
    )
}

export default Profile