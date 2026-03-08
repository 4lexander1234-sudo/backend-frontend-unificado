// repositories/EmployeRepository.js
const { supabase } = require("../config/db");

class EmployeRepository {
  async findAll() {
    const { data, error } = await supabase.from("empleado").select("*").order("id_empleado", { ascending: false});
    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id) {
    const { data, error } = await supabase
      .from("empleado")
      .select("*")
      .eq("id_empleado", id);
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data || null;
  }

  async create(payload) {
    const { data, error } = await supabase
      .from("empleado")
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
      .from("empleado")
      .update(payload)
      .eq("id_empleado", id);
    if (error) throw new Error(error);
    return data;
  }

  async delete(id) {
    const { error } = await supabase.from("empleado").delete().eq("id_empleado", id).single();
    if (error) throw new Error(error.message);
    return true;
  }
}

module.exports = new EmployeRepository();