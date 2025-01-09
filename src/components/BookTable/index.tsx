import * as Dialog from "@radix-ui/react-dialog";
import { Eye, Trash } from "phosphor-react";
import {
  Button,
  ContainerTriggerAndButton,
  DialogContent,
  Table,
} from "./styles";

interface Book {
  id: string;
  name: string;
  pages?: number;
  authorName: string;
  // resumBook: string;
}

interface BookTableProps {
  books: Book[];
  // onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function BookTable({ books, onDelete }: BookTableProps) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Nome</th>

          {/* <th>Resumo</th> */}
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <Dialog.Root>
              <td>{book.name}</td>

              {/* <td>{book.resumBook}</td> */}

              <td>
                <ContainerTriggerAndButton>
                  <Dialog.Trigger asChild>
                    <Button>
                      <Eye size={20} />
                    </Button>
                  </Dialog.Trigger>
                  <Button onClick={() => onDelete(book.id)}>
                    <Trash size={20} />
                  </Button>
                </ContainerTriggerAndButton>
              </td>

              <Dialog.Portal>
                <Dialog.Overlay
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                />
                <DialogContent aria-labelledby="dialog-book-table-title">
                  <Dialog.Title id="dialog-book-table-title">
                    {book.name}
                  </Dialog.Title>
                  <p>
                    <strong>Autor:</strong> {book.authorName}
                  </p>
                  <p>
                    <strong>Páginas:</strong> {book.pages || "Não informado"}
                  </p>
                  <Dialog.Close asChild>
                    <button
                      style={{
                        marginTop: "20px",
                        padding: "10px",
                        background: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      Fechar
                    </button>
                  </Dialog.Close>
                </DialogContent>
              </Dialog.Portal>
            </Dialog.Root>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
