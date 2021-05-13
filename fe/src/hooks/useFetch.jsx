import { useState, useEffect } from 'react';

const delay = (data, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(data), time);
  });
};

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      await delay('', 300000);
      const res = await fetch(url);
      const json = await res.json();
      setResponse(json);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return { response, loading, error };
};
export default useFetch;
