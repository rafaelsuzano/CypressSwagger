describe('API Tests', () => {
  const apiEndpoint = 'https://petstore.swagger.io/v2'; // URL da sua API
  const swaggerUrl = 'https://petstore.swagger.io/v2/swagger.json'; // URL do arquivo Swagger

  it('should validate API endpoints against Swagger', () => {
      // Faz uma requisição GET para o Swagger
      cy.request(swaggerUrl).then((response) => {
          expect(response.status).to.eq(200);

          // Aqui você pode parsear o arquivo Swagger se necessário
          const swaggerDoc = response.body;

          // Exemplo: Verifique se um endpoint específico existe
          const endpoint = `${apiEndpoint}/pet`;
          const method = 'GET';

          const paths = swaggerDoc.paths;
          expect(paths).to.have.property('/pet');
          //expect(paths['/pet']).to.have.property('get');
      });
  });

  it('should return 200 for GET /example', () => {
      const endpoint = 'https://petstore.swagger.io/v2/pet/findByStatus?status=available';
      
      cy.request(endpoint).then((response) => {
          expect(response.status).to.eq(200);
          // Você pode adicionar mais validações baseadas no seu modelo de dados
          response.body.forEach((item) => {
            expect(item).to.have.property('id');
            cy.log('ID encontrado: ' + item.id);       // aparece no runner do Cypress
            console.log('ID encontrado:', item.id);    // aparece no DevTools (cxwwwonsole do navegador)
          });
      });
  });
});