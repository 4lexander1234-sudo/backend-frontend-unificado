const btnlogin = document.getElementById("btnlogin");
const formlogin = document.getElementById("form-login");
const content = document.getElementById("contenedor1");
const btnAccount = document.getElementById("btnAccount");
const forgot = document.getElementById("forgot");

// evento click 
btnlogin.addEventListener("click", () => {
  window.location.href = "/index/login.html";
});

btnAccount.addEventListener("click", () => {
  window.location.href = "/index/Registration.html";
});


// validar el email/password del usuario
formlogin.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    loginAlerta("El formato de email no es válido.", "danger");
      return;
  }

  try {
  // 1. Petición de login
    const emailResponse = await fetch(`https://backend-frontend-unificado.onrender.com/api/clients/findByEmail/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    if (!emailResponse.ok) {
      throw new Error("Error en Email: " + emailResponse.status);
    }
    const emailData = await emailResponse.json();
    console.log("Respuesta del servidor (email):", emailData);
  
  if (mailData.email === email) {
    window.location.href = "/index/index.html";
  } else {
    loginAlerta("Error: email no encontrado", "danger");
  }
  } catch (error) {
    console.error("Error en la petición:", error);
    loginAlerta(error.message, "danger");
  }
  });

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