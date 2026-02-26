import { Card, Col, Container, Row } from "react-bootstrap";

export default function CharacterCards ({ data }) {
    const characters = data.slice(0,4);

    return(
        <Container>
            <Row>
                {characters.map(character => (
                    <Col key={character.id}>
                        <Card style={{ width: '18rem' }}>
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