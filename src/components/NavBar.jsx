import {Navbar,NavbarBrand,NavbarContent,NavbarItem,Link,Input,DropdownItem,DropdownTrigger,Dropdown,
DropdownMenu,Avatar} from "@nextui-org/react";

import { AcmeLogo } from "../assets/AcmeLogo.jsx";
import { SearchIcon } from "../assets/SearchIcon.jsx";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const redirect = useNavigate();

  const handleNavigate = (path) => {
    redirect(path);
  };

  return (
    <Navbar className="bg-green-700 shadow-2xl mt-4 mx-auto max-w-[95%] rounded-md">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <AcmeLogo />
          <p className="hidden sm:block font-bold text-inherit text-white">TdoS Emprendemos</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-3">
          <NavbarItem><Link className="font-semibold text-white" href="#">Productos</Link></NavbarItem>
          <NavbarItem><Link className="font-semibold text-white" href="#">Categorias</Link></NavbarItem>
          <NavbarItem><Link className="font-semibold text-white" href="#">Noticias</Link></NavbarItem>
        </NavbarContent>

      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[10rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-white ",
          }}
          placeholder="Buscar ..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="primary"
              name="Profile"
              size="sm"
              src=""
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Nombre de la cuenta</p>
              <p className="font-semibold">Correo de la cuentaa</p>
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigate('/perfil')}>Mi perfil</DropdownItem>
            <DropdownItem onClick={() => handleNavigate('/confi')}>Configuraciones</DropdownItem>
            <DropdownItem onClick={() => handleNavigate('/noticias')}>Noticias</DropdownItem>
            <DropdownItem onClick={() => handleNavigate('/comentarios')}>Comentarios</DropdownItem>
            <DropdownItem onClick={() => handleNavigate('/')}color="danger">Log Out</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBar;
