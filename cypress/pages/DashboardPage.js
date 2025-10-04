class DashboardPage {
  getBalance() {
    return cy.get("#accountTable tbody tr:first-child td:nth-child(2)").invoke("text");
  }
}
export default DashboardPage;
