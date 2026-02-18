const { supabase } = require("../config/db");

class DocRepository {
  async findAll() {
    const { data, error } = await supabase.from("tipo_documento").select("*");
    if (error) throw new Error(error.message);
    return data;
  }
}
module.exports = new DocRepository();