import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { BrowserRouter, Switch } from "react-router-dom";
import { useStore } from "../../utils/Store";
import Login from "../Login";
import * as API from "../../utils/ApiClient";

test("should trigger error labels if inputs are not filled and login button is clicked", () => {
  useStore.setState({ state: { auth: { isLoggedIn: false, user: {} } } });
  render(
    <BrowserRouter>
      <Switch>
        <Login />
      </Switch>
    </BrowserRouter>
  );

  const button = screen.getByTestId("Login.Button");
  fireEvent.click(button);
  const username = screen.getByTestId("Login.Username.Error");
  const password = screen.getByTestId("Login.Password.Error");

  expect(username.textContent).toBe(`*required`);
  expect(password.textContent).toBe(`*required`);
});

test("should trigger login API if inputs are filled and login button is clicked", async () => {
  useStore.setState({ state: { auth: { isLoggedIn: false, user: {} } } });
  render(
    <BrowserRouter>
      <Switch>
        <Login />
      </Switch>
    </BrowserRouter>
  );
  API.loginUser = jest.fn().mockRejectedValue("");

  const usernameTxt = screen.getByTestId("Login.Username");
  const passwordTxt = screen.getByTestId("Login.Password");

  fireEvent.change(usernameTxt, { target: { id: "username", value: "john" } });
  fireEvent.change(passwordTxt, {
    target: { id: "password", value: "john123" },
  });

  const button = screen.getByTestId("Login.Button");
  await act(async () => {
    fireEvent.click(button);
  });
  await Promise.resolve();

  expect(API.loginUser).toBeCalledWith({
    username: "john",
    password: "john123",
  });
});
