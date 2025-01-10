import { createContext, ReactNode, useContext, useState } from "react";
import { Author, Book, DeleteAuthor, DeleteBook } from "../../@types/styled";

interface AppContextProps {
  authors: Author[];
  books: Book[];
  deleteAuthor: DeleteAuthor;
  deleteBook: DeleteBook;
  addAuthor: (author: Author) => void;
  addBook: (book: Book) => void;
}

export const AppContext = createContext<AppContextProps | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [authors, setAuthors] = useState<Author[]>(() =>
    JSON.parse(localStorage.getItem("authors") || "[]")
  );

  const [books, setBooks] = useState<Book[]>(() =>
    JSON.parse(localStorage.getItem("books") || "[]")
  );

  const addAuthor = (author: Author) => {
    const updatedAuthors = [...authors, author];
    setAuthors(updatedAuthors);
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));
  };

  const addBook = (book: Book) => {
    const updatedBooks = [...books, book];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const deleteAuthor: DeleteAuthor = (authorId) => {
    const updatedAuthors = authors.filter((author) => author.id !== authorId);
    setAuthors(updatedAuthors);
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));

    const updatedBooks = books.filter((book) => book.author_id !== authorId);
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  const deleteBook = (id: string) => {
    const updated = books.filter((book) => book.id !== id);
    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
  };

  return (
    <AppContext.Provider
      value={{ authors, books, addAuthor, addBook, deleteAuthor, deleteBook }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
