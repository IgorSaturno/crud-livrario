import * as Dialog from "@radix-ui/react-dialog";
import { Eye, File, Trash } from "phosphor-react";
import {
  Button,
  ContainerTriggerAndButton,
  DialogContent,
  DialogDescription,
  Table,
} from "./styles";

interface Book {
  id: string;
  name: string;
  pages?: number;
  authorName: string;
  cover?: string;
  resumBook?: string;
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
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <Dialog.Root>
              <td>{book.name}</td>

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

                  <DialogDescription>{book.authorName}</DialogDescription>

                  {book.resumBook && (
                    <p style={{ marginTop: "20px", whiteSpace: "pre-wrap" }}>
                      {book.resumBook}
                    </p>
                  )}

                  <p
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "end",
                      marginTop: "20px",
                    }}
                  >
                    <File size={20} />{" "}
                    {book.pages ? `${book.pages} páginas` : "Não informado"}
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
