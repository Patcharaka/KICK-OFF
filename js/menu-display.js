// ===================================
// KICK-OFF MENU DISPLAY
// เลือกขนาดแก้วและระดับความหวาน
// ===================================

const menuList = document.getElementById("menu-list");

function displayMenu() {
  if (!menuList) return;

  menuList.innerHTML = "";

  MENU_ITEMS.forEach(function(item) {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const english = document.createElement("p");
    english.textContent = item.englishName || "";

    const description = document.createElement("p");
    description.textContent = item.description || "";

    card.appendChild(name);
    card.appendChild(english);
    card.appendChild(description);

    const availableSizes = Object.keys(item.prices || {});

    const price = document.createElement("p");
    price.className = "product-price";

    if (availableSizes.length > 0 && item.available !== false) {
      price.textContent = availableSizes.map(function(size) {
        return size + " : " + item.prices[size] + " บาท";
      }).join(" / ");
    } else {
      price.textContent = "สอบถามราคา";
      card.appendChild(price);
      menuList.appendChild(card);
      return;
    }

    card.appendChild(price);

    // เลือกขนาดแก้ว
    const sizeLabel = document.createElement("label");
    sizeLabel.textContent = "เลือกขนาดแก้ว";

    const sizeSelect = document.createElement("select");

    availableSizes.forEach(function(size) {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size + " - " + item.prices[size] + " บาท";
      sizeSelect.appendChild(option);
    });

    card.appendChild(sizeLabel);
    card.appendChild(sizeSelect);

    // เลือกระดับความหวาน
    if (item.sweetness) {
      const sweetLabel = document.createElement("label");
      sweetLabel.textContent = "เลือกระดับความหวาน";

      const sweetSelect = document.createElement("select");

      SWEETNESS_OPTIONS.forEach(function(sweet) {
        const option = document.createElement("option");
        option.value = sweet.value;
        option.textContent = sweet.label;
        sweetSelect.appendChild(option);
      });

      card.appendChild(sweetLabel);
      card.appendChild(sweetSelect);

      // ปุ่มเพิ่มลงตะกร้า
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.textContent = "เพิ่มลงตะกร้า";

      addButton.addEventListener("click", function() {
        addToCart(
          item.id,
          sizeSelect.value,
          Number(sweetSelect.value)
        );

        alert("เพิ่ม " + item.name + " ลงตะกร้าแล้ว");
      });

      card.appendChild(addButton);
    } else {
      const addButton = document.createElement("button");
      addButton.type = "button";
      addButton.textContent = "เพิ่มลงตะกร้า";

      addButton.addEventListener("click", function() {
        addToCart(item.id, sizeSelect.value, 0);
        alert("เพิ่ม " + item.name + " ลงตะกร้าแล้ว");
      });

      card.appendChild(addButton);
    }

    menuList.appendChild(card);
  });
}

displayMenu();
