import { createContext, useState, ReactNode } from "react";

interface Author {
  id: string;
  name: string;
  email?: string;
}

interface Book {
  id: string;
  name: string;
  pages?: number;
  author_id: string;
}

interface AppContextType {
  authors: Author[];
  books: Book[];
  addAuthor: (author: Author) => void;
  addBook: (book: Book) => void;
  deleteAuthor: (id: string) => void;
  deleteBook: (id: string) => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [authors, setAuthors] = useState<Author[]>(() =>
    JSON.parse(localStorage.getItem("authors") || "[]")
  );

  const [books, setBooks] = useState<Book[]>(() =>
    JSON.parse(localStorage.getItem("books") || "[]")
  );

  const addAuthor = (author: Author) => {
    const updated = [...authors, author];
    setAuthors(updated);
    localStorage.setItem("authors", JSON.stringify(updated));
  };

  const addBook = (book: Book) => {
    const updated = [...books, book];
    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
  };

  const deleteAuthor = (id: string) => {
    const updated = authors.filter((author) => author.id !== id);
    setAuthors(updated);
    localStorage.setItem("authors", JSON.stringify(updated));
  };

  const deleteBook = (id: string) => {
    const updated = books.filter((book) => book.id !== id);
    setBooks(updated);
    localStorage.setItem("books", JSON.stringify(updated));
  };
  return (
    <AppContext.Provider
      value={{
        authors,
        books,
        addAuthor,
        addBook,
        deleteAuthor,
        deleteBook,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
