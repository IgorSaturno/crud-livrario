/// <reference types="cypress" />
import React from "react";
import { mount } from "cypress/react18";
import { AuthorForm } from "../../src/components/AuthorForm";
import { AppContextProvider } from "../../src/Api/Context/AppContext";

describe("AuthorForm", () => {
  beforeEach(() => {
    // Configura o localStorage antes de cada teste
    localStorage.setItem(
      "authors",
      JSON.stringify([{ id: "1", name: "Sarah J. Mass" }])
    );

    // Monta o componente dentro de um contexto
    mount(
      <AppContextProvider>
        <AuthorForm onAddAuthor={() => {}} />
      </AppContextProvider>
    );
  });

  it("deve mostrar mensagem de erro quando 'nome' estiver vazio", () => {
    // Verifica se o campo nome está vazio e não permite o envio
    cy.get('input[placeholder="Nome do autor"]').clear();
    cy.contains("Salvar").click();

    // Verifica a presença da mensagem de erro para o campo 'name'
    cy.contains("O nome é obrigatório").should("be.visible");
  });

  it("deve mostrar mensagem de erro quando 'nome' for muito curto", () => {
    // Preenche o campo de nome com menos de 3 caracteres
    cy.get('input[placeholder="Nome do autor"]').type("Jo");
    cy.contains("Salvar").click();

    // Verifica a mensagem de erro
    cy.contains("O nome deve ter no mínimo 3 caracteres.").should("be.visible");
  });

  it("deve mostrar mensagem de erro quando 'nome' for muito longo", () => {
    // Preenche o campo de nome com mais de 80 caracteres
    cy.get('input[placeholder="Nome do autor"]').type("A".repeat(41));
    cy.contains("Salvar").click();

    // Verifica a mensagem de erro
    cy.contains("O nome não pode exceder 40 caracteres.").should("be.visible");
  });

  it("deve mostrar mensagem de erro quando 'nome' contiver caracteres não alfabéticos", () => {
    // Preenche o campo de nome com caracteres não permitidos
    cy.get('input[placeholder="Nome do autor"]').type("Autor 123");
    cy.contains("Salvar").click();

    // Verifica a mensagem de erro
    cy.contains("O nome deve conter apenas letras.").should("be.visible");
  });

  it("deve mostrar mensagem de erro quando 'email' for inválido", () => {
    // Preenche o campo de email com um valor inválido
    cy.get('input[placeholder="johndoe@..."]').type("johndoe@domain");
    cy.contains("Salvar").click();

    // Verifica a mensagem de erro
    cy.contains("Formato de email inválido").should("be.visible");
  });

  it("deve adicionar um novo autor quando o formulário for válido", () => {
    // Preenche os campos do formulário com dados válidos
    cy.get('input[placeholder="Nome do autor"]').type("Autor Novo");
    cy.get('input[placeholder="johndoe@..."]').type("autor@dominio.com");
    cy.get('textarea[maxlength="250"]').type("Biografia do autor.");

    // Simula o clique no botão de salvar
    cy.contains("Salvar").click();

    // Verifica se o autor foi adicionado ao localStorage
    cy.window()
      .its("localStorage.authors")
      .then((authors) => {
        const parsedAuthors = JSON.parse(authors);
        expect(parsedAuthors).to.have.length(2); // Verifica que há 2 autores
        expect(parsedAuthors[1].name).to.equal("Autor Novo"); // Verifica o nome do novo autor
      });
  });

  it("não deve adicionar autor duplicado", () => {
    // Preenche o formulário com um autor já existente
    cy.get('input[placeholder="Nome do autor"]').type("Sarah J. Mass");
    cy.contains("Salvar").click();

    // Verifica se o alerta de autor duplicado foi disparado
    cy.on("window:alert", (text) => {
      expect(text).to.contains("Autor já cadastrado.");
    });
  });
});
