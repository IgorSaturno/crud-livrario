import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

export interface Author {
  id: string;
  name: string;
  email?: string; // Opcional
}

export interface Book {
  id: string;
  name: string;
  pages?: number; // Opcional
  author_id: string; // Referência ao ID do autor
  authorName: string; // Nome do autor para exibição
}

export type DeleteAuthor = (id: string) => void;

export type DeleteBook = (id: string) => void;
