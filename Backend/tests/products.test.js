const request = require("supertest");
const { createApp } = require("../config/app.js");

const app = createApp();

describe("Pruebas integrales del modulo productos", () => {
    let token;
    let idProductoPrueba;

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
        const res = await request(app).get("/api/products/all");
        expect(res.statusCode).toBe(401);
    });

    // 2. PRUEBA DE CREACIÓN (Vía API con Token)
    test('POST /api/products/create -Debe registrar un producto con especificaciones detalladas', async () => {
        const pcPrueba = {
            nombre_producto: 'Laptop Dell Vostro 3400',
            descripcion: 'i5-1135G7, 8GB RAM, 256GB SSD. Revisión de hardware inicial.',
            precio: 2450000,
            stock: 3,
            unidad_medida: 'Unidad',
            fecha_ingreso: '2026-03-07',
            id_categoria: 1, 
            id_marca: 4,     
            id_proveedor: 3  
        };

        const res = await request(app)
            .post("/api/products/create") // Asegúrate de que esta sea tu ruta real
            .set("Authorization", `Bearer ${token}`) // Enviamos el token de seguridad
            .send(pcPrueba);

        if(res.statusCode !== 201){
            console.log("respuesta del servidor:", res.body);
        }
        expect(res.statusCode).toBe(201);
        expect(res.body.id_producto).toBeDefined(); 
        console.log("ID generado correctamente:", res.body.id_producto);
        console.log("Producto registrado exitosamente vía API");
        idProductoPrueba = res.body.id_producto;
    });

    test("GET /api/products/all - deberia obtener una lista de productos", async () => {
            const res = await request(app)
            .get("/api/products/all")
            .set("Authorization", `Bearer ${ token}`);
            expect(res.statusCode).toBe(200);
            expect(Array.isArray(res.body)).toBe(true);   
        });
    
        // Prueba de actualizacion de productos //
        test("PUT /api/products/update - deberia editar el producto creado", async ()=> {
            const productoActualizado = {
                nombre_producto: 'Laptop Dell Vostro 3400',
                descripcion: 'i5-1135G7, 8GB RAM, 256GB SSD. Revisión de hardware inicial.',
                precio: 2450000,
                stock: 3,
                unidad_medida: 'Unidad',
                fecha_ingreso: '2026-03-07',
                id_categoria: 1, 
                id_marca: 4,     
                id_proveedor: 3  
            };
            const res = await request(app)
            .put(`/api/products/update/${ idProductoPrueba }`)
            .set("Authorization", `Bearer ${ token}`)
            .send(productoActualizado);
            expect(res.statusCode).toBe(200);
        });
    
        // Prueba de eliminacion de clientes // 
        test("DELETE /api/products/delete - deberia eliminar el producto creado", async () => {
            const res = await request(app)
            .delete(`/api/products/delete/${idProductoPrueba}`)
            .set("Authorization", `Bearer ${ token }`);
            expect(res.statusCode).toBe(204);
        });
    
});