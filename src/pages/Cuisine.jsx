import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import { URL } from '../utils/URL';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

function Cuisine() {
  const { id } = useParams();

  const [cuisine, setCuisine] = useState([]);

  const getCuisine = async (name) => {
    const respone = await fetch(
      `${URL}/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${name}`
    );

    const data = await respone.json();
    setCuisine(data.results);
  };

  useEffect(() => {
    getCuisine(id);
  }, [id]);

  return (
    <Grid
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {cuisine.map((item) => {
        return (
          <Card key={item.id}>
            <Link to={`/recipe/${item.id}`}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
            </Link>
          </Card>
        );
      })}
    </Grid>
  );
}

const Grid = styled(motion.div)`
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

export default Cuisine;
