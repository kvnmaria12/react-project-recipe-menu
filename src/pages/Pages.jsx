import Cuisine from './Cuisine';
import Home from './Home';
import Searched from './Searched';
import Error from './Error';
import Recipe from './Recipe';
import { Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

function Pages() {
  return (
    <AnimatePresence mode='wait'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:id' element={<Cuisine />} />
        <Route path='/search/:search' element={<Searched />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/*' element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
}

export default Pages;
