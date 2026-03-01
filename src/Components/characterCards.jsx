import { useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function CharacterCards({ data }) {

    ///SORT SHUFFLE FUNCTION
    const shuffle = (arr) => (
        [...arr].sort(() => Math.random() - 0.5)
    )

    ///ROWS SELECTION   
    const [row1, setRow1] = useState(() => shuffle(data));
    const [row2, setRow2] = useState(() => shuffle(data));
    const [selectedRow1, setSelectedRow1] = useState(null);
    const [selectedRow2, setSelectedRow2] = useState(null);
    
    const resetGame = () => { ///RESETS THE GAME
        setRow1(shuffle(data));
        setRow2(shuffle(data));
        setSelectedRow1(null);
        setSelectedRow2(null);
    }
    
    const handleSelectedRow1 = (id) => {
        setSelectedRow1(id);

        if(selectedRow2 !== null){
            resetGame();
        }
    }

    const handleSelectedRow2 = (id) => {
        setSelectedRow2(id);

        if(selectedRow1 !== null){
            resetGame();
        }
    }

    return(
        <Container>
            <Row>
                {row1.map(character => (
                    <Col>
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
                    <Col>
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