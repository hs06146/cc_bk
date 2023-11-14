// const express = require('express')
import express from "express";
import { ProductController } from "./mvc/controllers/product.controller.js";
import { CouponController } from "./mvc/controllers/coupon.controller.js";
import { CashService } from "./mvc/controllers/services/cash.service.js";
import { ProductService } from "./mvc/controllers/services/product.service.js";
import { PointService } from "./mvc/controllers/services/point.service.js";
const app = express();

// 의존성 주입으로 발생하는 장점
const productService = new ProductService(); // 1. new 한 번으로 모든 곳에서 재사용 가능(싱글톤패턴, Memory 공간 확보)
const cashService = new CashService(); // 2. 의존성 주입으로 한꺼번에 변경 가능
const pointService = new PointService(); // 3. 의존성 주입으로 쿠폰 구매 방식을 포인트결제로 안전하게 변경 가능.
// [부가설명]
// 1. ProductController가 CashService에 의존하고 있음.(CashService => 의존성)
//    => 이 상황을 "강하게 결합되어있다" 라고 표현
//    => tight-coupling

// 2. 이를 개선하기 위해서 "느슨한 결합"으로 변경할 필요가 있음.
//    => loose-coupling
//    => 이를 "의존성주입"으로 해결(의존성주입: Dependency-Injection, DI)
//    => 이 역할을 대신 해주는 Nestjs 기능 = IoC(Inversion-of-Control) Container(알아서 new 해서 넣어주는 애. 즉, DI 해줌)

// 3. "의존성 주입"으로 "싱글톤패턴" 구현 가능해짐
//    => "의존성주입"이면 "싱글톤패턴"인가? ==> 그건 아님.

// 상품API
const productController = new ProductController(cashService, productService);
app.post("/products/buy", productController.buyProduct); // 상품 구매하기 API
app.post("/products/refund", productController.refundProduct); // 상품 환불하기 API

// 쿠폰(상품권)API
const couponController = new CouponController(cashService);
app.post("/coupons/buy", couponController.buyCoupon); // 상품권을 돈주고 구매하는 API

app.listen(3000);
