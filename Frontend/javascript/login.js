const btnlogin = document.getElementById("btnlogin");
const formlogin = document.getElementById("form-login");
const container = document.getElementById("home");
const section1 = document.getElementById("section-1");

// agrupar las secciones en un array
const sections = [
  document.getElementById("section-2"),
  document.getElementById("section-3"),
  document.getElementById("section-4"),
  document.getElementById("footer")
];

// función auxiliar para crear inputs
function crearInput(type, name, labelText) {
  const label = document.createElement("label");
  const input = document.createElement("input");

// configurar atributos
  input.id = name;
  input.type = type;
  input.name = name;
  input.required = true;

  // configurar label
  label.htmlFor = input.id;
  label.textContent = labelText;

  return { label, input };
}

// evento click
btnlogin.addEventListener("click", () => {
  
  // ocultar/mostrar secciones
  container.classList.toggle("oculto");
  formlogin.classList.toggle("oculto");
  section1.classList.toggle("height-login");
  sections.forEach(sec => sec.classList.toggle("oculto"));

  if(btnlogin.textContent === "Iniciar Sesion"){
    btnlogin.textContent = "Salir";
  }else{
    btnlogin.textContent = "Iniciar Sesion";
  }

   // construir el formulario
  formlogin.innerHTML = "";
  const form = document.createElement("form");
  form.classList.add("login-form");
  form.id = "form";

  const title = document.createElement("h2");
  title.textContent = "🔐 Iniciar sesión";

  const { label: labelEmail, input: inputEmail } = crearInput("email", "email", "Ingrese su Email:");
  const { label: labelPassword, input: inputPassword } = crearInput("password", "password", "Ingrese su Contraseña:");

  const infoLogin = document.createElement("div");
  infoLogin.classList.add("info-login");
  infoLogin.id = "info-login";

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.id = "btn-inicio";
  submitButton.textContent = "Ingresar";

  // armar el formulario
  form.append(title, labelEmail, inputEmail, labelPassword, inputPassword, infoLogin, submitButton);

  formlogin.appendChild(form);

  inputEmail.value = "alexander@projectsena.com";
  inputPassword.value = "Jagami56922";

  inputEmail.focus();
  form.addEventListener("submit", (e) => login(e));
});

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
      window.location.href = "admin.html";
    } else {
      window.location.href = "index.html";
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



