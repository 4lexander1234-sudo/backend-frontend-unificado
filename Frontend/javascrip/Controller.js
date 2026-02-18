class ClienteControlador {
  constructor(config) {
    this.repo = new ClienteRepositorio();
    this.ui = new ClienteUtilidades(config.formId, config.alertId);
    this.form = this.ui.form;
    this.contenedor = document.getElementById("datos");

    this.form.addEventListener("submit", (e) => this.guardarCliente(e));
  }

  async guardarCliente(e) {
    e.preventDefault();
    const cliente = new Cliente({
      nombre: this.form.nombre.value,
      apellido: this.form.apellido.value,
      tipo_documento: this.form.tipo_doc.value,
      numero_documento: this.form.numero.value,
      email: this.form.email.value,
      telefono: this.form.telefono.value,
      direccion: this.form.direccion.value
    });

    try {
      let resultado = this.ui.Id
        ? await this.repo.actualizar(this.ui.Id, cliente)
        : await this.repo.guardar(cliente);

      if (resultado.error) throw new Error(resultado.error.message);

      const mensaje = this.ui.Id
        ? "✏️ Cliente actualizado correctamente."
        : "✅ Cliente guardado correctamente.";

      this.ui.mostrarAlerta(mensaje, "success");
      this.ui.limpiarFormulario();
      this.cargarDatos();
    } catch (err) {
      console.error("Error:", err.message);
      this.ui.mostrarAlerta(err.message, "danger");
    }
  }

  async cargarDatos() {
    try {
      const clientes= await this.repo.obtenerTodos();

      this.contenedor.innerHTML = "";
      clientes.data.forEach(cli => {
        const div = document.createElement("div");

        div.innerHTML = `
          <p>🧑‍ ${cli.nombre}</p>
          <p>💼 ${cli.apellido}</p>
          <p>🪪 ${cli.tipo_documento}</p>
          <p>🧾 ${cli.numero_documento}</p>
          <p>📬 ${cli.email}</p>
          <p>📱 ${cli.telefono}</p>
          <p>🏠 ${cli.direccion}</p>
          <p>🗓️ ${cli.fecha_registro}</p>
        `;

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.addEventListener("click", () => this.ui.mostrarFormulario(cli));

        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", () => {
          const confirmar = confirm(`¿Eliminar al cliente ${cli.nombre}?`);
          if (confirmar) this.eliminarCliente(cli.id_cliente);
        });

        div.appendChild(btnEditar);
        div.appendChild(btnEliminar);
        this.contenedor.appendChild(div);
      });
    } catch (err) {
      console.error(err.message);
      this.ui.mostrarAlerta("Token no disponible, inicia sesión nuevamente.", "danger");
    }
  }

  async eliminarCliente(id) {
    try {
      const resultado = await this.repo.eliminar(id);
      if (resultado.error) throw new Error(error.message);
      this.ui.mostrarAlerta(`Cliente con ID ${id} eliminado correctamente.`, "success");
      await this.cargarDatos();
    } catch (err) {
      console.error("Error al eliminar:", err.message);
      this.ui.mostrarAlerta("Falla al eliminar correctamente", "danger");
    }
  }
}

document.addEventListener("DOMContentLoaded",() => {
  // iniciamos el controlador de clientes
  inicio = new ClienteControlador({
    formId: "formulario",
    alertId: "info"
  });
  inicio.cargarDatos();

});