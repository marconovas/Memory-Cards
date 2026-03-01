import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import ScoreBoard from "./Components/ScoreBoard";
import CharacterCards from "./Components/characterCards";

function App() {

  const MAX = 6;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  //SCORE DATA  
  const [scoreData, setScoreData] = useState(0);
  const [highScoreData, setHighScoredata] = useState(0);

  //GET SCORE FUNCTION
  const GetScore = (score, highscore) => {
    setScoreData(score);
    setHighScoredata(highscore);
  }

  //GET DATA FROM API
  useEffect(() => {
    const fetchData = async () => {
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
    fetchData();
  }, []);

  if (loading) return <p>Cargando...</p>

  return (
    <Container>
      <ScoreBoard score={scoreData} bestscore={highScoreData}/>
      {data && <CharacterCards data={data} onGetScore={GetScore}/>}
    </Container>
  )
}

export default App
