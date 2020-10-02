import React, { Component } from 'react';
import MemeGenerator from "./MemeGen";
import {
    Card, CardImg, Button, Col, Container, Row, CardDeck
} from 'reactstrap';

class MemeCatalog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memeData: [],
            isdataReceived: false,
            isButtonPressed: false,
            url: '',
        }
    }

    rediectToEditMeme = (param) => {
        console.log(this.state)
        this.setState({
            isButtonPressed: true,
            url: param
        });
    }

    patientList = () => {
        if (this.state.memeData && this.state.isdataReceived) {
            return this.state.memeData.map(person => {
                return (
                    <Col sm="4">
                        <CardDeck>
                            <Card color="primary">
                                <CardImg top width="50%" src={person.url} onClick={this.rediectToEditMeme} />
                                <Button color="danger" value={person.url} onClick={e => this.rediectToEditMeme(e.target.value)}>Edit Meme</Button>
                            </Card>
                        </CardDeck>
                        <br></br>
                    </Col>
                );
            });
        }
        else {
            return (
                <div style={this.divStyle}>
                    <p>Loading...............</p>
                </div>
            )
        }
    };
    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(response.data.memes);
                this.setState({
                    memeData: response.data.memes,
                    isdataReceived: true
                })

            })
    }


    renderResult = () => {
        const res = Object.values(this.state.memeData);
        return res.map(item =>
            <div>{item.id}</div>
        );
    };

    render() {
        return (
            <div>
                {(() => {
                    if (!this.state.isButtonPressed) {
                        return (
                            <div >

                                <Container fluid>
                                    <Row>

                                        {this.patientList()}
                                    </Row>
                                </Container>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div>
                                <MemeGenerator imgSrc={this.state.url} />
                            </div>
                        )
                    }
                })()}
            </div>
        );
    }
    divStyle = {
        margin: '40px',
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'blue',
        fontSize: '35px'
    };
    cardStyle = {
        margin: '40px',
        border: '5px solid black'
    };
}

export default MemeCatalog;