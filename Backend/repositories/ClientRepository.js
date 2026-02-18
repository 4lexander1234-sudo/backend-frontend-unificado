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
    const { data, error } = await supabase
      .from("cliente")
      .insert([payload]);
    if (error){
      const err = new Error(error.message);
      err.code = error.code;
      err.details = error.details;
      err.hint = error.hint;
      throw err;
    }
    return data;
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