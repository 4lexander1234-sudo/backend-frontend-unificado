
const { supabase } = require("../config/db");

// configura la logica de autenticacion
class AuthService {
  async login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error || !data?.session) {
        console.error("Error en login authService:", error.message);
        throw new Error("Credenciales invalidas");
    }
    
    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id
        //email: data.user.email,
        //role: data.user.role,
        //name: data.user.user_metadata?.name || null}
      }
    };
  }
}


module.exports = new AuthService();