import * as Dialog from "@radix-ui/react-dialog";
import { Eye, Trash, X } from "phosphor-react";
import {
  ButtonAuthorTable,
  ContainerButtonAuthorTable,
  Table,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "./styles";
import { IconButton } from "../Dialgo/styles";

interface Author {
  id: string;
  name: string;
  email?: string;
  bio?: string;
}

interface Book {
  id: string;
  name: string;
  pages?: number;
  author_id: string;
}

interface AuthorTableProps {
  authors: Author[];
  books: Book[];

  onDelete: (id: string) => void;
}

export function AuthorTable({ authors, books, onDelete }: AuthorTableProps) {
  const columns = [
    { header: "Nome", accessor: "name" },
    { header: "E-mail", accessor: "email" },
    { header: "Ações", accessor: "actions" },
  ];

  return (
    <>
      <Table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.header}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => {
            const associatedBooks = books.filter(
              (book) => book.author_id === author.id
            );

            return (
              <tr key={author.id}>
                <Dialog.Root>
                  <td>{author.name}</td>
                  <td style={{ width: "20px" }}>{author.email}</td>
                  <td>
                    <ContainerButtonAuthorTable>
                      <Dialog.Trigger asChild>
                        <ButtonAuthorTable>
                          <Eye className="ph-eye" size={20} />
                        </ButtonAuthorTable>
                      </Dialog.Trigger>
                      <ButtonAuthorTable onClick={() => onDelete(author.id)}>
                        <Trash className="ph-trash" size={20} />
                      </ButtonAuthorTable>
                    </ContainerButtonAuthorTable>
                  </td>
                  <Dialog.Portal>
                    <Dialog.Overlay
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                    />
                    <DialogContent aria-describedby="dialog-author-table-title">
                      <DialogTitle id="dialog-author-table-title">
                        {author.name}
                      </DialogTitle>
                      <DialogDescription>
                        {author.bio || "Não informado"}
                      </DialogDescription>
                      <p style={{ marginBottom: "20px", fontSize: "15px" }}>
                        {author.email || "Não informado"}
                      </p>
                      <p style={{ marginBottom: "10px" }}>
                        <strong>Livros associados:</strong>
                      </p>
                      {associatedBooks.length > 0 ? (
                        <ul style={{ listStyle: "none" }}>
                          {associatedBooks.map(({ id, name }) => (
                            <li
                              style={{ marginBottom: "10px", fontSize: "15px" }}
                              key={id}
                            >
                              {name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Este autor não possui livros associados.</p>
                      )}

                      <Dialog.Close asChild>
                        <IconButton aria-label="Close">
                          <X className="ph-x" size={24} />
                        </IconButton>
                      </Dialog.Close>
                    </DialogContent>
                  </Dialog.Portal>
                </Dialog.Root>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
