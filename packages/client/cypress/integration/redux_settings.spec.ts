// / <reference types="cypress" />
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

// https://www.cypress.io/blog/2018/11/14/testing-redux-store/

describe("get working...", () => {
  it("redux store should be in @INIT state.", () => {
    cy.visit("/");
    cy.window()
      .its("store")
      .invoke("getState")
      .should("deep.equal", {
        searchReducer: {
          searchText: "",
        },
        settingsReducer: {
          partsFilter: "allFiles",
          show: {
            gcode: false,
            obj: false,
            stl: true,
            threeMF: true,
          },
          folder: {
            settingDetailsIsOpen: false,
            searchFiltersParts: true,
          },
        },
        folderReducer: {
          currentFolder: null,
          showDialog: false,
          cursor: 0,
          currentRootFolder: null,
        },
        selectedFolderItemsReducer: {
          selectedParts: [],
        },
      });
  });

  it("toggle filter", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.visit("http://localhost:3000/");
    cy.get(":nth-child(1) > :nth-child(2) > .menu__link > .menu__svg").click();
    // cy.get('.fd > .btn').click();
    cy.window()
      .its("store")
      .invoke("dispatch", { type: "settings/toggleSettingsDetails" });
    cy.wait(1000);
    cy.get("[data-cy=folder-details]");
    /* ==== End Cypress Studio ==== */
  });
});
