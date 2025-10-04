import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import RegisterPage from "../../pages/RegisterPage";
import LoginPage from "../../pages/LoginPage";
import DashboardPage from "../../pages/DashboardPage";

const registerPage = new RegisterPage();
const loginPage = new LoginPage();
const dashboardPage = new DashboardPage();

let userData = {
  firstName: "John",
  lastName: "Doe",
  address: "123 Main St",
  city: "NYC",
  state: "NY",
  zip: "12345",
  phone: "1234567890",
  ssn: "98765",
  username: "user" + Date.now(),
  password: "Password123"
};

Given("I navigate to the Parabank registration page", () => {
  cy.visit("/register.htm?ConnType=JDBC");
  cy.screenshot("registration-page");
});

When("I fill the registration form with valid data", () => {
  registerPage.fillForm(userData);
  // capture filled form state
  cy.screenshot("registration-form-filled");
});

When("I submit the registration form", () => {
  registerPage.submitForm();
  cy.screenshot("registration-form-submitted");
});

Then("I should see the registration success message", () => {
  cy.contains("Your account was created successfully. You are now logged in.").should("be.visible");
  cy.screenshot("registration-success");
});

Given("I navigate to the Parabank login page", () => {
  cy.visit("/?ConnType=JDBC");
  cy.screenshot("login-page");
});

When("I login with the registered credentials", () => {
  loginPage.login(userData.username, userData.password);
  cy.screenshot("login-submitted");
});

Then("I should be redirected to the dashboard", () => {
  cy.contains("Accounts Overview").should("be.visible");
  cy.screenshot("dashboard-overview");
});

Then("I should see the account balance displayed", () => {
  dashboardPage.getBalance().then(balance => {
    cy.log("Account Balance is: " + balance);
  });
  cy.screenshot("account-balance");
});
