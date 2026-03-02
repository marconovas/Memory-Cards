import { useState } from "react";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import "./CharacterCards.css";

export default function CharacterCards({ data, onGetScore }) {

    ///SORT SHUFFLE FUNCTION
    const shuffle = (arr) => (
        [...arr].sort(() => Math.random() - 0.5)
    )

    ///ROWS  
    const [row1, setRow1] = useState(() => shuffle(data));
    const [row2, setRow2] = useState(() => shuffle(data));
    const [selectedRow1, setSelectedRow1] = useState(null);
    const [selectedRow2, setSelectedRow2] = useState(null);
    
    //SCORE TRACKER
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [message, setMessage] = useState("");

    //SAVE PAIRS
    const [matchedIDs, setMatchedIds] = useState([]);
    
    //ROW SELECTION
    const handleSelectedRow1 = (id) => {
        if (selectedRow2 !== null) {
            compareCards(selectedRow2, id);
        } else {
            setSelectedRow1(id);
        }

        if(matchedIDs.includes(id)){
            setScore(0);
            onGetScore(0, highScore);

            setSelectedRow1(null);
            setSelectedRow2(null);

            setMatchedIds([]);
            setMessage("Ya habias elegido esa carta");
        }

        setRow1(shuffle(row1));
        setRow2(shuffle(row2));
    };
    
    const handleSelectedRow2 = (id) => {
        if (selectedRow1 !== null) {
            compareCards(selectedRow1, id);
        } else {
            setSelectedRow2(id); //no lo tendria que seleccionar si es la segunda vez que lo elige
        }

        if(matchedIDs.includes(id)){
            setScore(0);
            onGetScore(0, highScore);
        
            setSelectedRow1(null);
            setSelectedRow2(null);

            setMatchedIds([]);
            setMessage("Ya habias elegido esa carta");
        }

        setRow1(shuffle(row1));
        setRow2(shuffle(row2));
    };
    
    //COMPARE CARDS
    const compareCards = (id1, id2) => {

        let newScore = score;
        let newHighScore = highScore;

        if (id1 === id2) {

            if(matchedIDs.includes(id1)){
                setScore(0);
                onGetScore(0, highScore);

                setSelectedRow1(null);
                setSelectedRow2(null);

                return;
            };


            newScore = score + 1;
            newHighScore = newScore > highScore ? newScore : highScore;

            setScore(newScore);
            setHighScore(newHighScore);

            //save found match
            setMatchedIds(prev => [...prev, id1]);
        } else {
            newScore = 0;
            setScore(0);
        }

        onGetScore(newScore, newHighScore);

        setSelectedRow1(null);
        setSelectedRow2(null);

        setRow1(prev => shuffle(prev));
        setRow2(prev => shuffle(prev));
    };

    return(
        <Container>
            <Row className="justify-content-center">
                {row1.map(character => (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4" key={character.id}>
                        <Card
                            className={`memory-card ${matchedIDs.includes(character.id) ? "matched" : ""}`}
                        onClick={() =>
                            handleSelectedRow1(character.id)
                        }>
                            <Card.Img variant="top" src={character.image} />
                            <Card.Body className=" small text-center">
                                <Card.Title className="fs-6 fw-bold">
                                    {character.name}
                                </Card.Title>
                                <Card.Text className="small">
                                    {character.status}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row className="justify-content-center">
                {row2.map(character => (
                    <Col xs={12} sm={6} md={4} lg={3} xl={2} className="mb-4" key={character.id}>
                        <Card
                            className={`memory-card ${matchedIDs.includes(character.id) ? "matched" : ""}`}
                            onClick={() =>{
                                handleSelectedRow2(character.id)}
                            }
                        >
                            <Card.Img variant="top" src={character.image} />
                            <Card.Body className=" small text-center">
                                <Card.Title className="fs-6 fw-bold">
                                    {character.name}
                                </Card.Title>
                                <Card.Text className=" small">
                                    {character.status}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {(message) && (
                <Alert variant="warning">
                    <div className="d-flex justify-content-between align-content-center">
                        <p>
                            {message}
                        </p>
                        <Button onClick={() => setMessage("")} variant="outline-warning">Cerrar</Button>
                    </div>
                </Alert>
            )}
        </Container>
    )
}