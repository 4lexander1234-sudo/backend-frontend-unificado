class ClienteUtilidades {
  constructor(formId, alertId) {
    this.form = document.getElementById(formId);
    this.info = document.getElementById(alertId);
    this.Id = null;
  }

  mostrarAlerta(mensaje, tipo = "success") {
    this.info.innerHTML = "";
    const msg = document.createElement("p");
    msg.className = `alert-${tipo}`;
    msg.textContent = mensaje;
    this.info.appendChild(msg);
    this.info.style.display = "flex";
    setTimeout(() => {
      this.info.style.display = "none";
      this.info.innerHTML = "";
    }, 5000);
  }

  mostrarFormulario(cliente) {
    this.form.nombre.value = cliente.nombre;
    this.form.apellido.value = cliente.apellido;
    this.form.numero.value = cliente.numero_documento;
    this.form.email.value = cliente.email;
    this.form.telefono.value = cliente.telefono;
    this.form.direccion.value = cliente.direccion;
    this.form.tipo_doc.value = cliente.tipo_documento;
    this.Id = cliente.id_cliente;
  }

  limpiarFormulario() {
    this.form.reset();
    this.Id = null;
  }

}