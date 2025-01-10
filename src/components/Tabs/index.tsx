import { useAppContext } from "../../Api/Context/AppContext";
import { AuthorTable } from "../AuthorTable";
import { BookTable } from "../BookTable";
import { TabsContent, TabsRoot, TabsList, TabsTrigger } from "./styles";

export default function Tabs() {
  const { authors, books, deleteAuthor, deleteBook } = useAppContext();
  return (
    <TabsRoot defaultValue="authors">
      <TabsList aria-label="Tabelas de dados">
        <TabsTrigger value="authors">Autores</TabsTrigger>
        <TabsTrigger value="books">Livros</TabsTrigger>
      </TabsList>

      <TabsContent value="authors">
        <AuthorTable
          authors={authors}
          books={books}
          onEdit={(id) => alert(`Editar author com ID: ${id}`)}
          onDelete={deleteAuthor}
        />
      </TabsContent>

      <TabsContent value="books">
        <BookTable books={books} onDelete={deleteBook} />
      </TabsContent>
    </TabsRoot>
  );
}
