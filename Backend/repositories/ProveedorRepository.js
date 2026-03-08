// repositories/ProveedorRepository.js
const { supabase } = require("../config/db");

class ProveedorRepository {
  async findAll() {
    const { data, error } = await supabase.from("proveedor").select("*").order("id_proveedor", { ascending: false});
    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("proveedor")
      .select("*")
      .eq("id_proveedor", id);
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data || null;
  }

  async create(payload) {
    const { data, error } = await supabase
      .from("proveedor")
      .insert([payload])
      .select();
    if (error){
      const err = new Error(error.message);
      err.code = error.code;
      err.details = error.details;
      err.hint = error.hint;
      throw err;
    }
    return data[0];
  }

  async update(id, payload) {
    const { data, error } = await supabase
      .from("proveedor")
      .update(payload)
      .eq("id_proveedor", id);
    if (error) throw new Error(error);
    return data;
  }

  async delete(id) {
    const { error } = await supabase.from("proveedor").delete().eq("id_proveedor", id).single();
    if (error) throw new Error(error.message);
    return true;
  }
}

module.exports = new ProveedorRepository();