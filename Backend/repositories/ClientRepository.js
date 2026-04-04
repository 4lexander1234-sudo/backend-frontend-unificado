// repositories/ClientRepository.js
const { supabase } = require("../config/db");

class ClientRepository {
  async findAll() {
    const { data, error } = await supabase.from("cliente").select("*").order("id_cliente", { ascending: false});
    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("cliente")
      .select("*")
      .eq("id_cliente", id);
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data || null;
  }

  async create(payload) {
    const { data, error } = await supabase.auth.signUp({
      email: payload.email,
      password: payload.password,
      options: {
        data: {
          nombre:payload.nombre, 
          apellido: payload.apellido,
          tipo_documento: payload.tipo_documento,
          numero_documento:payload.numero_documento,
          email: payload.email,
          telefono: payload.telefono,
          direccion: payload.direccion,
          password: payload.password,
          acepta_contacto: payload.acepto_contacto
        }
    }
  });

  if (error) console.log("Error:", error.message);
  else console.log("¡Cliente creado con éxito!", data.user);
}

  async update(id, payload) {
    const { data, error } = await supabase
      .from("cliente")
      .update(payload)
      .eq("id_cliente", id);
    if (error) throw new Error(error);
    return data;
  }

  async delete(id) {
    const { error } = await supabase.from("cliente").delete().eq("id_cliente", id).single();
    if (error) throw new Error(error.message);
    return true;
  }
}

module.exports = new ClientRepository();