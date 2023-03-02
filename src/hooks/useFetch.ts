import { useEffect, useState } from 'react';

export const useFetch = (url: string, options?: object) => {
  const [response, setResponse] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setLoading(false);
      } catch (err: any) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, [options, url]);

  return { response, error, loading };
};
