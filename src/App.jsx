import { useEffect, useState } from "react";
import { Button, Container, Modal } from "react-bootstrap";
import ScoreBoard from "./Components/ScoreBoard";
import CharacterCards from "./Components/characterCards";
import Header from "./Components/Header";
import "./App.css";

function App() {

  const MAX = 6; ///Cards per Row

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  //SCORE DATA  
  const [scoreData, setScoreData] = useState(0);
  const [highScoreData, setHighScoredata] = useState(0);
  const [showModal, setShowModal] = useState(false);

  //GET SCORE FUNCTION
  const GetScore = (score, highscore) => {
    setScoreData(score);
    setHighScoredata(highscore);
  }

  // FINISH GAME
  useEffect(() => {
    if(highScoreData >= MAX)  //get to highscore -> finish game
      setShowModal(true);
  }, [highScoreData])

  //GET DATA FROM API
  const fetchData = async () => {
      setLoading(true);
      try{
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const result = await response.json();
  
        ///SORT DATA
        const sortedResults = result.results.sort(() => {
          return  Math.random() - 0.5;
        })
        const results = sortedResults.slice(0, MAX);  ///slice array
  
        ///STORE DATA
        setData(results);
        console.log(results);
  
      } catch (error) {
  
        console.error("Error: ", error);
      
      } finally {
        
        setLoading(false);
      
      }
    };

  //CALL API (FIRST TIME)
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>

  return (
    <div className="app-wrapper">

      <Container fluid>
        <div>
          <Header />
          <ScoreBoard score={scoreData} bestscore={highScoreData}/>
        </div>


        {data && <CharacterCards
          key={data?.[0]?.id}  //reset character cards
          data={data}
          onGetScore={GetScore}
        />}

        <div className="d-flex justify-content-center align-content-center w-100">
          <Button onClick={() => {
            setScoreData(0);
            setHighScoredata(0);
            fetchData();
          }} variant="success">
            Reset Game
          </Button>
        </div>

        <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>🎉 All dimensions aligned!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Final score: {scoreData}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() =>{ 
                setShowModal(false);
                setScoreData(0);
                setHighScoredata(0);
                fetchData();
                }}
              >Play Again</Button>
            </Modal.Footer>
        </Modal>
      </Container>
    </div>
  )
}

export default App
