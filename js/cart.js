let cart = [];

// เพิ่มสินค้าลงตะกร้า
function addToCart(productId, size, sweetness) {
  const product = getProductById(productId);

  if (!product || product.available === false) {
    alert("สินค้านี้ยังไม่เปิดให้สั่งซื้อ");
    return;
  }

  const price = getProductPrice(productId, size);

  if (price === null) {
    alert("ไม่พบราคาสินค้า");
    return;
  }

  const existingItem = cart.find(item =>
    item.productId === productId &&
    item.size === size &&
    item.sweetness === sweetness
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      productId,
      name: product.name,
      size,
      sweetness,
      price,
      quantity: 1
    });
  }

  renderCart();
}

// เพิ่มจำนวนสินค้า
function increaseQuantity(index) {
  cart[index].quantity += 1;
  renderCart();
}

// ลดจำนวนสินค้า
function decreaseQuantity(index) {
  cart[index].quantity -= 1;

  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
}

// ลบสินค้าออกจากตะกร้า
function removeFromCart(index) {
  cart.splice(index, 1);
  renderCart();
}

// คำนวณยอดรวม
function getCartTotal() {
  return cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

// แสดงรายการสินค้าในตะกร้า
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartCount = document.getElementById("cart-count");

  if (!cartItems || !cartTotal || !cartCount) return;

  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>ยังไม่มีสินค้าในตะกร้า</p>";
  }

  cart.forEach(function(item, index) {
    const row = document.createElement("div");
    const name = document.createElement("p");
    const sweetness = document.createElement("p");
    const price = document.createElement("p");

    name.textContent =
      item.name + " (" + item.size + ")";

    sweetness.textContent =
      "ความหวาน " + item.sweetness + "%";

    price.textContent =
      "ราคา " + (item.price * item.quantity) + " บาท";

    const decreaseButton = document.createElement("button");
    decreaseButton.textContent = "−";
    decreaseButton.type = "button";
    decreaseButton.addEventListener("click", function() {
      decreaseQuantity(index);
    });

    const quantity = document.createElement("span");
    quantity.textContent = " " + item.quantity + " ";

    const increaseButton = document.createElement("button");
    increaseButton.textContent = "+";
    increaseButton.type = "button";
    increaseButton.addEventListener("click", function() {
      increaseQuantity(index);
    });

    const removeButton = document.createElement("button");
    removeButton.textContent = "ลบสินค้า";
    removeButton.type = "button";
    removeButton.addEventListener("click", function() {
      removeFromCart(index);
    });

    row.appendChild(name);
    row.appendChild(sweetness);
    row.appendChild(price);
    row.appendChild(decreaseButton);
    row.appendChild(quantity);
    row.appendChild(increaseButton);
    row.appendChild(removeButton);

    cartItems.appendChild(row);
  });

  cartCount.textContent = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  cartTotal.textContent = getCartTotal() + " บาท";
}
