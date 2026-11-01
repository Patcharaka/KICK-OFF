// ===================================
// KICK-OFF MENU DATA
// ===================================

// ระดับความหวาน
const SWEETNESS_OPTIONS = [
  { label: "ไม่หวาน", value: 0 },
  { label: "หวาน 25%", value: 25 },
  { label: "หวาน 50%", value: 50 },
  { label: "หวาน 75%", value: 75 },
  { label: "หวาน 100%", value: 100 }
];

// หมวดหมู่เครื่องดื่ม
const MENU_CATEGORIES = [
  { id: "all", name: "ทั้งหมด" },
  { id: "coffee", name: "กาแฟ" },
  { id: "tea", name: "ชา" },
  { id: "lemon", name: "เลม่อน & โซดา/น้ำเปล่า" }
];

// รายการสินค้า
const MENU_ITEMS = [
  {
    id: "americano",
    name: "อเมริกาโน่",
    englishName: "Americano",
    category: "coffee",
    description: "กาแฟอเมริกาโน่ หอมเข้ม สดชื่น",
    image: "images/americano.jpg",
    prices: {
      M: 40
    },
    sweetness: true,
    available: true
  },

  {
    id: "honey-lemon-soda",
    name: "โซดาเลม่อนดองน้ำผึ้ง",
    englishName: "Honey Lemon Soda",
    category: "lemon",
    description: "เลม่อนดองน้ำผึ้ง ผสมโซดาซ่า สดชื่น",
    image: "images/lemon-soda.jpg",
    prices: {
      M: 35,
      L: 45
    },
    sweetness: true,
    available: true
  },

  {
    id: "honey-pickled-lemon",
    name: "เลม่อนดองน้ำผึ้ง",
    englishName: "Honey Pickled Lemon",
    category: "lemon",
    description: "เลม่อนดองน้ำผึ้ง สูตรของ KICK-OFF",
    image: "images/honey-lemon.jpg",
    prices: {},
    sweetness: false,
    available: false
  }
];

// ตัวเลือกขนาดแก้ว
const SIZE_OPTIONS = [
  { id: "M", name: "Medium (M)" },
  { id: "L", name: "Large (L)" }
];

// รายการท็อปปิ้ง (เตรียมไว้สำหรับเพิ่มภายหลัง)
const TOPPING_OPTIONS = [];

// ฟังก์ชันค้นหาสินค้าจากรหัส
function getProductById(productId) {
  return MENU_ITEMS.find(item => item.id === productId);
}

// ฟังก์ชันตรวจสอบราคาสินค้า
function getProductPrice(productId, size = "M") {
  const product = getProductById(productId);

  if (!product || !product.prices[size]) {
    return null;
  }

  return product.prices[size];
}
