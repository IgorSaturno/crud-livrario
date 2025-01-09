import * as Dialog from "@radix-ui/react-dialog";
import { Book, Pen, X } from "phosphor-react";
import {
  Button,
  IconButton,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
} from "./styles";
import { AuthorForm } from "../AuthorForm";
import { BookForm } from "../BookForm/index.tsx";

interface DialogAuthorProps {
  onAddAuthor: (author: { id: string; name: string; email?: string }) => void;
}

interface BookFormProps {
  onAddBook: (book: {
    id: string;
    name: string;
    pages?: number;
    author_id: string;
  }) => void;
}

export function DialogAuthor({ onAddAuthor }: DialogAuthorProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="violet">
          Add autor
          <Pen size={20} />
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent
          aria-describedby={undefined}
          aria-labelledby="dialog-author-title"
        >
          <DialogTitle id="dialog-author-title">
            Cadestre um novo Autor
          </DialogTitle>
          <DialogDescription>
            Adicione os dados do novo autor.
          </DialogDescription>
          <AuthorForm onAddAuthor={onAddAuthor} />
          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <X size={24} />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function DialogBook({ onAddBook }: BookFormProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="violet">
          Add Livro <Book size={20} />{" "}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent
          aria-describedby={undefined}
          aria-labelledby="dialog-book-title"
        >
          <DialogTitle id="dialog-book-title">
            Cadestre um novo Livro
          </DialogTitle>
          <DialogDescription>
            Adicione os dados do novo livro.
          </DialogDescription>
          <BookForm onAddBook={onAddBook} />
          <Dialog.Close asChild>
            <IconButton aria-label="Close">
              <X size={24} />
            </IconButton>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
