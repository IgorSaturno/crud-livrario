/// <reference types="cypress" />
import React from "react";
import { mount } from "cypress/react";
import { DialogAuthor, DialogBook } from "../../src/components/Dialgo";
import { AppContextProvider } from "../../src/Api/Context/AppContext";

describe("Dialog Components", () => {
  beforeEach(() => {
    // Monta o componente com o contexto necessário
    mount(
      <AppContextProvider>
        <div>
          <DialogAuthor />
          <DialogBook />
        </div>
      </AppContextProvider>
    );
  });

  it("Deve abrir o diálogo 'Add Autor' e exibir o AuthorForm.", () => {
    // Verifica se o botão está visível
    cy.contains("Add autor").should("be.visible");

    // Clica no botão para abrir o diálogo
    cy.contains("Add autor").click();

    // Verifica se o título do diálogo e o formulário aparecem
    cy.contains("Cadestre um novo Autor").should("be.visible");
    cy.contains("Adicione os dados do novo autor.").should("be.visible");

    // Verifica a presença de inputs do formulário (por exemplo, um campo de nome)
    cy.get("input[placeholder='Nome do autor']").should("exist");

    // Fecha o diálogo
    cy.get('[aria-label="Close"]').click();

    // Verifica se o diálogo foi fechado
    cy.contains("Cadestre um novo Autor").should("not.exist");
  });

  it("sDeve abrir o diálogo 'Add Book' e exibir o BookForm.", () => {
    // Verifica se o botão está visível
    cy.contains("Add Livro").should("be.visible");

    // Clica no botão para abrir o diálogo
    cy.contains("Add Livro").click();

    // Verifica se o título do diálogo e o formulário aparecem
    cy.contains("Cadestre um novo Livro").should("be.visible");
    cy.contains("Adicione os dados do novo livro.").should("be.visible");

    // Verifica a presença de inputs do formulário (por exemplo, um campo de nome do livro)
    cy.get("input[placeholder='Ex:Corte de espinhos e rosas...']").should(
      "exist"
    );

    // Fecha o diálogo
    cy.get('[aria-label="Close"]').click();

    // Verifica se o diálogo foi fechado
    cy.contains("Cadestre um novo Livro").should("not.exist");
  });
});
