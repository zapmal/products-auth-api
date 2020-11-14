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

const getProduct = async (request, response) => {
  const id = request.params.id;

  try {
    const product = await Product.findById(id);

    response.json(product);
  } catch (error) {
    response
      .status(404)
      .json(error);
  }
};

const updateProduct = async (request, response) => {
  const id = request.params.id;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, request.body, {
    new: true
    });

    response
      // .status(204)
      .status(200)
      .json(updatedProduct);
  } catch (error) {
    response
      .status(500)
      .json(error);
  }
};

const deleteProduct = async (request, response) => {
  const id = request.params.id;

  try {
    await Product.findByIdAndDelete(id);

    response
    // .status(204)
    .json({
      message: `Product ${id} successfully deleted.`
    });
  } catch (error) {
    response
      .status(404)
      .json(error);
  }
};

export {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
}