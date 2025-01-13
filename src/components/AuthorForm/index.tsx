import { useForm } from "react-hook-form";
import { Button } from "../Dialgo/styles";
import { Form, FormGroup, Input, Label, Textarea } from "./styles";
import { Author } from "../../@types/styled";
import { ErrorMessage } from "@hookform/error-message";

interface AuthorFormData {
  name: string;
  email?: string;
  bio?: string;
}

interface AuthFormProps {
  onAddAuthor: (author: {
    id: string;
    name: string;
    email?: string;
    bio?: string;
  }) => void;
}

export function AuthorForm({ onAddAuthor }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthorFormData>();

  const onSubmit = (data: AuthorFormData) => {
    const authors = JSON.parse(localStorage.getItem("authors") || "[]");

    const isDuplicate = authors.some(
      (author: Author) => author.name.toLowerCase() === data.name.toLowerCase()
    );
    if (isDuplicate) {
      alert("Autor já cadastrado.");
      return;
    }

    const newAuthor = { id: Date.now().toString(), ...data };
    onAddAuthor(newAuthor);

    localStorage.setItem("authors", JSON.stringify([...authors, newAuthor]));
    reset();
    alert("Autor cadastrado com sucesso!");
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Nome:</Label>
        <div>
          <Input
            type="text"
            placeholder="Nome do autor"
            {...register("name", {
              required: "O nome é obrigatório",
              minLength: {
                value: 3,
                message: "O nome deve ter no mínimo 3 caracteres.",
              },
              maxLength: {
                value: 40,
                message: "O nome não pode exceder 40 caracteres.",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s.'-]+$/,
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
        <Label>Email:</Label>
        <div>
          <Input
            placeholder="johndoe@..."
            {...register("email", {
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: "Formato de email inválido",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
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
        <Label>Biografia:</Label>
        <Textarea maxLength={250} {...register("bio")} />
      </FormGroup>

      <Button className="green" type="submit">
        Salvar
      </Button>
    </Form>
  );
}
