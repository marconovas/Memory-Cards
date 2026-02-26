import { useEffect, useState } from "react"
import CharacterCards from "./Components/characterCards";
import { Container } from "react-bootstrap";

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await fetch("https://rickandmortyapi.com/api/character");
        const result = await response.json();
        setData(result.results);
        console.log(result.results);
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
