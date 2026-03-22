const btnlogin = document.getElementById("btnlogin");
const formlogin =document.getElementById("form-login");

// evento click
if (btnlogin) {
    console.log("¡Botón encontrado con éxito!");
    btnlogin.addEventListener("click", () => {
        console.log("Click detectado, redirigiendo...");
        window.location.href = "/Registration.html";
    });
} else {
    console.error("Error: No se encontró ningún elemento con el ID 'btnlogin'. Revisa tu HTML.");
}
// validar el email/password del usuario
 async function login(e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value.trim();
    
    try {
    // 1. Petición de login
      const loginResponse = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: pass
        })
      });

      if (!loginResponse.ok) {
        throw new Error("Error en login: " + loginResponse.status);
      }

      const loginData = await loginResponse.json();
      console.log("Respuesta del servidor (login):", loginData);

      // Guardar token en sessionStorage
      sessionStorage.setItem("token", loginData.access_token);

      // 2. Petición para obtener datos del usuario
      const userResponse = await fetch(`/api/user/${loginData.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${loginData.access_token}`
        }
      });

      if (!userResponse.ok) {
        throw new Error("Error al obtener usuario: " + userResponse.status);
      }

      const userData = await userResponse.json();
      console.log("Datos del usuario:", userData);
      sessionStorage.setItem("rol", userData.rol);

      // damos acceso por el rol
    if (userData.rol === "Admin") {
      window.location.href = "/index/admin.html";
    } else {
      window.location.href = "/index/index.html";
    }

    } catch (error) {
      console.error("Error en la petición:", error);
      loginAlerta("error en credenciales, verifica email y/o password", "danger");
    }
  }

  function loginAlerta(mensaje, tipo = "success") {
    const infoLogin = document.getElementById("info-login");

    infoLogin.innerHTML = "";
    infoLogin.style.display = "flex";
    const message = document.createElement("p");
    message.className = `alert-${tipo}`;
    message.textContent = mensaje;
    infoLogin.appendChild(message);
    setTimeout(() => {
      infoLogin.style.display = "none";
      infoLogin.innerHTML = "";
    }, 5000);
  }



