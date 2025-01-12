import React from "react";
import { mount } from "cypress/react18";
import { BookTable } from "../../src/components/BookTable";

describe("BookTable Component", () => {
  const books = [
    {
      id: "1",
      name: "Book 1",
      pages: 100,
      authorName: "John Doe",
      resumBook: "This is a summary of Book 1.",
    },
    {
      id: "2",
      name: "Book 2",
      pages: 200,
      authorName: "Jane Smith",
    },
  ];

  let onDelete: Cypress.Agent<sinon.SinonStub>;

  beforeEach(() => {
    onDelete = cy.stub().as("onDeleteStub"); // Stub para verificar chamadas no evento onDelete
    mount(<BookTable books={books} onDelete={onDelete} />);
  });

  it("deve renderizar corretamente os nomes dos livros", () => {
    books.forEach((book) => {
      cy.contains(book.name).should("exist");
    });
  });

  it("deve abrir o modal com informações do livro ao clicar no botão de visualização", () => {
    cy.get("table tbody tr")
      .first()
      .find("button")
      .find("svg")
      .should("have.attr", "class")
      .and("include", "ph-eye"); // Verifica se o ícone 'Eye' está presente
    cy.get("table tbody tr").first().find("button").find("svg.ph-eye").click(); // Clica no ícone Eye do primeiro livro

    // Verifica se o modal foi aberto com os dados do livro
    cy.contains(books[0].name).should("be.visible");
    cy.contains(books[0].authorName).should("be.visible");
    if (books[0].resumBook) {
      cy.contains(books[0].resumBook).should("be.visible");
    }
    cy.contains(`${books[0].pages} páginas`).should("be.visible");
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
    cy.get("@onDeleteStub").should("have.been.calledOnceWith", books[0].id);
  });
  it("deve renderizar a tabela com os cabeçalhos corretos", () => {
    const headers = ["Nome", "Ações"];
    headers.forEach((header) => {
      cy.get("table thead").contains(header).should("exist");
    });
  });

  it("deve exibir o botão de fechar no modal", () => {
    cy.get("table tbody tr")
      .first()
      .find("button")
      .find("svg")
      .should("have.attr", "class")
      .and("include", "ph-eye");
    cy.get("table tbody tr").first().find("button").find("svg.ph-eye").click(); // Clica no botão Eye

    // Verifica se o botão de fechar (ícone X) está presente no modal
    cy.get("button").find("svg").should("have.class", "ph-x"); // Classe do ícone X
  });
});
