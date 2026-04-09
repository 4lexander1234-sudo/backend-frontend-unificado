// repositories/ClientRepository.js
const { supabase } = require("../config/db");

class ClientRepository {
  async findAll() {
    const { data, error } = await supabase.from("cliente").select("*").order("id", { ascending: false});
    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("cliente")
      .select("*")
      .eq("id", id);
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data || null;
  }

  async findByEmail(email) {
    const { data, error } = await supabase
      .from("cliente")
      .select("*")
      .eq("email", email);
    if (error) throw new Error(error.message);
    return data || null;
  }

  async create(payload) {
    try{
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
          acepto_contacto: payload.acepto_contacto
        }
    }
  });

  if (error) throw error; // Lanza el error para capturarlo en el catch

    console.log("¡Cliente y Auth creados con éxito!");
    return data.user;

  } catch (error) {
    console.error("Error en el registro de ElectroGestión:", error.message);
    return error.message;
  }
}

  async update(id, payload) {
    const { data, error } = await supabase
      .from("cliente")
      .update(payload)
      .eq("id", id);
    if (error) throw new Error(error);
    return data;
  }

  async delete(id) {
    const { error } = await supabase.from("cliente").delete().eq("id", id).single();
    if (error) throw new Error(error.message);
    return true;
  }
}

module.exports = new ClientRepository();