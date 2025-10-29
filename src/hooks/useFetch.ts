import { useEffect, useState, useCallback } from "react";

interface FetchOptions extends RequestInit {
  
}

export function useFetch<T>(url: string, options?: FetchOptions) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();

    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
      const json: T = await res.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        console.log("Fetch aborted");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort(); 
  }, [url, options]);

  useEffect(() => {
    const controller = new AbortController();

    const execute = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, { ...options, signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
        const json: T = await res.json();
        setData(json);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") {
          console.log("Fetch aborted");
        } else if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Unknown error");
        }
      } finally {
        setLoading(false);
      }
    };

    execute();

    return () => controller.abort(); 
  }, [url, options]);

  return { data, loading, error, refetch: fetchData };
}
