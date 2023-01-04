import { useCallback, useEffect, useState } from 'react';

const useAsync = (asyncFunction, immediate = true, thenFn?, catchFn?) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState(null);
  const [error, setError] = useState(null);
  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = useCallback(() => {
    setLoading(true);
    setValue(null);
    setError(null);
    return asyncFunction()
      .then((response) => {
        setValue(response);
        setLoading(false);
        thenFn && thenFn(response);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
        catchFn && catchFn(error);
      });
  }, [asyncFunction]);
  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);
  return { execute, loading, value, error };
};

export default useAsync;
