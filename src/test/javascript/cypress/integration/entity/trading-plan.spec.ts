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

describe('TradingPlan e2e test', () => {
  const tradingPlanPageUrl = '/trading-plan';
  const tradingPlanPageUrlPattern = new RegExp('/trading-plan(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const tradingPlanSample = { name: 'up Fresh program', underlying: 'eyeballs scale Tasty' };

  let tradingPlan: any;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/trading-plans+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/trading-plans').as('postEntityRequest');
    cy.intercept('DELETE', '/api/trading-plans/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (tradingPlan) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/trading-plans/${tradingPlan.id}`,
      }).then(() => {
        tradingPlan = undefined;
      });
    }
  });

  it('TradingPlans menu should load TradingPlans page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('trading-plan');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response!.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('TradingPlan').should('exist');
    cy.url().should('match', tradingPlanPageUrlPattern);
  });

  describe('TradingPlan page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(tradingPlanPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create TradingPlan page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/trading-plan/new$'));
        cy.getEntityCreateUpdateHeading('TradingPlan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tradingPlanPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/trading-plans',
          body: tradingPlanSample,
        }).then(({ body }) => {
          tradingPlan = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/trading-plans+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [tradingPlan],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(tradingPlanPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details TradingPlan page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('tradingPlan');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tradingPlanPageUrlPattern);
      });

      it('edit button click should load edit TradingPlan page', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('TradingPlan');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tradingPlanPageUrlPattern);
      });

      it('last delete button click should delete instance of TradingPlan', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('tradingPlan').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response!.statusCode).to.equal(200);
        });
        cy.url().should('match', tradingPlanPageUrlPattern);

        tradingPlan = undefined;
      });
    });
  });

  describe('new TradingPlan page', () => {
    beforeEach(() => {
      cy.visit(`${tradingPlanPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('TradingPlan');
    });

    it('should create an instance of TradingPlan', () => {
      cy.get(`[data-cy="name"]`).type('RSS').should('have.value', 'RSS');

      cy.get(`[data-cy="underlying"]`).type('1080p applications').should('have.value', '1080p applications');

      cy.get(`[data-cy="underlyingDescription"]`)
        .type('application Mobility cross-platform')
        .should('have.value', 'application Mobility cross-platform');

      cy.get(`[data-cy="underlyingOutlook"]`).select('Up');

      cy.get(`[data-cy="underlyingOutlookOtherDesc"]`).type('firmware turquoise').should('have.value', 'firmware turquoise');

      cy.get(`[data-cy="underlyingTrend"]`).type('upward-trending payment').should('have.value', 'upward-trending payment');

      cy.get(`[data-cy="marketOutlook"]`).select('Sidways');

      cy.get(`[data-cy="marketOutlookOtherDesc"]`).type('Unbranded Walk customized').should('have.value', 'Unbranded Walk customized');

      cy.get(`[data-cy="marketTrend"]`).type('Officer').should('have.value', 'Officer');

      cy.get(`[data-cy="timeFrame"]`).type('Berkshire HDD Bermuda').should('have.value', 'Berkshire HDD Bermuda');

      cy.get(`[data-cy="strategy"]`).type('Underpass data-warehouse Outdoors').should('have.value', 'Underpass data-warehouse Outdoors');

      cy.get(`[data-cy="notes"]`).type('Producer').should('have.value', 'Producer');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(201);
        tradingPlan = response!.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response!.statusCode).to.equal(200);
      });
      cy.url().should('match', tradingPlanPageUrlPattern);
    });
  });
});
