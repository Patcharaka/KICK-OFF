// ===================================
// KICK-OFF SHOPPING CART
// ระบบตะกร้าสินค้า
// ===================================

let cart = [];

function addToCart(productId, size, sweetness) {
  const product = getProductById(productId);

  if (!product) {
    alert("ไม่พบสินค้า");
    return;
  }

  if (product.available === false) {
    alert("สินค้านี้ยังไม่เปิดให้สั่งซื้อ");
    return;
  }

  const price = getProductPrice(productId, size);

  if (price === null) {
    alert("ไม่พบราคาสินค้าขนาดนี้");
    return;
  }

  const existingItem = cart.find(function(item) {
    return item.productId === productId &&
      item.size === size &&
      item.sweetness === sweetness;
  });

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId: productId,
      name: product.name,
      size: size,
      sweetness: sweetness,
      price: price,
      quantity: 1
    });
  }

  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

function getCartTotal() {
  return cart.reduce(function(total, item) {
    return total + item.price * item.quantity;
  }, 0);
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !cartTotal || !cartCount) {
    return;
  }

  cartItems.innerHTML = "";

  cart.forEach(function(item, index) {
    const row = document.createElement("div");

    const name = document.createElement("p");
    name.textContent =
      item.name + " (" + item.size + ") x " + item.quantity;

    const sweetness = document.createElement("p");
    sweetness.textContent = "ความหวาน " + item.sweetness + "%";

    const price = document.createElement("p");
    price.textContent =
      (item.price * item.quantity) + " บาท";

    const removeButton = document.createElement("button");
    removeButton.textContent = "ลบ";
    removeButton.addEventListener("click", function() {
      removeFromCart(index);
    });

    row.appendChild(name);
    row.appendChild(sweetness);
    row.appendChild(price);
    row.appendChild(removeButton);

    cartItems.appendChild(row);
  });

  cartCount.textContent = cart.reduce(function(total, item) {
    return total + item.quantity;
  }, 0);

  cartTotal.textContent = getCartTotal() + " บาท";
}
