import { useState } from "react";
import axios from "../api/axios";
import { TableData } from "../interfaces";

export const useFetchData = (state: string) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async (query: string): Promise<TableData[]> => {
    try {
      const response = await axios.get(query);
      console.log(
        response.data //.filter((e: TableData) => e["state-province"] !== null)
      );

      return response?.data;
    } catch (error: any) {
      console.error(error);
      throw new Error(
        error?.message ||
          error?.data?.message ||
          "Error Fetching Data. Try Again."
      );
    } finally {
      setIsLoading(false);
    }
  };
  return {
    isLoading,
    fetchData,
  };
};
