require("dotenv").config();
const { createClient } = require("@supabase/supabase-js");

// Initializ supabase client
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY
);

// function to check the connection
async function checkConnection() {
    try {
        const { error } = await supabase.from("tipo_empleado")
        .select("*").limit(1);
        if (error) {
            console.error("Error a conectar a supabase:", error.message);
            return false;
        }
        console.log("conectado a supabase exitosamente");
        return true;
    } catch (err) {
        console.error("Error inesparado al conectar supabase:", err.message);
        return false;        
    }
}

module.exports = { supabase, checkConnection };
