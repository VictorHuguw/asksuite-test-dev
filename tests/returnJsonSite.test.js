
const request = require('supertest');
const app = require('../server');

describe('Teste do endpoint /search', () => {
  
  it('Verifica se os dados foram retornados no formato de json', async () => {

    const response = await request(app)
      .post('/search')
      .send({ checkin: '2023-07-26', checkout: '2023-07-29' });

    expect(Array.isArray(response.body)).toBe(true);

    response.body.forEach((item) => {
        expect(item).toEqual(
          expect.objectContaining({
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(String),
            image: expect.any(String),
          })
        );
      });
      

    expect(response.statusCode).toBe(200); 
  
});


});
