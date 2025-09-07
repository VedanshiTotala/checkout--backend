# Checkout System Backend

## 🚀 Overview

This project implements a **checkout/cart system** with discounts and promotions.  
Built using **Node.js, Express, TypeScript, Sequelize, and SQLite**.

---

## 🛠️ Features

- Add products to the cart (per user)
- View cart with discounts applied (per user)
- Remove all items from the cart (per user)
- Product & basket-level discounts

---

## 📦 Products

| Item | Price |
| ---- | ----- |
| A    | ₹30   |
| B    | ₹20   |
| C    | ₹50   |
| D    | ₹15   |

---

## 🎁 Promotions

- **3 of Item A → ₹85**
- **2 of Item B → ₹35**
- **Basket > ₹150 → ₹20 off**

---

## 🔗 API Endpoints

### 1. Get all products

**GET** `/products`
_Response:_

```json
[
  { "id": 1, "name": "A", "price": 30 },
  { "id": 2, "name": "B", "price": 20 },
  { "id": 3, "name": "C", "price": 50 },
  { "id": 4, "name": "D", "price": 15 }
]
```

### 2. Add item to cart (per user)

**POST** `/cart/add/{userId}`

Body:

```json
{
  "productId": 1,
  "quantity": 2
}
```

### 3. View cart (per user)

**GET** `/cart/view/{userId}`

_Response:_

```json
{
  "items": [
    {
      "product": "A",
      "quantity": 3,
      "unitPrice": 30,
      "totalBeforeDiscount": 90,
      "discount": 5,
      "totalAfterDiscount": 85
    }
  ],
  "totalPrice": 85,
  "totalDiscount": 5
}
```

### 4. Clear cart (per user)

**DELETE** `/cart/clear/{userId}`

---

## 🧑‍💻 Usage

- Each user is identified by a `userId` in the URL path for all cart operations.
- All cart actions are isolated per user.

---

## 🛠️ Dev Setup

- Node.js (v16+ recommended)
- npm
- Clone repo, run `npm install`, then `npx sequelize-cli db:migrate && npm start`
- Use Postman/curl to test endpoints
