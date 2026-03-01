import { Col, Container, Row } from "react-bootstrap";


export default function ScoreBoard ({ score, bestscore }) {
    return(
        <Container>
            <Row>
                <Col>
                    <p>Score: {score}</p>
                    <p>Best Score: {bestscore}</p>
                </Col>
            </Row>
        </Container>
    )
}