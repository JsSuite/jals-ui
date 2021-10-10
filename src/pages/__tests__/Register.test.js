import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useStore } from "../../utils/Store";
import Register from "../Register";
import * as API from "../../utils/ApiClient";

test("should trigger error labels if inputs are not filled and login button is clicked", () => {
  useStore.setState({ state: { auth: { isLoggedIn: false, user: {} } } });
  render(
    <BrowserRouter>
      <Switch>
        <Register />
      </Switch>
    </BrowserRouter>
  );

  const button = screen.getByTestId("Register.Button");
  fireEvent.click(button);
  const username = screen.getByTestId("Register.Username.Error");
  const password = screen.getByTestId("Register.Password.Error");
  const name = screen.getByTestId("Register.Name.Error");
  const email = screen.getByTestId("Register.Email.Error");

  expect(username.textContent).toBe(`*required`);
  expect(password.textContent).toBe(`*required`);
  expect(name.textContent).toBe(`*required`);
  expect(email.textContent).toBe(`*required`);
});

test("should trigger register API if inputs are filled and login button is clicked", async () => {
  useStore.setState({ state: { auth: { isLoggedIn: false, user: {} } } });
  render(
    <BrowserRouter>
      <Switch>
        <Register />
      </Switch>
    </BrowserRouter>
  );
  API.registerUser = jest.fn().mockRejectedValue("");

  const usernameTxt = screen.getByTestId("Register.Username");
  const passwordTxt = screen.getByTestId("Register.Password");
  const emailTxt = screen.getByTestId("Register.Email");
  const nameTxt = screen.getByTestId("Register.Name");

  fireEvent.change(usernameTxt, { target: { id: "username", value: "john" } });
  fireEvent.change(passwordTxt, {
    target: { id: "password", value: "john123" },
  });
  fireEvent.change(emailTxt, {
    target: { id: "email", value: "john@gmail.com" },
  });
  fireEvent.change(nameTxt, {
    target: { id: "name", value: "John" },
  });

  const button = screen.getByTestId("Register.Button");
  await act(async () => {
    fireEvent.click(button);
  });
  await Promise.resolve();

  expect(API.registerUser).toBeCalledWith({
    username: "john",
    password: "john123",
    name: "John",
    email: "john@gmail.com",
  });
});
