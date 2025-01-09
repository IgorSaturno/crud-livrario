import { useForm } from "react-hook-form";
import { Button } from "../Dialgo/styles";
import { Form, FormgGroup, Input, Label } from "./styles";

interface AuthorFormData {
  name: string;
  email?: string;
}

interface AuthFormProps {
  onAddAuthor: (author: { id: string; name: string; email?: string }) => void;
}

export function AuthorForm({ onAddAuthor }: AuthFormProps) {
  const { register, handleSubmit, reset } = useForm<AuthorFormData>();

  const onSubmit = (data: AuthorFormData) => {
    const authors = JSON.parse(localStorage.getItem("authors") || "[]");

    const newAuthor = { id: Date.now().toString(), ...data };
    onAddAuthor(newAuthor);

    localStorage.setItem("authors", JSON.stringify([...authors, newAuthor]));
    reset();
    alert("Autor cadastrado com sucesso!");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormgGroup>
        <Label>Nome:</Label>
        <Input {...register("name", { required: true })} />
      </FormgGroup>
      <FormgGroup>
        <Label>Email:</Label>
        <Input {...register("email")} />
      </FormgGroup>

      <Button className="green" type="submit">
        Salvar
      </Button>
    </Form>
  );
}
