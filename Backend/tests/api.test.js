const request = require('supertest');
const { createApp } = require('../config/app');

const app = createApp();

describe('Pruebas de Rutas de Clientes', () => {
    
    test('Debería obtener la lista de clientes (200 OK)', async () => {
    const tokenDePrueba = "eyJhbGciOiJFUzI1NiIsImtpZCI6IjA0ODBjMGIxLTU1NTQtNDgxOS05NTViLTQ5YzZhY2IyM2M3NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2JkaGp2Znd6eXBkcXlnbGZnZHJvLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiJkZmMxYzEzZi1kODhkLTQ1MzctYWM2YS1mMTEyNGZjNjU0OWQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzcxNDM1MjY5LCJpYXQiOjE3NzE0MzE2NjksImVtYWlsIjoiYWxleGFuZGVyQHByb2plY3RzZW5hLmNvbSIsInBob25lIjoiIiwiYXBwX21ldGFkYXRhIjp7InByb3ZpZGVyIjoiZW1haWwiLCJwcm92aWRlcnMiOlsiZW1haWwiXX0sInVzZXJfbWV0YWRhdGEiOnsiZW1haWxfdmVyaWZpZWQiOnRydWV9LCJyb2xlIjoiYXV0aGVudGljYXRlZCIsImFhbCI6ImFhbDEiLCJhbXIiOlt7Im1ldGhvZCI6InBhc3N3b3JkIiwidGltZXN0YW1wIjoxNzcxNDMxNjY5fV0sInNlc3Npb25faWQiOiI2NTYyYmZiZS05OTY3LTQ4OTAtODZkOS00M2RiMzk0N2M1ZjAiLCJpc19hbm9ueW1vdXMiOmZhbHNlfQ.iaRt8ke8j6YzuX7C3iQkzibZlnpYoXBx5oq-xSOnHDqG38xzBU2fGShwgtFUA1QD0CfXads6_h7_84GBVTaxTA"; 

    const res = await request(app)
        .get('/api/clients/all')
        .set('Authorization', `Bearer ${tokenDePrueba}`); // Enviamos el token

    expect(res.statusCode).toBe(200);
});

    test('Ruta inexistente debería devolver 404', async () => {
        const res = await request(app).get('/api/ruta-que-no-existe');
        expect(res.statusCode).toBe(404);
    });
});