import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { URL } from '../utils/URL';
import { useEffect, useState } from 'react';

function Searched() {
  const { search } = useParams();

  const [result, setResult] = useState([]);

  const getQuery = async (search) => {
    const respone = await fetch(
      `${URL}/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&query=${search}`
    );

    const data = await respone.json();
    setResult(data.results);
  };

  useEffect(() => {
    getQuery(search);
  }, [search]);

  return (
    <Grid>
      {result.length > 0 ? (
        result.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={`/recipe/${item.id}`}>
                <img src={item.image} alt={item.title} />
                <h4>{item.title}</h4>
              </Link>
            </Card>
          );
        })
      ) : (
        <h4>Loading.......</h4>
      )}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  grid-gap: 3rem;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }

  a {
    text-decoration: none;
  }

  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Searched;
