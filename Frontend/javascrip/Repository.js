class ClienteRepositorio {
  constructor() {}
  //metodo para guardar clientes
  async guardar(cliente) {
    try {
    const response = await fetch("/api/clients/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(cliente)
    });

    if (response.status === 409) {
      throw new Error("Email ya registrado");
    }
    if (!response.ok) {
      throw new Error("Error al guardar cliente: " + response.status);
    }

    const data = await response.json();
    console.log(data);
    console.log("Cliente guardado:", data);
    return {data};
  } catch (error) {
    console.error("Hubo un problema:", error.message);
    return {error};
  }
  }

  //metodo para actualizar clientes
  async actualizar(id, cliente) {
    try {
    const response = await fetch(`/api/clients/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer  ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify(cliente)
    });

    if (!response.ok) {
      throw new Error("Error al actualizar cliente: " + response.status);
    }

    const data = await response.json();
    console.log("Cliente actualizado:", data);
    return {data};
  } catch (error) {
    console.error("Hubo un problema:", error);
    return {error};
  }
  }

  //metodo para eliminar clientes
  async eliminar(id) {
  try {
    const response = await fetch(`/api/clients/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    });

    // Verificar si la respuesta fue exitosa
    if (!response.ok) {
      // Intentar leer el cuerpo de error si existe
      let errorMsg = "Error en la petición: " + response.status;
      try {
        const errData = await response.json();
        errorMsg = errData.message || errorMsg;
      } catch (_) {
        // si no hay cuerpo, usar el mensaje por defecto
      }
      throw new Error(errorMsg);
    }

    // Manejar el caso de 204 No Content (DELETE exitoso sin cuerpo)
    let data = null;
    if (response.status !== 204) {
      data = await response.json();
    }

    console.log("Cliente eliminado:", data);
    return { data, error: null };
  } catch (error) {
    console.error("Error al eliminar:", error);
    return { data: null, error };
  }
}


  //metodo para obtener todos los clientes
  async obtenerTodos() {
  try {
    const response = await fetch("/api/clients/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        //token en la cabecera Authorization
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      }
    });

    if (!response.ok) {
      throw new Error("Error en la petición: " + response.status);
    }

    const data = await response.json();
    return {data};
  } catch (error) {
    console.error("Error:", error);
    return {error};
  }
  }

}