import React from "react";
import { mount } from "cypress/react18";
import { AuthorTable } from "../../src/components/AuthorTable";

describe("AuthorTable Component", () => {
  const authors = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      bio: "Bio of John",
    },
    { id: "2", name: "Jane Smith", email: "jane@example.com", bio: "" },
  ];

  const books = [
    { id: "101", name: "Book 1", pages: 100, author_id: "1" },
    { id: "102", name: "Book 2", pages: 200, author_id: "1" },
  ];

  let onDelete: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    onDelete = cy.stub().as("onDeleteStub"); // Stub para verificar chamadas no evento onDelete
    mount(<AuthorTable authors={authors} books={books} onDelete={onDelete} />);
  });

  it("deve renderizar corretamente os nomes dos autores e seus emails", () => {
    authors.forEach((author) => {
      cy.contains(author.name).should("exist");
      cy.contains(author.email).should("exist");
    });
  });

  it("deve abrir o modal com informações do autor ao clicar no botão de visualização", () => {
    cy.get("table tbody tr")
      .first()
      .find("button")
      .find("svg")
      .should("have.attr", "class")
      .and("include", "ph-eye"); // Verifica se o ícone 'Eye' está presente
    cy.get("table tbody tr").first().find("button").find("svg.ph-eye").click(); // Clica no ícone Eye do primeiro livro

    // Verifica se o modal foi aberto com os dados do autor
    cy.get('[aria-describedby="dialog-author-table-title"]').should(
      "be.visible"
    );
    cy.contains("Bio of John").should("be.visible");
    cy.contains("john@example.com").should("be.visible");

    // Verifica os livros associados no modal
    cy.contains("Book 1").should("exist");
    cy.contains("Book 2").should("exist");
  });

  it("deve exibir mensagem quando o autor não possui livros associados", () => {
    // Seleciona o segundo autor (Jane Smith) e clica no botão de visualização
    cy.get("table tbody tr").eq(1).find("button").find("svg.ph-eye").click();

    // Verifica se o modal foi aberto corretamente
    cy.get('[aria-describedby="dialog-author-table-title"]').should(
      "be.visible"
    );

    // Verifica se o modal exibe as informações do autor correto
    cy.contains("Jane Smith").should("be.visible");
    cy.contains("jane@example.com").should("be.visible");

    // Verifica a mensagem de "Este autor não possui livros associados."
    cy.contains("Este autor não possui livros associados.").should(
      "be.visible"
    );
  });

  it("deve chamar a função onDelete ao clicar no botão de excluir", () => {
    cy.get("table tbody tr")
      .first()
      .find("button")
      .find("svg.ph-trash") // Verifica se o ícone Trash está presente
      .should("be.visible"); // Garante que o ícone Trash está visível

    cy.get("table tbody tr")
      .first()
      .find("button")
      .find("svg.ph-trash")
      .click(); // Clica no ícone Trash do primeiro livro

    // Verifica se a função onDelete foi chamada com o ID correto
    cy.get("@onDeleteStub").should("have.been.calledOnceWith", authors[0].id);
  });

  it("deve renderizar a tabela com os cabeçalhos corretos", () => {
    const headers = ["Nome", "E-mail", "Ações"];
    headers.forEach((header) => {
      cy.get("table thead").contains(header).should("exist");
    });
  });
});
