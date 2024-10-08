import axios from "axios"; // Import axios
import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Plus, Filter, Trash2, Edit } from "lucide-react";

const Profile = () => {
  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({ price: "", category: "" });
  const [editingProduct, setEditingProduct] = useState(null);

  const { register, handleSubmit, reset } = useForm();

  const handleCreateProduct = async (data) => {
    const file = data.image[0];
    const reader = new FileReader();

    reader.onloadend = async () => {
      const newProduct = {
        title: data.title,
        description: data.description,
        price: parseFloat(data.price),
        category: data.category,
        image: reader.result, 
      };

      try {
        
        const response = await axios.post("http://localhost:3000/api/products",newProduct);
        console.log("Product created:", response.data); 
        setProducts([...products, { ...newProduct, id: response.data.id }]); 
        setShowCreateProduct(false);
        reset();
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleFilter = (data) => {
    setFilter({ price: data.filterPrice, category: data.filterCategory });
    setShowFilter(false);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdate = (data) => {
    const updatedProduct = {
      ...editingProduct,
      title: data.title,
      description: data.description,
      price: parseFloat(data.price),
      category: data.category,
    };
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditingProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesPrice = filter.price
      ? product.price <= parseFloat(filter.price)
      : true;
    const matchesCategory = filter.category
      ? product.category === filter.category
      : true;
    return matchesPrice && matchesCategory;
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center space-x-4 mb-8">
        <div className="bg-green-200 rounded-full p-4">
          <User className="w-12 h-12 text-green-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-green-800">Juan Perez</h2>
          <p className="text-gray-600">juan.perez@ejemplo.com</p>
        </div>
      </div>

      <div className="flex space-x-4 mb-8">
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition-shadow hover:shadow-lg"
          onClick={() => setShowCreateProduct(!showCreateProduct)}
        >
          <Plus className="w-4 h-4 mr-2" /> Crear Producto
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded flex items-center transition-shadow hover:shadow-lg"
          onClick={() => setShowFilter(!showFilter)}
        >
          <Filter className="w-4 h-4 mr-2" /> Filtrar Productos
        </button>
      </div>

      {showCreateProduct && (
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-bold mb-4">Crear Nuevo Producto</h3>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Titulo
            </label>
            <input
              {...register("title", { required: true })}
              id="title"
              type="text"
              placeholder="Titulo del producto"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descripcion
            </label>
            <textarea
              {...register("description", { required: true })}
              id="description"
              placeholder="Descripcion del producto"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio
            </label>
            <input
              {...register("price", { required: true })}
              id="price"
              type="number"
              placeholder="Precio"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Categoria
            </label>
            <select
              {...register("category", { required: true })}
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una categoria</option>
              <option value="Servicio">Servicios</option>
              <option value="Producto">Productos</option>
              <option value="Comida">Comida</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Imagen
            </label>
            <input
              {...register("image", { required: true })}
              id="image"
              type="file"
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
          >
            Crear Producto
          </button>
        </form>
      )}

      {showFilter && (
        <form
          onSubmit={handleSubmit(handleFilter)}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-bold mb-4">Filtrar Productos</h3>
          <div className="mb-4">
            <label
              htmlFor="filterPrice"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio maximo
            </label>
            <input
              {...register("filterPrice")}
              id="filterPrice"
              type="number"
              placeholder="Precio máximo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="filterCategory"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Categoria
            </label>
            <select
              {...register("filterCategory")}
              id="filterCategory"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Todas las categorias</option>
              <option value="Servicio">Servicios</option>
              <option value="Producto">Productos</option>
              <option value="Comida">Comida</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
          >
            Aplicar Filtros
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 transition-transform transform hover:scale-105"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-t-lg mb-2"
            />
            <h4 className="text-lg font-bold">{product.title}</h4>
            <p>{product.description}</p>
            <p className="text-green-600 font-bold">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-600">Categoria: {product.category}</p>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="text-blue-500 hover:underline"
              >
                <Edit className="inline-block w-4 h-4 mr-1" /> Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-red-500 hover:underline"
              >
                <Trash2 className="inline-block w-4 h-4 mr-1" /> Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 transition-transform transform hover:scale-105"
        >
          <h3 className="text-xl font-bold mb-4">Editar Producto</h3>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Título
            </label>
            <input
              {...register("title", { required: true })}
              defaultValue={editingProduct.title}
              id="title"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descripcion
            </label>
            <textarea
              {...register("description", { required: true })}
              defaultValue={editingProduct.description}
              id="description"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio
            </label>
            <input
              {...register("price", { required: true })}
              defaultValue={editingProduct.price}
              id="price"
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Categoría
            </label>
            <select
              {...register("category", { required: true })}
              defaultValue={editingProduct.category}
              id="category"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Selecciona una categoria</option>
              <option value="Servicio">Servicios</option>
              <option value="Producto">Productos</option>
              <option value="Comida">Comida</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
          >
            Actualizar Producto
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
