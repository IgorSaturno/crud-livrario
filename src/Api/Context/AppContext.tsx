import { createContext, ReactNode, useContext, useState } from "react";
import { Author, Book, DeleteAuthor, DeleteBook } from "../../@types/styled";

interface AppContextProps {
  authors: Author[];
  books: Book[];
  deleteAuthor: DeleteAuthor;
  deleteBook: DeleteBook;
  addAuthor: (author: Author) => void;
  addBook: (book: Book) => void;
  submitAuthor: (data: Author) => void;
  submitBook: (data: Omit<Book, "id" | "authorName">) => void;
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
    const isDuplicate = authors.some(
      (existingAuthor) =>
        existingAuthor.name.toLowerCase() === author.name.toLowerCase()
    );
    if (isDuplicate) {
      alert("Autor já cadastrado.");
      return;
    }
    const updatedAuthors = [...authors, author];
    setAuthors(updatedAuthors);
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));
  };

  const addBook = (book: Book) => {
    const isDuplicate = books.some(
      (existingBook) =>
        existingBook.name.toLowerCase() === book.name.toLowerCase()
    );
    if (isDuplicate) {
      alert("Livro já cadastrado.");
      return;
    }
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

  const submitAuthor = (data: Author) => {
    const isDuplicate = authors.some(
      (author) => author.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isDuplicate) {
      alert("Autor já cadastrado.");
      return;
    }

    const newAuthor: Author = { id: Date.now().toString(), name: data.name };
    const updatedAuthors = [...authors, newAuthor];
    setAuthors(updatedAuthors);
    localStorage.setItem("authors", JSON.stringify(updatedAuthors));
    alert("Autor cadastrado com sucesso!");
  };

  const submitBook = (data: Omit<Book, "id" | "authorName">) => {
    const isDuplicate = books.some(
      (book) => book.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isDuplicate) {
      alert("Livro já cadastrado.");
      return;
    }

    // Obter o autor selecionado
    const selectedAuthor = authors.find(
      (author) => author.id === data.author_id
    );

    // Criação do novo livro, garantindo que `id` seja único e não sobrescreva
    const newBook: Book = {
      id: Date.now().toString(),
      name: data.name,
      author_id: data.author_id,
      authorName: selectedAuthor?.name || "Autor desconhecido",
    };

    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
    alert("Livro cadastrado com sucesso!");
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
        submitAuthor,
        submitBook,
      }}
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
