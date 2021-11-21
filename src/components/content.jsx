import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Container, Form, Button } from 'react-bootstrap';
import Loading from './loading';

const Content = () => {

    const initialState = {
        err: '',
        isLoading: true,
    }

    const initialData = {
        data: [],
        totalResults: '',
    }

    let [state, setState] = useState(initialState)
    let [data, setData] = useState(initialData)
    let [key, setKey] = useState('')

    const fetching = (q) => {
        setState({ ...state, isLoading: true })

        fetch(`https://newsapi.org/v2/top-headlines?country=id&q=${q}&apiKey=97eded16c9be454d967dcce41964dcb8`)
            .then(res => {
                return res.json()
            })
            .then(res => {
                if (res.status === 'ok') {
                    setData({
                        ...data,
                        data: res.articles,
                        totalResults: res.totalResults,
                    })
                } else {
                    throw new Error(res.message);
                }
            })
            .catch(err =>
                setState({ ...state, err: err })
            )
            .finally(() => {
                setState({ ...state, isLoading: false })
            })
    }

    useEffect(()=>{
        fetching(key);
    }, [])

    const form = <div className='mx-5 text-center'>
            <Form className="d-flex"  style={{ margin: '20px -45px' }}>
                <Form.Control
                    onChange={(e)=>setKey(e.target.value)}
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={key}
                    className="me-2"
                    name="key"
                />
                <Button onClick={() => fetching(key)}>Search</Button>
            </Form>
            <Loading isLoading={state.isLoading} />
        </div>

    if (data.totalResults > 0 && !state.isLoading) {
        return (
            <Container >
                {form}
                <Row xs={1} sm={2} md={3} lg={4} className="g-4">
                    {data.totalResults > 0 && data.data.map((data,i) =>
                        <Col key={i}>
                            <a href={data.url} style={{ textDecoration: 'none', color: 'black' }}>
                                <Card style={{ width: '16rem' }}>
                                    <Card.Img variant="top" src={data.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{data.title}</Card.Title>
                                        <p className="card-text text-muted">{data.author} - {data.publishedAt.split("T")[0].split("-")[2]}/
                                            {data.publishedAt.split("T")[0].split("-")[1]}/
                                            {data.publishedAt.split("T")[0].split("-")[0]}</p>
                                        <p className="card-text">{data.description}</p>
                                    </Card.Body>
                                </Card>
                            </a>
                        </Col>
                    )}
                </Row>
            </Container>
        )
    }
    if (data.totalResults === 0) {
        return (
            <div className="mx-5 text-center">
                {form}
                <p>search not found</p>
                <Button onClick={() => {setKey('', fetching(''))}}>back</Button>
            </div>
        )
    } else {
        return <div className="mx-5">
            {form}
            <p>{state.err.message}</p>
        </div>
    }

}

export default Content;