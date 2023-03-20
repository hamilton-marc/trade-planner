import { entityItemSelector } from '../../support/commands';
import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('PlanTransaction e2e test', () => {
  const planTransactionPageUrl = '/plan-transaction';
  const planTransactionPageUrlPattern = new RegExp('/plan-transaction(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const planTransactionSample = {};

  let planTransaction: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/plan-transactions+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/plan-transactions').as('postEntityRequest');
    cy.intercept('DELETE', '/api/plan-transactions/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (planTransaction) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/plan-transactions/${planTransaction.id}`,
      }).then(() => {
        planTransaction = undefined;
      });
    }
  });

  it('PlanTransactions menu should load PlanTransactions page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('plan-transaction');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('PlanTransaction').should('exist');
    cy.url().should('match', planTransactionPageUrlPattern);
  });

  describe('PlanTransaction page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(planTransactionPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create PlanTransaction page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/plan-transaction/new$'));
        cy.getEntityCreateUpdateHeading('PlanTransaction');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', planTransactionPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/plan-transactions',
          body: planTransactionSample,
        }).then(({ body }) => {
          planTransaction = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/plan-transactions+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [planTransaction],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(planTransactionPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details PlanTransaction page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('planTransaction');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', planTransactionPageUrlPattern);
      });

      it('edit button click should load edit PlanTransaction page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('PlanTransaction');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', planTransactionPageUrlPattern);
      });

      it('last delete button click should delete instance of PlanTransaction', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('planTransaction').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', planTransactionPageUrlPattern);

        planTransaction = undefined;
      });
    });
  });

  describe('new PlanTransaction page', () => {
    beforeEach(() => {
      cy.visit(`${planTransactionPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('PlanTransaction');
    });

    it('should create an instance of PlanTransaction', () => {
      cy.get(`[data-cy="numberOfContracts"]`).type('5923').should('have.value', '5923');

      cy.get(`[data-cy="costPerContract"]`).type('49675').should('have.value', '49675');

      cy.get(`[data-cy="stopLoss"]`).type('58582').should('have.value', '58582');

      cy.get(`[data-cy="technicalStopLoss"]`).type('48966').should('have.value', '48966');

      cy.get(`[data-cy="timeStop"]`).type('2022-02-20T07:55').should('have.value', '2022-02-20T07:55');

      cy.get(`[data-cy="plannedEntryDate"]`).type('2022-02-20T11:46').should('have.value', '2022-02-20T11:46');

      cy.get(`[data-cy="plannedExitDate"]`).type('2022-02-20T01:43').should('have.value', '2022-02-20T01:43');

      cy.get(`[data-cy="entryReason"]`).type('Multi-channelled adapter').should('have.value', 'Multi-channelled adapter');

      cy.get(`[data-cy="exitReason"]`).type('Liaison Savings').should('have.value', 'Liaison Savings');

      cy.get(`[data-cy="orderStatus"]`).select('Planned');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        planTransaction = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', planTransactionPageUrlPattern);
    });
  });
});
