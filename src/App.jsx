import { useEffect, useState } from "react"
import CharacterCards from "./Components/characterCards";
import { Container } from "react-bootstrap";

function App() {

  const MAX = 4;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {data && <CharacterCards data={data}/>}
    </Container>
  )
}

export default App
