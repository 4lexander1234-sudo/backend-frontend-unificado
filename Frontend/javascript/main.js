  const category =[
        { nombre: "Smartphones", marcas: "iPhone, Samsung, Huawei y más", cantidad: "150+ productos", icono: `<i class="bi-01 bi-phone"></i>`},
        { nombre: "Laptops", marcas: "Dell, HP, Lenovo, Apple y más", cantidad: "80+ productos", icono:`<i class="bi-02 bi-pc-display-horizontal"></i>`},
        { nombre: "Monitores", marcas: "Gaming, profesionales, 4K y más", cantidad: "60+ productos", icono:`<i class="bi-03 bi-display"></i>`},
        { nombre: "Audio", marcas: "Audífonos, parlantes, sistemas y más", cantidad: "120+ productos", icono:`<i class="bi-04 bi-headphones"></i>`},
        { nombre: "Fotografía", marcas: "Cámaras, lentes, accesorios y más", cantidad: "45+ productos", icono:`<i class="bi-05 bi-camera"></i>`},
        { nombre: "Gaming", marcas: "Consolas, accesorios, PCs y más", cantidad: "90+ productos", icono:`<i class="bi-06 bi-controller"></i>`},
        { nombre: "TV & Streaming", marcas: "Smart TV, streaming, audio y más", cantidad: "35+ productos", icono:`<i class="bi-07 bi-tv"></i>`},
        { nombre: "Componentes", marcas: "RAM, SSD, fuentes, placas y más", cantidad: "200+ productos", icono:`<i class="bi-08 bi-device-hdd"></i>`}
    ];
    const contenedor = document.getElementById("categories");

category.forEach(cat => {
  const div = document.createElement("div");
  div.classList.add("category");
  div.innerHTML = `
    ${cat.icono}
    <h3 class="brand">${cat.nombre}</h3>
    <p class="srv-message"> ${cat.marcas}</p>
    <p class="cant">${cat.cantidad}</p>
    <button class="button-product">Ver Productos</button>
  `;
  contenedor.appendChild(div);
});

const products = [
{nombre: "Lavadoras", icono: "<img class='img1' src='/img/washing-machine.png' alt='Lavadoras' tabindex='0'>"},
{nombre: "Neveras", icono: "<img class='img2' src='/img/freezer.png' alt='Neveras'>"},
{nombre: "Televisores", icono: "<img class='img3' src='/img/smart.png' alt='Televisores'>"},
{nombre: "Equipos de audio", icono: "<img class='img4' src='/img/mixing-table.png' alt='Equipos de audio'>"},
{nombre: "Calentadores", icono: "<img class='img5' src='/img/gas-heater.png' alt='Calentadores'>"},
{nombre: "Estufas", icono: "<img class='img6' src='/img/gas-stove.png' alt='Estufas'>"},
{nombre: "Aire acondicionado", icono: "<img class='img7' src='/img/air-conditioner.png' alt='Aire acondicionado'>"},
{nombre: "Computadores", icono: "<img class='img8' src='/img/computer.png' alt='Computadores'>"},
]

const con = document.getElementById("cont-services-group");

products.forEach(pro =>{
    const div1 =document.createElement("div");
    div1.classList.add("service-product");
    div1.innerHTML=`
    ${pro.icono}
    <h3>${pro.nombre}</h3>
    `;
    con.appendChild(div1);
})

