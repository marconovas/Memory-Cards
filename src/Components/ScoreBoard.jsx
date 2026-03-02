import { Col, Container, Row } from "react-bootstrap";
import "./ScoreBoard.css"

export default function ScoreBoard({ score, bestscore }) {
    return (
        <div className="d-flex justify-content-center m-2">
            <div className="score-panel d-flex justify-content-between align-items-center">

                <div className="text-center">
                    <div className="score-label">Score</div>
                    <div className="score-value">{score}</div>
                </div>

                <div className="divider"></div>

                <div className="text-center">
                    <div className="score-label">Best</div>
                    <div className="score-value">{bestscore}</div>
                </div>

            </div>
        </div>
    );
}