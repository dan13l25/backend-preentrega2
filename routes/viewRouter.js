import {Router} from 'express';
import ProductManager from '../dao/manager/productManager';
const pm = new ProductManager()
const routerV=Router()

routerV.get("/", async (req, res) => {
  
    const listadeproductos = await pm.getProducts()
    res.render("product",{listadeproductos})
  
  
  })




export default routerV