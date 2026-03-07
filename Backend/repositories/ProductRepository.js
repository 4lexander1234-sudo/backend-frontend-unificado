// repositories/ProductRepository.js
const { supabase } = require("../config/db");

class ProductRepository {
  async findAll() {
    const { data, error } = await supabase.from("producto").select("*").order("id_producto", { ascending: false});
    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("producto")
      .select("*")
      .eq("id_producto", id);
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data || null;
  }

  async create(payload) {
    const { data, error } = await supabase
      .from("producto")
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
      .from("producto")
      .update(payload)
      .eq("id_producto", id);
    if (error) throw new Error(error);
    return data;
  }

  async delete(id) {
    const { error } = await supabase.from("producto").delete().eq("id_producto", id).single();
    if (error) throw new Error(error.message);
    return true;
  }
}

module.exports = new ProductRepository();