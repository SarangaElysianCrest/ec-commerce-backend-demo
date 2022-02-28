// import * as request from 'supertest';

// import app from '../app';

// // // a helper function to make a POST request
// // function post(url : string, body : string | object){
// //   const httpRequest = request(app).post(url);
// //   httpRequest.send(body);
// //   httpRequest.set('Accept', 'application/json')
// //   httpRequest.set('Origin', 'http://localhost:3000')
// //   return httpRequest;
// // }

// // function get(url: string) {
// //   const httpRequest = request(app).get(url);
// //   httpRequest.set('Accept', 'application/json');
// //   return httpRequest;
// // }

// describe('Healthz', () => {

//   test('GET /healthz', async () => {
//     // const resp = await get('/healthz').expect(200);
//   })

// });

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
  });