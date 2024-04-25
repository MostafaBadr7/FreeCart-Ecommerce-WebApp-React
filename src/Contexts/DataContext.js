import axios from "axios";
import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useInfiniteQuery } from "react-query";

export let DataContext = createContext();

export default function DataContextProvider(props) {
  async function getProducts({ pageParam }) {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?page=${pageParam}`
    );
    return data;
  }

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["projects"],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      console.log(lastPage.metadata);
      console.log(pages);
      if (lastPage.metadata.numberOfPages !== lastPage.metadata.currentPage) {
        return lastPage.metadata.nextPage;
      }
    },
  });

  return (
    <>
      <DataContext.Provider value={{ data, fetchNextPage }}>
        {props.children}
      </DataContext.Provider>
    </>
  );
}
