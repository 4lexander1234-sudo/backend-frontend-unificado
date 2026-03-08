const request = require("supertest");
const { createApp } = require("../config/app.js");

const app = createApp();

describe("Pruebas integrales del modulo proveedor", () => {
    let token;
    let idProveedorPrueba;

    // Antes de todas las pruebas, obtenemos un token válido
    beforeAll(async () => {
        const loginRes = await request(app)
            .post("/api/auth/login")
            .send({
                email: "alexander@projectsena.com",
                password: "Jagami56922"
            });
        token = loginRes.body.access_token;
    });

    // 1. PRUEBA DE SEGURIDAD
    test("Error 401 - No debería permitir acceso sin token", async () => {
        const res = await request(app).get("/api/proveedor/all");
        expect(res.statusCode).toBe(401)
    });

    // 2. PRUEBA DE CREACIÓN (Vía API con Token)
    test('POST /api/proveedor/create -Debe registrar un proveedor con especificaciones detalladas', async () => {
        const proveedorPrueba = {
                nombre_proveedor: 'Electrónicos del Centro S.A.S.',
                nit_rut: '900.456.789-1',
                categoria: "repuestos y accesorios",
                nombre_contacto: "Ing. Roberto Forero",
                telefono: '018254433',
                email: '2distribucion@eleccentro.com.co',
                direccion: 'Calle 13 # 5-40, Chía, Cundinamarca', 
                ciudad: 'chia',     
                pais: 'Colombia',
                sitio_web: 'www.eleccntro.com.co' 
        };

        const res = await request(app)
            .post("/api/proveedor/create") 
            .set("Authorization", `Bearer ${token}`) // Enviamos el token de seguridad
            .send(proveedorPrueba);

        if(res.statusCode !== 201){
            console.log("respuesta del servidor:", res.body);
        }
        expect(res.statusCode).toBe(201);
        expect(res.body.id_proveedor).toBeDefined(); 
        console.log("ID generado correctamente:", res.body.id_proveedor);
        console.log("Proveedor registrado exitosamente vía API");
        idProveedorPrueba = res.body.id_proveedor;
    });

    test("GET /api/proveedor/all - deberia obtener una lista de proveedores", async () => {
            const res = await request(app)
            .get("/api/proveedor/all")
            .set("Authorization", `Bearer ${ token}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);   
        });
    
        // Prueba de actualizacion de proveedor //
        test("PUT /api/proveedor/update - deberia editar el proveedor creado", async ()=> {
            const proveedorActualizado = {
                nombre_proveedor: 'Electrónicos del Centro S.A.S.',
                nit_rut: '901.254.755-9',
                categoria: "repuestos y accesorios",
                nombre_contacto: "Ing. Roberto Forero",
                telefono: '018254433',
                email: '2distribucion@eleccentro.com.co',
                direccion: 'Calle 13 # 5-40, Chía, Cundinamarca', 
                ciudad: 'chia',     
                pais: 'Colombia',
                sitio_web: 'www.eleccntro.com.co' 
            };
            const res = await request(app)
            .put(`/api/proveedor/update/${ idProveedorPrueba }`)
            .set("Authorization", `Bearer ${ token}`)
            .send(proveedorActualizado);
            expect(res.statusCode).toBe(200);
        });
    
        // Prueba de eliminacion de proveedor // 
        test("DELETE /api/proveedor/delete - deberia eliminar el proveedor creado", async () => {
            const res = await request(app)
            .delete(`/api/proveedor/delete/${idProveedorPrueba}`)
            .set("Authorization", `Bearer ${ token }`);
            expect(res.statusCode).toBe(204);
        });
    
});