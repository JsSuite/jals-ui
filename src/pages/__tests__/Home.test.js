import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../Home";
import { BrowserRouter, Switch } from "react-router-dom";
import { useStore } from "../../utils/Store";

test("should display welcome message in home page", () => {
  useStore.setState({ state: { auth: { user: { username: "John" } } } });
  render(
    <BrowserRouter>
      <Switch>
        <Home />
      </Switch>
    </BrowserRouter>
  );
  const welcomeMsg = screen.getByTestId("Home.WelcomeMsg");
  expect(welcomeMsg.textContent).toBe(`Hello, John`);
});

test("should set to loggedOut in global state when logout button is clicked", () => {
  useStore.setState({
    state: { auth: { isLoggedIn: true, user: { username: "John" } } },
  });
  render(
    <BrowserRouter>
      <Switch>
        <Home />
      </Switch>
    </BrowserRouter>
  );
  const logoutBtn = screen.getByTestId("Home.LogoutButton");
  fireEvent.click(logoutBtn);

  const isLoggedIn = useStore.getState().state.auth.isLoggedIn;
  expect(isLoggedIn).toBe(false);
});
