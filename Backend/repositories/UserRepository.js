const { supabase } = require("../config/db");

class UserRepository {
  async findAll() {
    const { data, error } = await supabase.from("usuario_sistema").select("*");
    if (error) throw new Error(error.message);
    return data;
  }

  //metodo para consultar por id
async findById(id) {
    const { data, error } = await supabase
        .from("usuario_sistema")
        .select("name, email, rol")
        .eq("id_usuario", id)
        .single();
    if (error && error.code !== "PGRST116") throw new Error(error.message);
    return data || null;
    }
}
module.exports = new UserRepository();