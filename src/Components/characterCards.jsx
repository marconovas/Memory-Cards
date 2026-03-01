import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function CharacterCards({ data, onGetScore }) {

    ///SORT SHUFFLE FUNCTION
    const shuffle = (arr) => (
        [...arr].sort(() => Math.random() - 0.5)
    )

    ///ROWS SELECTION   
    const [row1, setRow1] = useState(() => shuffle(data));
    const [row2, setRow2] = useState(() => shuffle(data));
    const [selectedRow1, setSelectedRow1] = useState(null);
    const [selectedRow2, setSelectedRow2] = useState(null);
    
    //SCORE TRACKER
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);

    
    const resetGame = () => { ///RESETS THE GAME
        setRow1(shuffle(data));
        setRow2(shuffle(data));
        setSelectedRow1(null);
        setSelectedRow2(null);
    }
    
    //SHUFFLE ON SELECTION
    const handleSelectedRow1 = (id) => {
        if (selectedRow2 !== null) {
            compareCards(id, selectedRow2);
        } else {
            setSelectedRow1(id);
        }
    };
    
    const handleSelectedRow2 = (id) => {
        if (selectedRow1 !== null) {
            compareCards(selectedRow1, id);
        } else {
            setSelectedRow2(id);
        }
    };
    
    //COMPARE CARDS
    const compareCards = (id1, id2) => {

        let newScore = score;
        let newHighScore = highScore;

        if (id1 === id2) {
            newScore = score + 1;
            newHighScore = newScore > highScore ? newScore : highScore;

            setScore(newScore);
            setHighScore(newHighScore);
        } else {
            newScore = 0;
            setScore(0);
        }

        onGetScore(newScore, newHighScore);
        resetGame();
    };

    return(
        <Container>
            <Row>
                {row1.map(character => (
                    <Col key={character.id}>
                        <Card onClick={() => handleSelectedRow1(character.id)}>
                            <Card.Img src={character.image}/>
                            <Card.Title>{character.name}</Card.Title>
                            <Card.Body>{character.status}</Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Row>
                {row2.map(character => (
                    <Col key={character.id}>
                        <Card onClick={() => handleSelectedRow2(character.id)}>
                            <Card.Img src={character.image}/>
                            <Card.Title>{character.name}</Card.Title>
                            <Card.Body>{character.status}</Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}