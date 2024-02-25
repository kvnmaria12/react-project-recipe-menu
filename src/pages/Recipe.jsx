import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { URL } from '../utils/URL';
import { consola, createConsola } from 'consola';

function Recipe() {
  const { id } = useParams();

  const [ingredients, setIngredients] = useState([]);

  const [activeTab, setActiveTab] = useState('instructions');

  consola.info(activeTab);

  const getRecipe = async (id) => {
    const response = await fetch(`
        ${URL}/${id}/information?apiKey=${import.meta.env.VITE_API_KEY}`);

    const data = await response.json();
    console.log(data);
    setIngredients(data);
  };

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  return (
    <DetailsWrapper>
      <div>
        <h2>{ingredients.title}</h2>
        <img src={ingredients.image} alt={ingredients.title} />
      </div>
      <Info>
        <Button
          className={activeTab == 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}
        >
          Instructions
        </Button>
        <Button
          className={activeTab == 'ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('ingredients')}
        >
          Ingredients
        </Button>
        <div>
          {activeTab == 'instructions' && (
            <h4 dangerouslySetInnerHTML={{ __html: ingredients.summary }}></h4>
          )}
          {activeTab == 'ingredients' && (
            <h4
              dangerouslySetInnerHTML={{ __html: ingredients.instructions }}
            ></h4>
          )}
        </div>
      </Info>
    </DetailsWrapper>
  );
}

const DetailsWrapper = styled.div`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
  }

  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul {
    margin-top: 2rem;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
`;

const Info = styled.div`
  margin-left: 4rem;

  h4 {
    margin-top: 2rem;
    line-height: 1.7;
  }
`;

export default Recipe;
