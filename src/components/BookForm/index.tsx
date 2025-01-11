import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";

import {
  Form,
  FormGroup,
  Input,
  Label,
  SelectContent,
  SelectTrigger,
  StyledItem,
  Textarea,
} from "./styles";
import { Button } from "../Dialgo/styles";
import { Book } from "../../@types/styled";
import { ErrorMessage } from "@hookform/error-message";

interface BookFormData {
  name: string;
  pages?: number;
  author_id: string;
  cover?: string;
  resumBook?: string;
}

interface Author {
  id: string;
  name: string;
}

interface BookFormProps {
  onAddBook: (book: {
    id: string;
    name: string;
    pages?: number;
    author_id: string;
    authorName: string;
    cover?: string;
    resumBook?: string;
  }) => void;
}

export function BookForm({ onAddBook }: BookFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookFormData>();
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("authors") || "[]");
    setAuthors(storedAuthors);
  }, []);

  const onSubmit = (data: BookFormData) => {
    const books = JSON.parse(localStorage.getItem("books") || "[]");

    const isDuplicate = books.some(
      (book: Book) => book.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isDuplicate) {
      alert("Livro já cadastrado.");
      return;
    }

    const selectedAuthor = authors.find(
      (author) => author.id === data.author_id
    );
    const newBook = {
      id: Date.now().toString(),
      ...data,
      authorName: selectedAuthor?.name || "Autor desconhecido",
    };

    onAddBook(newBook);
    reset();

    alert("Livro cadastrado com sucesso!");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Nome</Label>
        <div>
          <Input
            type="text"
            placeholder="Corte de espinhos e rosas..."
            {...register("name", {
              required: "O nome é obrigatório",
              minLength: {
                value: 3,
                message: "O nome deve ter no mínimo 3 caracteres.",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "O nome deve conter apenas letras.",
              },
            })}
          />

          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <div
                style={{ fontSize: "12px", color: "red", marginTop: "12px" }}
                className="error"
              >
                {message}
              </div>
            )}
          />
        </div>
      </FormGroup>

      <FormGroup>
        <Label htmlFor="author-select">Autor</Label>
        <div>
          <Select.Root onValueChange={(value) => setValue("author_id", value)}>
            <SelectTrigger id="author-select" aria-label="Selecione um autor">
              <Select.Value placeholder="Selecione um autor" />
            </SelectTrigger>
            <Select.Portal>
              <SelectContent position="popper">
                <Select.ScrollUpButton />
                <Select.Viewport>
                  {authors.map((author) => (
                    <StyledItem
                      key={author.id}
                      value={author.id}
                      aria-label={`Autor: ${author.name}`}
                    >
                      <Select.ItemText>{author.name}</Select.ItemText>
                    </StyledItem>
                  ))}
                </Select.Viewport>
                <Select.ScrollDownButton />
              </SelectContent>
            </Select.Portal>
          </Select.Root>

          {errors.author_id && (
            <p style={{ fontSize: "12px", color: "red", marginTop: "12px" }}>
              {errors.author_id.message}
            </p>
          )}
        </div>
        <Input
          type="hidden"
          {...register("author_id", {
            required: "É necessário selecionar um autor.",
          })}
        />
      </FormGroup>

      <FormGroup>
        <Label>Paginas</Label>
        <Input type="number" {...register("pages")} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="resumBook">Resumo</Label>
        <Textarea
          id="resumBook"
          {...register("resumBook")}
          rows={4}
          wrap="hard"
          placeholder="Escreva o resumo do livro aqui"
        />
      </FormGroup>

      <Button type="submit">Salvar</Button>
    </Form>
  );
}
