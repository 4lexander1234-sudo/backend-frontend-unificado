const request = require("supertest");
const { createApp } = require("../config/app.js");

const app = createApp();

describe("Pruebas integrales del modulo clientes", ()=>{
let token;
let idClientePrueba;

// antes de todas las pruebas, obetenemnos un token valido//
beforeAll(async ()=>{
    const loginRes = await request(app)
    .post("/api/auth/login")
    .send({
        email: "alexander@projectsena.com",
        password: "Jagami56922"
    });
    token = loginRes.body.access_token;
});

    // Prueba de seguridad, obetener clientes sin token //
    test("Error 401- No deberia permitir acceso sin token", async () => {
        const res = await request(app)
        .get("/api/clients/all");
        expect(res.statusCode).toBe(401);
    });

    // Prueba de creacion de cliente//
    test(" POST /api/clients/create - deberia crear un nuevo cliente", async ()=>{
        const nuevoCliente = {
            nombre: "Cliente de Prueba",
            apellido: "Test",
            tipo_documento: "Cedula de Ciudadania",
            numero_documento: "1234567890",
            email: "emailPrueba@prueba.com",
            telefono: "3001234567",
            direccion: "Una Direccion de Prueba",
            fecha_registro: new Date().toISOString()
        };
        const res = await request(app)
        .post("/api/clients/create")
        .set("Authorization", `Bearer ${token}`)
        .send(nuevoCliente);
        expect(res.statusCode).toBe(201);
        console.log("CUERPO RECIBIDO:", res.body);
        expect(res.body).toHaveProperty("id_cliente");
        idClientePrueba = res.body.id_cliente;
    });

    // Prueba de Obtencion de clientes//
    test("GET /api/clients/all - deberia obtener una lista de clientes", async () => {
        const res = await request(app)
        .get("/api/clients/all")
        .set("Authorization", `Bearer ${ token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);   
    });

    // Prueba de actualizacion de clientes //
    test("PUT /api/clients/update - deberia editar el cliente creado", async ()=> {
        const clienteActualizado = {
            nombre: "Cliente Actualizado",
            apellido: "Test",
            tipo_documento: "Cedula de Ciudadania",
            numero_documento: "1111111111111",
            email: "updatePrueba@prueba.com",
            telefono: "00000000000",
            direccion: "Una Direccion de Prueba",
            fecha_registro: new Date().toISOString()
        };
        const res = await request(app)
        .put(`/api/clients/update/${ idClientePrueba }`)
        .set("Authorization", `Bearer ${ token}`)
        .send(clienteActualizado);
        expect(res.statusCode).toBe(200);
    });

    // Prueba de eliminacion de clientes // 
    test("DELETE /api/clients/delete - deberia eliminar el cliente creado", async () => {
        const res = await request(app)
        .delete(`/api/clients/delete/${idClientePrueba}`)
        .set("Authorization", `Bearer ${ token }`);
        expect(res.statusCode).toBe(204);
    });

});