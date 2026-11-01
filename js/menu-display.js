// ===================================
// KICK-OFF MENU DISPLAY
// ระบบแสดงรายการเครื่องดื่ม
// ===================================

const menuList = document.getElementById("menu-list");

function displayMenu() {
  if (!menuList) {
    console.error("ไม่พบพื้นที่แสดงเมนู");
    return;
  }

  menuList.innerHTML = "";

  MENU_ITEMS.forEach(function(item) {
    const card = document.createElement("article");
    card.className = "product-card";

    const name = document.createElement("h3");
    name.textContent = item.name;

    const englishName = document.createElement("p");
    englishName.textContent = item.englishName || "";

    const description = document.createElement("p");
    description.textContent = item.description || "";

    const price = document.createElement("p");

    const prices = Object.entries(item.prices || {});

    if (prices.length > 0 && item.available !== false) {
      price.textContent = prices
        .map(function(entry) {
          return entry[0] + " : " + entry[1] + " บาท";
        })
        .join(" / ");
    } else {
      price.textContent = "สอบถามราคา";
    }

    price.className = "product-price";

    card.appendChild(name);
    card.appendChild(englishName);
    card.appendChild(description);
    card.appendChild(price);

    menuList.appendChild(card);
  });
}

displayMenu();
