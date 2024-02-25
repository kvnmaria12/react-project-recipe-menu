import { useState, useEffect } from 'react';

export default function useLocalStorage(key, value) {
  const [state, setState] = useState(null);

  const localStorageValue = localStorage.getItem(key);

  useEffect(() => {
    if (localStorageValue) {
      setState(JSON.parse(localStorageValue));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, []);

  const update = (to) => {
    setState(to);
    localStorage.setItem(key, JSON.stringify(to));
  };

  const clear = () => {
    setState(null);
    localStorage.removeItem(key);
  };

  return [state, update, clear];
}
