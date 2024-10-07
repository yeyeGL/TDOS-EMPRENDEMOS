import { useNavigate } from "react-router-dom";
import fondo from "/img/fondov1.png";
import { useForm } from "react-hook-form";
import axios from "axios";

const Login = () => {
  const redirect = useNavigate();

  const {
    register: login,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post("http://localhost/3000/login", data);
      console.log(res.data);
      reset();
      redirect("/home");
    } catch (error) {
      console.log("Error", error);
    }
  });

  const errorMessages = Object.values(errors).map((error) => error.message);

  return (
    <section className="flex h-screen">
      {/* Lado izquierdo */}
      <div className="hidden md:flex flex-1 bg-primary"></div>

      {/* Lado derecho con la imagen de fondo y el formulario centrado */}
      <div
        className="flex flex-1 items-center justify-center bg-cover bg-left-center relative"
        style={{ backgroundImage: `url(${fondo})` }}
      >
        <form
          onSubmit={onSubmit}
          className="form-login"
        >
          <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
            Iniciar Sesion
          </h2>

          <div className="mb-4">
            <input
              type="email"
              {...login("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Email invalido",
                },
              })}
              placeholder="Email"
              className="inputs-login"
            />
          </div>

          <div className="mb-6">
            <input
              type="password"
              {...login("password", {
                required: "Contraseña requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe contener al menos 6 caracteres",
                },
              })}
              placeholder="Contraseña"
              className="inputs-login"
            />
          </div>

          {errorMessages.length > 0 && (
            <div className="mb-4 text-red-600 font-semibold">
              {errorMessages.map((msg, index) => (
                <p key={index}>{msg}</p>
              ))}
            </div>
          )}

          <button
            type="submit"
            className="button-login"
          >
            Iniciar Sesion
          </button>
        </form>
      </div>
    </section>
  );
};

export default Login;
