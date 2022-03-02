import express from "express";
import CartItem from "../models/CartItem";

const cartRouter = express.Router();

const cart: CartItem[] = [
  {
    id: 1,
    product: "iPhone",
    price: 999,
    quantity: 9,
  },
  {
    id: 4,
    product: "iPhone",
    price: 2000,
    quantity: 9,
  },
  {
    id: 5,
    product: "iPhone",
    price: 999,
    quantity: 9,
  },
  {
    id: 6,
    product: "iPhone",
    price: 1600,
    quantity: 9,
  },
  {
    id: 2,
    product: "Xbox Series X",
    price: 499,
    quantity: 2,
  },
  {
    id: 3,
    product: "Macbook Pro M1 Pro",
    price: 3000,
    quantity: 4,
  },
];

let newId: number = 6;

cartRouter.get("/cart-items", (req, res) => {
  const { maxPrice, prefix, pageSize } = req.query;
  let filteredCart: CartItem[] = cart;
  if (maxPrice) {
    filteredCart = filteredCart.filter(
      (item) => item.price <= parseInt(maxPrice as string)
    );
  }

  if (prefix) {
    filteredCart = filteredCart.filter(
      (item) => item.product === (prefix as string)
    );
  }

  if (pageSize) {
    filteredCart = filteredCart.filter(
      (item, i) => i + 1 <= parseInt(pageSize as string)
    );
  }

  res.status(200);
  res.json(filteredCart);
});

cartRouter.get("/cart-items/:id", (req, res) => {
  let filteredItem: CartItem[] = cart;
  const index: number = filteredItem.findIndex(
    (item) => item.id === parseInt(req.params.id)
  );
  if (index !== -1) {
    const cartItem = cart[index];
    res.status(200);
    res.json(cartItem);
  } else {
    res.status(404);
    res.send("ID not found");
  }

  res.status(200);
  res.json();
});

cartRouter.post("/cart-items", (req, res) => {
  const newCartItems: CartItem = req.body;
  newCartItems.id = ++newId;

  if (!newCartItems.product || !newCartItems.price || !newCartItems.quantity) {
    res.status(404);
    res.send("Item not created.");
  } else {
    cart.push(newCartItems);

    res.status(201);
    res.json(newCartItems);
  }
});

cartRouter.put("/cart-items/:id", (req, res) => {
  const updatedCartItem: CartItem = req.body;
  const index = cart.findIndex((item) => item.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404);
    res.send("Id not found.");
  } else {
    cart[index] = updatedCartItem;
    res.status(200);
    res.json(updatedCartItem);
  }
});

cartRouter.delete("/cart-items/:id", (req, res) => {
  const index = cart.findIndex((item) => item.id === parseInt(req.params.id));

  if (index === -1) {
    res.status(404);
    res.send("Id not found.");
  } else {
    cart.splice(index, 1);
    res.sendStatus(204);
  }
});

export default cartRouter;
