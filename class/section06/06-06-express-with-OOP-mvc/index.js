// const express = require('express')
import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";

const app = express();

// 상품API
const productController = new ProductController();
app.post("/products/buy", productController.buyProduct);
app.post("/products/refund", productController.refundProduct);

app.listen(3000);
