const produceList = [
  {
    id: 1,
    name: "Tomatoes",
    category: "Vegetables",
    price: 45,
    unit: "kg",
    stock: 20,
    image: "images/tomatoes.jpg",
    description: "Freshly harvested vine-ripened native tomatoes, ideal for salads, sauces, and everyday cooking."
  },
  {
    id: 2,
    name: "Red Onions",
    category: "Vegetables",
    price: 110,
    unit: "kg",
    stock: 0,
    image: "images/Red-Onion.jpeg",
    description: "Crisp, aromatic red onions cured naturally after harvest for longer kitchen shelf life."
  },
  {
    id: 3,
    name: "Eggplant (Talong)",
    category: "Vegetables",
    price: 55,
    unit: "kg",
    stock: 15,
    image: "images/eggplant.jpg",
    description: "Glossy purple eggplants picked young for tender flesh and rich flavor in grilling or stews."
  },
  {
    id: 4,
    name: "Ampalaya (Bitter Gourd)",
    category: "Vegetables",
    price: 75,
    unit: "kg",
    stock: 3,
    image: "images/amplaya.jpg",
    description: "Firm, bumpy green ampalaya harvested early in the morning for crisp texture and balanced bitterness."
  },
  {
    id: 5,
    name: "Lakatan Bananas",
    category: "Fruits",
    price: 50,
    unit: "kg",
    stock: 4,
    image: "images/lakatan bananas.jpg",
    description: "Sweet, firm local Lakatan bananas harvested at peak maturity with zero artificial ripening."
  },
  {
    id: 6,
    name: "Indian Mangoes",
    category: "Fruits",
    price: 140,
    unit: "kg",
    stock: 18,
    image: "images/indian mangoes.jpg",
    description: "Juicy, fragrant ripe Carabao mangoes with honey-sweet flavor and minimal fiber."
  },
  {
    id: 7,
    name: "Pineapples",
    category: "Fruits",
    price: 65,
    unit: "piece",
    stock: 10,
    image: "images/pineapples.jpg",
    description: "Naturally sweet, golden-fleshed pineapples with a crisp core and bright tropical aroma."
  },
  {
    id: 8,
    name: "Calamansi",
    category: "Fruits",
    price: 80,
    unit: "kg",
    stock: 0,
    image: "images/calamansi.jpg",
    description: "Zesty, freshly picked calamansi packed with bright citrus juice for dressings, marinades, and drinks."
  }
];

const produceGrid = document.getElementById("produce-grid");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const productDetails = document.getElementById("product-details");

function filterProduce() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;

  const filtered = produceList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query);
    const matchesCategory = category === "All" || item.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProduceCards(filtered);
}

function showProductDetails(item) {
  productDetails.hidden = false;
  productDetails.innerHTML = "";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close-details-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    productDetails.hidden = true;
  });

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;
  img.className = "details-image";

  const heading = document.createElement("h2");
  heading.textContent = item.name;

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const meta = document.createElement("p");
  const statusText = item.stock > 0 ? `${item.stock} ${item.unit} available` : "Out of stock";
  meta.textContent = `₱${Number(item.price).toFixed(2)} / ${item.unit} • ${statusText}`;

  productDetails.append(closeBtn, img, heading, desc, meta);
}

function renderProduceCards(items) {
  produceGrid.innerHTML = "";

  if (items.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.className = "empty-state";
    emptyMsg.textContent = "No matching produce found.";
    produceGrid.appendChild(emptyMsg);
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "produce-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    img.className = "produce-image";

    const categoryBadge = document.createElement("span");
    categoryBadge.className = "category-badge";
    categoryBadge.textContent = item.category;

    const title = document.createElement("h2");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.className = "produce-price";
    price.textContent = `₱${Number(item.price).toFixed(2)} / ${item.unit}`;

    const stock = document.createElement("p");
    stock.className = "stock-status";
    stock.textContent = item.stock > 0 ? `${item.stock} ${item.unit} available` : "Out of stock";
    if (item.stock === 0) stock.classList.add("out-of-stock");
    else if (item.stock <= 5) stock.classList.add("low-stock");

    const detailsBtn = document.createElement("button");
    detailsBtn.type = "button";
    detailsBtn.className = "details-btn";
    detailsBtn.textContent = "View Details";
    detailsBtn.addEventListener("click", () => showProductDetails(item));

    card.append(img, categoryBadge, title, price, stock, detailsBtn);
    produceGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", filterProduce);
categorySelect.addEventListener("change", filterProduce);

renderProduceCards(produceList);