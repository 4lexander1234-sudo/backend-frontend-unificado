const btnlogin = document.getElementById("btnlogin");
const btnAccount = document.getElementById("btnAccount");
const passwordInput = document.getElementById("password");
const formulario = document.getElementById("formulario");
const control = document.getElementById("control_password");
const reqLength = document.getElementById("length");
const reqUpper = document.getElementById("uppercase");
const reqNumber = document.getElementById("number");


// evento click 
btnlogin.addEventListener("click", () => {
  window.location.href = "/index/login.html";
});

btnAccount.addEventListener("click", () => {
  window.location.href = "/index/Registration.html";
});

passwordInput.addEventListener("focus",()=>{
  control.classList.add("show");
});

passwordInput.addEventListener("blur", () => {
  if (passwordInput.value.length == 0) {
    control.classList.remove("show");
  }
});

passwordInput.addEventListener("input", () => {
  const value = passwordInput.value;

  // 1. Validar longitud
  if (value.length >= 8) {
      reqLength.classList.replace("invalid", "valid");
  } else {
      reqLength.classList.replace("valid", "invalid");
  }
  // 2. Validar Mayúscula (RegEx: Al menos una A-Z)
  if (/[A-Z]/.test(value)) {
      reqUpper.classList.replace("invalid", "valid");
  } else {
      reqUpper.classList.replace("valid", "invalid");
  }
  // 3. Validar Número (RegEx: Al menos un 0-9)
  if (/[0-9]/.test(value)) {
      reqNumber.classList.replace("invalid", "valid");
  } else {
      reqNumber.classList.replace("valid", "invalid");
  }
});

// 2. VALIDACIÓN FINAL ANTES DEL REGISTRO
formulario.addEventListener("submit", async (e) => {
  e.preventDefault(); // Detiene el envío automático

  const email = document.getElementById("email").value;
  const telefono = document.getElementById("telefono").value;
  // Validación de Email básica (RegEx)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    loginAlerta("El formato de email no es válido.", "danger");
      return;
  }
  // Validación de Teléfono (Solo números, ej: 10 dígitos)
  if (isNaN(telefono) || telefono.length < 7) {
      loginAlerta("Número de teléfono no válido.", "danger");
      return;
  }
  // Si todo está bien, preparamos los datos para el backend
  const cliente = {
      nombre: document.getElementById("nombre").value,
      apellido: document.getElementById("apellido").value,
      tipo_documento: document.getElementById("tipo_doc").value,
      numero_documento: document.getElementById("numero").value,
      email: email,
      telefono: telefono,
      direccion:document.getElementById("direccion").value,
      password: passwordInput.value,
      acepto_contacto: document.getElementById("accept_contact").checked
  };
 
  try {
    const response = await fetch("/api/clients/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(cliente)
    });

    if (response.status === 422) {
      throw new Error("Email ya registrado");
    }
    if (!response.ok) {
      throw new Error("Error al guardar cliente: " + response.status);
    }

    const data = await response.json();
    console.log("Cliente guardado:",data);
    formulario.reset();
    loginAlerta("Registro exitoso!, ya puedes iniciar sesión", "success");
    return {data};
  } catch (error) {
    console.error("Hubo un problema:", error.message);
    loginAlerta("Error en el registro: " + error.message, "danger");
    return {error};
  }

});

function loginAlerta(mensaje, tipo = "success") {
  const infoLogin = document.getElementById("info_registration");
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



