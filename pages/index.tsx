import type { NextPage, GetStaticProps, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import Head from "next/head";
import { useState } from "react";
import { Container } from "@chakra-ui/react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import CoverCard, { BookProps } from "../components/bookCover/CoverCard";
import { getSearchedBooks, bookHandler } from "../utils/searchHandlers";
// todos: TESTS, carousel
const Book: NextPage = ({ fetchedBook }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [bookObj, setBook] = useState({
    book: fetchedBook,
    searchInput: "",
    searchBookList: [],
  });
  // Search bookObj by searchedInput
  const getSearchHandler = ( e: { target: { value: string | undefined } } ) => {
    getSearchedBooks({ e, axios, bookObj, setBook })
  };
  // change dropdown book onClick
  const getBookHandler = ( id: string ) => {
    bookHandler({ id, bookObj, setBook })
  };

  const { book, searchInput, searchBookList } = bookObj;
  return (
    <Container align="center" w={600}>
      <Head>
        <title>Search For Books</title>
        <meta name="Google Book Search" content="Generated by next" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SearchBar
        value={ searchInput }
        data={ searchBookList }
        changeHandler={ getSearchHandler }
        clickHandler={ getBookHandler }
      />
      <CoverCard 
        data={ book } 
        aria-label={ "div containing book information" } 
      />
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ( context: GetStaticPropsContext ) => {
  const res = await axios.get("https://www.googleapis.com/books/v1/volumes/iCWgDwAAQBAJ");
  const fetchedBook: BookProps = await res.data;
  return {
    props: {
      fetchedBook, 
      revalidate: 60 * 60 * 6,
    },
  };
};

export default Book;