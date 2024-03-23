import express from "express";
import ProductManager from "../dao/manager/productManager.js";

const productRouter = express.Router();
const productManager = new ProductManager();

productRouter.get("/", async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.readProducts();

        if (limit) {
            const limitedProducts = products.slice(0, limit);
            return res.json(limitedProducts);
        }
        return res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al recibir productos");
    }
});

productRouter.get("/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById({_id:pid});
        if (product) {
            res.json(product);
        } else {
            res.status(404).send("Producto no encontrado");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al recibir el ID del producto");
    }
});

productRouter.get("/brand/:brand", async (req, res) => {
    try {
        const { brand } = req.params;
        const products = await productManager.getByBrand(brand);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener productos por marca");
    }
});

productRouter.post("/post", async (req, res) => {
    try {
        const { title, description, price, thumbnail, code, stock, status = true, category, brand } = req.body; 
        const product = await productManager.addProduct(title, description, price, thumbnail, code, stock, status, category, brand); 
        res.json(product); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al agregar producto");
    }
});

productRouter.put("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        const { title, description, price, thumbnail, code, stock, status = true, category, brand } = req.body; 
        await productManager.updateProduct(pid, { title, description, price, thumbnail, code, stock, status, category, brand }); 
        res.send("Producto actualizado correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al actualizar producto");
    }
});

productRouter.delete("/:pid", async (req, res) => {
    const { pid } = req.params;

    try {
        await productManager.deleteProductById(pid);
        res.send("Producto eliminado correctamente");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al eliminar producto");
    }
});

export { productRouter };