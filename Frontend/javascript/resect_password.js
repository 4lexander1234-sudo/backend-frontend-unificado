const btnlogin = document.getElementById("btnlogin");
const btnAccount = document.getElementById("btnAccount");
const newPassword = document.getElementById("new-password");
const confirmPassword = document.getElementById("confirm-password");
const formulario = document.getElementById("form-new-password");
const control = document.getElementById("control_password");
const reqLength = document.getElementById("length");
const reqUpper = document.getElementById("uppercase");
const reqNumber = document.getElementById("number");

// evento click 
btnlogin.addEventListener("click", () => {
  window.location.href = "/frontend/index/login.html";
});

btnAccount.addEventListener("click", () => {
  window.location.href = "/frontend/index/Registration.html";
});

newPassword.addEventListener("focus",()=>{
  control.classList.add("show");
});

newPassword.addEventListener("blur", () => {
  if (newPassword.value.length == 0) {
    control.classList.remove("show");
  }
});

newPassword.addEventListener("input", () => {
  const value = newPassword.value;

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

  // 1. Validar que no estén vacíos
    if (newPassword.value !== confirmPassword.value) {
        loginAlerta("Las contraseñas no coinciden.", "danger");
        return;
    }else{
      loginAlerta("contrasena actualizada ", "success");
    }
  
  // Aquí iría tu fetch a Render
});

function loginAlerta(mensaje, tipo = "success") {
  const info = document.getElementById("password-error");
  info.innerHTML = "";
  info.style.display = "flex";
  const message = document.createElement("p");
  message.className = `alert-${tipo}`;
  message.textContent = mensaje;
  info.appendChild(message);
  setTimeout(() => {
    info.style.display = "none";
    info.innerHTML = "";
  }, 5000);
}



