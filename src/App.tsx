import { useEffect } from "react";
import { useFetchData } from "./hooks/useFetchData";

const QUERY = "search?country=Australia";

export const App = () => {
  const { fetchData, isLoading } = useFetchData("table");

  useEffect(() => {
    fetchData(QUERY);
  }, [fetchData]);

  return <div>{`${isLoading}`}</div>;
};
