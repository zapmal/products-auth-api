import Product from "../models/Product";

const createProduct = async (request, response) => {
  const {
    name,
    category,
    price,
    image
  } = request.body;

  try {
    const newProduct = new Product({
      name,
      category,
      price,
      image
    });

    await newProduct.save();

    response
      .status(201)
      .json(newProduct);
  } catch (error) {
    response
      .status(400)
      .json(error);
  }
};

const getProducts = async (request, response) => {
  try {
    const products = await Product.find();

    response.json(products);
  } catch (error) {
    response
      .status(404)
      .json(error);
  }
};

const getProduct = (request, response) => {

};

const updateProduct = (request, response) => {

};

const deleteProduct = (request, response) => {

};

export {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}