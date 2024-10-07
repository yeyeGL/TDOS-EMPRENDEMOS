import { useForm }  from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";;
import { MdVisibility, MdVisibilityOff,MdOutlinePassword,MdOutlineEmail } from "react-icons/md";
import { useState } from "react";

const Register = () => {
  const redirect = useNavigate();

  const [showPassword, setShowPassword] = useState(false); 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await axios.post("http://localhost/3000/register", data);
      console.log(res.data);
      reset();
      redirect("/");
    } catch (error) {
      console.log("Error", error);
    }
  });

  const errorMessages = Object.values(errors).map((error) => error.message);

  return (
    <section className="min-h-screen bg-green-500 flex items-center justify-center p-6 animate-jump animate-once animate-duration-[3000ms] animate-delay-[2000ms]">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-green-600 mb-4">
          Registro
        </h1>
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
          <div className="flex items-center border-b border-green-300 pb-2">
          <FaRegUserCircle className="text-green-600 mr-2" />
            <input
              {...register("name", {
                required: "Nombre requerido",
                minLength: {
                  value: 2,
                  message: "El nombre debe contener al menos 2 caracteres",
                },
                maxLength: 20,
              })}
              placeholder="Nombre"
              className="placeholder-gray-400 bg-transparent outline-none flex-1"
            />
          </div>

          <div className="flex items-center border-b border-green-300 pb-2">
          <MdOutlineEmail  className="text-green-600 mr-2"/>
            <input
              type="email"
              {...register("email", {
                required: "Email requerido",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Email invalido",
                },
              })}
              placeholder="Email"
              className="placeholder-gray-400 bg-transparent outline-none flex-1"
            />
          </div>

          <div className="flex items-center border-b border-green-300 pb-2 relative">
          <MdOutlinePassword className="text-green-600 mr-2" />
            <input
              type={showPassword ? "text" : "password"} 
              {...register("password", {
                required: "Contraseña requerida",
                minLength: {
                  value: 6,
                  message: "La contraseña debe contener al menos 6 caracteres",
                },
              })}
              placeholder="Contraseña"
              className="placeholder-gray-400 bg-transparent outline-none flex-1"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-4 top-2 text-green-600"
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>

          {errorMessages.length > 0 && (
            <div className="bg-green-100 text-red-600 font-bold rounded-lg p-2">
              {errorMessages.map((msg, index) => (
                <p key={index} className="text-sm">{msg}</p>
              ))}
            </div>
          )}

          <button className="py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition duration-300">
            Registrar
          </button>
        </form>
        <p className="text-center text-green-600 mt-4">
          ¿Ya tienes una cuenta? <a href="/" className="font-bold underline">Inicia sesion aqui</a>
        </p>
       
      </div>
    </section>
  );
};

export default Register;
