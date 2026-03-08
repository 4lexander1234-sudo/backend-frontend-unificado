const request = require("supertest");
const { createApp } = require("../config/app.js");

const app = createApp();

describe("Pruebas integrales del modulo empleados", ()=>{
let token;
let idEmpleadoPrueba;

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

    // Prueba de seguridad, obetener empleado sin token //
    test("Error 401- No deberia permitir acceso sin token", async () => {
        const res = await request(app)
        .get("/api/clients/all");
        expect(res.statusCode).toBe(401);
    });

    // Prueba de creacion de empleado
    test(" POST /api/employe - deberia crear un nuevo empleado", async ()=>{
        const nuevoEmpleado = {
            nombre: "Empleado de Prueba",
            apellido: "Test",
            tipo_documento: "Cedula de Ciudadania",
            numero_documento: "1234567890",
            email: "emailPrueba@prueba.com",
            telefono: "3001234567",
            direccion: "Una Direccion de Prueba",
            fecha_registro: new Date().toISOString()
        };
        const res = await request(app)
        .post("/api/employe/create")
        .set("Authorization", `Bearer ${token}`)
        .send(nuevoEmpleado);
        expect(res.statusCode).toBe(201);
        console.log("CUERPO RECIBIDO:", res.body);
        expect(res.body).toHaveProperty("id_empleado");
        idEmpleadoPrueba = res.body.id_empleado;
    });

    // Prueba de Obtencion de empleado//
    test("GET /api/employe eberia obtener una lista de empleados", async () => {
        const res = await request(app)
        .get("/api/employe/all")
        .set("Authorization", `Bearer ${ token}`);
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);   
    });

    // Prueba de actualizacion de empleados //
    test("PUT /api/employe/update - deberia editar el empleado creado", async ()=> {
        const empleadoActualizado = {
            nombre: "empleado Actualizado",
            apellido: "Test",
            tipo_documento: "Cedula de Ciudadania",
            numero_documento: "1111111111111",
            email: "updatePrueba@prueba.com",
            telefono: "00000000000",
            direccion: "Una Direccion de Prueba",
            fecha_registro: new Date().toISOString()
        };
        const res = await request(app)
        .put(`/api/employe/update/${ idEmpleadoPrueba }`)
        .set("Authorization", `Bearer ${ token}`)
        .send(empleadoActualizado);
        expect(res.statusCode).toBe(200);
    });

    // Prueba de eliminacion de empleados // 
    test("DELETE /api/employe/delete - deberia eliminar el empleado creado", async () => {
        const res = await request(app)
        .delete(`/api/employe/delete/${idEmpleadoPrueba}`)
        .set("Authorization", `Bearer ${ token }`);
        expect(res.statusCode).toBe(204);
    });

});