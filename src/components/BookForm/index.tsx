import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as Select from "@radix-ui/react-select";
import * as Avatar from "@radix-ui/react-avatar";
import {
  Form,
  FormGroup,
  Input,
  Label,
  SelectContent,
  SelectTrigger,
  StyledItem,
} from "./styles";
import { Button } from "../Dialgo/styles";

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
  const { register, handleSubmit, reset, setValue } = useForm<BookFormData>();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  useEffect(() => {
    const storedAuthors = JSON.parse(localStorage.getItem("authors") || "[]");
    setAuthors(storedAuthors);
  }, []);

  const onSubmit = (data: BookFormData) => {
    const selectedAuthor = authors.find(
      (author) => author.id === data.author_id
    );
    const newBook = {
      id: Date.now().toString(),
      ...data,
      authorName: selectedAuthor?.name || "Autor desconhecido",
      coverImage,
    };

    onAddBook(newBook);
    reset();
    setCoverImage(null);
    alert("Livro cadastrado com sucesso!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Nome</Label>
        <Input {...register("name", { required: true })} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="author-select">Autor</Label>
        <Select.Root onValueChange={(value) => setValue("author_id", value)}>
          <SelectTrigger id="author-select" aria-label="Selecione um autor">
            <Select.Value />
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
        <Input type="hidden" {...register("author_id", { required: true })} />
      </FormGroup>

      <FormGroup>
        <Label>Paginas</Label>
        <Input type="number" {...register("pages")} />
      </FormGroup>

      <FormGroup>
        <Label htmlFor="resumBook">Resumo</Label>
        <textarea
          id="resumBook"
          {...register("resumBook")}
          rows={4}
          placeholder="Escreva o resumo do livro aqui"
        />
      </FormGroup>

      <FormGroup>
        <Label>Capa do Livro</Label>
        <Input type="file" accept="image/" onChange={handleImageUpload} />
        {coverImage && (
          <Avatar.Root>
            <Avatar.Image
              src={coverImage}
              alt="Preview"
              style={{ width: "100px", height: "150px", objectFit: "cover" }}
            />
            <Avatar.Fallback>Sem Capa</Avatar.Fallback>
          </Avatar.Root>
        )}
      </FormGroup>

      <Button type="submit">Salvar</Button>
    </Form>
  );
}
