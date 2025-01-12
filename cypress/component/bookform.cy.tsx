/// <reference types="cypress" />
import React from "react";
import { mount } from "cypress/react18";
import { BookForm } from "../../src/components/BookForm";
import { AppContextProvider } from "../../src/Api/Context/AppContext";

describe("BookForm Component", () => {
  beforeEach(() => {
    // Configuração inicial: adicionar autores ao localStorage
    localStorage.setItem(
      "authors",
      JSON.stringify([
        { id: "1", name: "John Doe" },
        { id: "2", name: "Jane Smith" },
      ])
    );

    localStorage.setItem("books", JSON.stringify([]));

    // Monta o componente com o contexto necessário
    mount(
      <AppContextProvider>
        <BookForm onAddBook={() => {}} />
      </AppContextProvider>
    );
  });

  afterEach(() => {
    // Limpar o localStorage após cada teste
    localStorage.clear();
  });

  it("deve exibir mensagens de erro para campos obrigatórios", () => {
    // Clicar no botão de submeter sem preencher o formulário
    cy.get('button[type="submit"]').click();

    // Verificar se as mensagens de erro são exibidas
    cy.get(".error").should("contain", "O nome é obrigatório");
    cy.get(".error").should("contain", "É necessário selecionar um autor.");
  });

  it("deve adicionar um novo livro quando o formulário for preenchido corretamente", () => {
    // Preencher o campo "Nome" com um valor válido
    cy.get('input[placeholder="Ex:Corte de espinhos e rosas..."]')
      .type("Meu Livro")
      .should("have.value", "Meu Livro");

    // Selecionar um autor no dropdown
    cy.get("#author-select").should("be.visible").click({ force: true });
    cy.get("#author-select").invoke("css", "pointer-events", "auto"); // Ajusta o estilo para permitir a interação

    // Selecionar um autor no dropdown
    cy.contains("John Doe").should("exist").click({ force: true }); // Ajusta o estilo para permitir a inter

    // Preencher o campo de resumo
    cy.get("#resumBook")
      .type("Este é um resumo do livro.")
      .should("have.value", "Este é um resumo do livro.");

    // Submeter o formulário
    cy.get('button[type="submit"]').click({ force: true });

    cy.wait(500);

    // Verificar se o livro foi adicionado ao localStorage
    cy.window().then((window) => {
      const books = JSON.parse(window.localStorage.getItem("books") || "[]");

      // Garantir que 'books' seja um array
      expect(books).to.be.an("array");

      // Verificar o comprimento do array
      expect(books.length).to.equal(1); // Verifique que o array tem 1 livro

      // Verificar se o nome e o autor do livro estão corretos
      expect(books[0].name).to.equal("Meu Livro");
      expect(books[0].authorName).to.equal("John Doe");
    });
  });

  it("não deve permitir livros com nomes duplicados", () => {
    // Adicionar um livro existente ao localStorage
    const existingBooks = [
      {
        id: "1",
        name: "Livro de teste",
        author_id: "1",
        authorName: "John Doe",
      },
    ];
    localStorage.setItem("books", JSON.stringify(existingBooks));

    // Preencher o campo "Nome" com um nome duplicado
    cy.get('input[placeholder="Ex:Corte de espinhos e rosas..."]')
      .type("Livro de teste")
      .should("have.value", "Livro de teste");

    // Selecionar um autor no dropdown
    cy.get("#author-select").should("be.visible").click({ force: true });
    cy.get("#author-select").invoke("css", "pointer-events", "auto"); // Ajusta o estilo para permitir a interação
    // Selecionar um autor no dropdown
    cy.contains("John Doe").should("exist").click({ force: true }); // Ajusta o estilo para permitir a inter

    // Submeter o formulário
    cy.get('button[type="submit"]').click({ force: true });

    // Verificar o alerta de duplicação
    cy.on("window:alert", (alertMessage) => {
      expect(alertMessage).to.equal("Livro já cadastrado.");
    });

    // Garantir que nenhum novo livro foi adicionado
    cy.wrap(localStorage.getItem("books")).should((books) => {
      const parsedBooks = JSON.parse(books || "[]");
      expect(parsedBooks).to.have.length(1);
    });
  });
});
