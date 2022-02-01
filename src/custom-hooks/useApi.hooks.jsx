import { useState, useEffect, useCallback } from "react";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const sendRequest = useCallback(async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: JSON.stringify(requestConfig.body)
          ? JSON.stringify(requestConfig.body)
          : null,
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Request Denied!");
      }
      applyData(data);
    } catch (error) {
      setError(error.message || "Something went Wrong!");
    }
    setIsLoading(false);
  }, []);
  return { error, isLoading, sendRequest };
};
export default useApi;
