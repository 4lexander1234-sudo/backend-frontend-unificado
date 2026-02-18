const input = document.getElementById("tipo_doc");
    const opciones = document.getElementById("opciones");

    // Mostrar menú al hacer clic en el input
    input.addEventListener("click", () => {
      opciones.style.display = "block";
    });

    // Asignar evento a cada opción
    document.querySelectorAll("#opciones div").forEach(opcion => {
      opcion.addEventListener("click", () => {
        input.value = opcion.textContent; // asigna el texto de la opcion al input
        opciones.style.display = "none";    // cierra el menú
      })
    });

     // Cerrar menú si se hace clic fuera
    document.addEventListener("click", (event) => {
      if (!opciones.contains(event.target) && event.target !== input) {
        opciones.style.display = "none";
      }
    });

