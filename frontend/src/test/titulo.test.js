import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Titulo from "../protected/components/Titulo";

let container = null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('rendereizando com e sem titulo', () => {
  act(() => {
    render(<Titulo />, container);
  });
  expect(container.textContent).toBe('Titulo não Informado');

  act(() => {
    render(<Titulo nome='Tela de produtos' />, container);
  });
  expect(container.textContent).toBe("Tela de produtos");

  act(() => {
    render(<Titulo nome="Login" />, container);
  });
  expect(container.textContent).toBe("Login");
});