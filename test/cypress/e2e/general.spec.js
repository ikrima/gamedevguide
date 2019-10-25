// TODO: restructure tests. Maybe by functionality and not by route?
context('Home', () => {
    beforeEach(() => {
        cy.visit('/');
    });

    context('Header nav', () => {
        context('Global search', () => {
            it('is responsive', () => {
                cy.viewport(1050, 500);
                cy.get('#globalnavsearch').should('not.be.visible');

                cy.viewport('macbook-15');
                cy.get('#globalnavsearch').should('be.visible');
            });

            it('opens and closes search modal', () => {
                cy.viewport('macbook-15');
                cy.get('#globalnavsearch').click();
                cy.get('.ReactModal__Content').should('be.visible');
                cy.get('[data-cy=close-modal]').click();

                cy.viewport(1050, 500);
                cy.get('[data-cy=header-navigation] [data-cy=search-icon]').click();
                cy.get('.ReactModal__Content').should('be.visible');
                cy.get('[data-cy=close-modal').click();
            });
        });
    });

    context('Home search', () => {
        it('opens and closes search modal', () => {
            cy.get('#homesearch').click();
            cy.get('.ReactModal__Content').should('be.visible');
            cy.get('[data-cy=close-modal').click();
        });
    });
});

context('Search modal', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('#homesearch').click();
        cy.get('.ReactModal__Content').should('be.visible');
    });

    it('has focus on input when opened', () => {
        cy.focused().should('have.attr', 'data-cy', 'search-input');
    });

    it('should show search results', () => {
        // Search results are not visible
        cy.get('#react-autowhatever-1').should('not.be.visible');

        // Typing anything into the search input will show search results
        cy.get('[data-cy=search-input]').type('t')
            .get('#react-autowhatever-1').should('be.visible');

        // Removing the input will remove the search results
        cy.get('[data-cy=search-input]').type('{backspace}')
            .get('#react-autowhatever-1').should('not.be.visible');
    });

    // TODO: stub the requsts to Algolia and test them
});

context('Concepts', () => {
    it('Redirects to /introduction', () => {
        cy.visit('/concepts');
        cy.url().should('match', /http:\/\/localhost:8000\/concepts\//);
    });

    context('Sidebar', () => {
        beforeEach(() => {
            cy.visit('/concepts/introduction/');
        });

        it('is responsive', () => {
            // We expect the first link of the sidebar to be expanded
            // and the first element to be active
            cy.get('[data-cy=sidebar] > div > ul > li:first > a')
                .should('have.class', 'sidebarlink-active');

            // No Sidebar on small viewports
            cy.viewport(600, 500);
            cy.get('[data-cy=sidebar]').should('not.be.visible');

            cy.viewport('macbook-15');
            cy.get('[data-cy=sidebar]').should('be.visible');
        });

        it('links, collapses, and expands correctly', () => {
            // Clicking on a new section will change the route...
            cy.get('[data-cy=sidebar] :nth-child(2) h4 a').click()
                .assertRoute('/concepts/architecture/');

            // ...expand the nested elements
            cy.get('[data-cy=sidebar] :nth-child(2) ul').children().should('have.length', 4);

            // ...and set the first item as active
            cy.get('[data-cy=sidebar] :nth-child(2) ul li:first a')
                .should('have.class', 'sidebarlink-active');
        });
    });

    context('ToC', () => {
        it('is responsive', () => {
            // ToC only visible on wider viewports
            cy.viewport('macbook-15');
            cy.visit('/concepts/introduction/');
            cy.get('[data-cy=toc] > h3').should('be.visible');

            // No more ToC visible below this viewport size
            cy.viewport(1050, 500);
            cy.get('[data-cy=toc] > h3').should('not.be.visible');
        });

        it('changes with scroll position');
    });
});

context('Integrations', () => {
    it('Sorting', () => {
        cy.visit('/integrations/');
        cy.get('[data-cy=sort]').within(() => {
            // Default sorting is by popular
            cy.get('a:first').should('have.class', 'blue');

            // Let's sort alphabetically, so the first integration starts with "A" and the last with "Z"
            cy.get('a:nth-child(3)').click();
        });

        // First integrations starts with an "A"
        cy.get('.gh-integrations a:first div:nth-child(2)').contains(/^A/);
        // Changing the sort order doesn't change the route
        cy.assertRoute('/integrations/');
        // Last integration starts with an "Z"
        cy.get('.gh-integrations a:last-child div:nth-child(2)').contains(/^Z/);
        cy.assertRoute('/integrations/');
    });

    it('Filtering', () => {
        cy.visit('/integrations/');
        cy.get('[data-cy=all-integrations-filter]').should('have.class', 'blue');

        cy.get('[data-cy=analytics-filter]').click();
        cy.get('[data-cy=analytics-filter]').should('have.class', 'blue');
        cy.assertRoute('/integrations/analytics/');
    });

    it('Tag archive URLs', () => {
        cy.visit('/integrations/email/')
            .get('[data-cy=email-filter]').should('have.class', 'blue');
    });

    it('Searching', () => {
        cy.visit('/integrations/email/');

        cy.get('[data-cy=close-icon]').should('not.be.visible');

        cy.get('#integrationsearch').type('test')
            .get('[data-cy=email-filter]').should('not.have.class', 'blue')
            .get('[data-cy=all-integrations-filter]').should('have.class', 'blue')
            .get('[data-cy=close-icon]').should('be.visible');

        cy.get('#integrationsearch').type('{backspace}{backspace}{backspace}{backspace}')
            .get('[data-cy=email-filter]').should('have.class', 'blue')
            .get('[data-cy=close-icon]').should('not.be.visible');
    });
});

