import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function CharacterCards ({ data }) {

    const [row1, setRow1] = useState([]);
    const [row2, setRow2] = useState([]);

    const [selectedRow1, setSelectedRow1] = useState(null);    
    const [selectedRow2, setSelectedRow2] = useState(null);

    ///SORT ELEMENTS IN ROWS
    useEffect(() => { 
        const sortData = () => {
            const sortedRow1 = [...data].sort(() => Math.random() - 0.5);
            const sortedRow2 = [...data].sort(() => Math.random() - 0.5);
            setRow1(sortedRow1);
            setRow2(sortedRow2);
        }
        sortData();
    }, [data]);
    
    const handleSelectedRow1 = (id) => {
        setSelectedRow1(id);
    }

    const handleSelectedRow2 = (id) => {
        setSelectedRow2(id);
    }

    return(
        <Container>
            <Row className="mt-4" >
                {row1.map(character => (
                    <Col md={2} key={character.id}>
                        <Card 
                            className={`w-100 ${selectedRow1 === character.id ? "border border-primary" : ""}`} 
                            onClick={() => handleSelectedRow1(character.id)}>
                            <Card.Img variant="top" src={character.image}/>
                            <Card.Body>
                                <Card.Title>{character.name}</Card.Title>
                                <Card.Text>{character.status}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row className="mt-4">
                {row2.map(character => (
                    <Col md={2} key={character.id}>
                        <Card className={`w-100 ${selectedRow2 === character.id? "border border-primary" : ""}`} 
                            onClick={() => handleSelectedRow2(character.id)}>
                            <Card.Img variant="top" src={character.image}/>
                            <Card.Body>
                                <Card.Title>{character.name}</Card.Title>
                                <Card.Text>{character.status}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}