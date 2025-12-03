import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { alertaGeneral, alertaRedireccion } from "../../utils/alertas";
import { useState, useEffect } from "react";
import { generarToken } from "../../utils/generadores";
import { guardarLocalStorage } from "../../utils/local-storage";
import { endpoints } from "../../api/servicios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  function getUsuarios() {
    fetch(endpoints.users)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsuarios(data);
      });
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  let redirection = useNavigate();
  function iniciarSesion() {
    if (email == "correo@correo.com" && password == "root") {
      let token = generarToken();
      guardarLocalStorage("token", token);
      alertaRedireccion("Bienvenido", "success", "/admin", redirection);
    } else {
      alertaGeneral("Error", "Usuario y/o contraseña incorrecto", "error");
    }
  }
  return (
    <form className="form">
      <p className="form-title">Iniciar Sesión</p>
      <div className="input-container">
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          type="email"
        />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <div className="input-container">
        <input
          onChange={(e) => setPasword(e.target.value)}
          placeholder="Enter password"
          type="password"
        />
        <span>
          <svg
            stroke="currentColor"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
            <path
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              stroke-width="2"
              stroke-linejoin="round"
              stroke-linecap="round"
            ></path>
          </svg>
        </span>
      </div>
      <button onClick={iniciarSesion} className="submit" type="button">
        Login
      </button>

      <p className="signup-link">
        No tiene una cuenta?
        <Link to="/registro">Crear una cuenta</Link>
      </p>
    </form>
  );
};

export default Login;
