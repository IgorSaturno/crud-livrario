import * as Dialog from "@radix-ui/react-dialog";
import { Eye, File, Trash, X } from "phosphor-react";
import {
  Button,
  ContainerTriggerAndButton,
  DialogContent,
  DialogDescription,
  Table,
} from "./styles";
import { IconButton } from "../Dialgo/styles";

interface Book {
  id: string;
  name: string;
  pages?: number;
  authorName: string;

  resumBook?: string;
}

interface BookTableProps {
  books: Book[];

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
                      <Eye className="ph-eye" size={20} />
                    </Button>
                  </Dialog.Trigger>
                  <Button onClick={() => onDelete(book.id)}>
                    <Trash className="ph-trash" size={20} />
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
                    <Dialog.Close asChild>
                      <IconButton aria-label="Close">
                        <X className="ph-x" size={24} />
                      </IconButton>
                    </Dialog.Close>
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
