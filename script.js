const farmersList = [
  {
    id: 1,
    name: "Mang Ramon Cruz",
    farmName: "Cruz Highland Greens",
    location: "Bukidnon, Northern Mindanao",
    specialty: "Vegetables",
    photo: "images/farmer-ramon.jpg",
    bio: "Grows native tomatoes, eggplants, and bitter gourd using composted organic matter and drip irrigation.",
    operations: {
      harvestSchedule: "Tue, Thu & Sat (5:00 AM – 8:00 AM)",
      pickupWindow: "Sat–Sun, 7:00 AM – 2:00 PM at Farm Gate & City Hub",
      practices: "Composted organic soil amendments, rainwater drip lines, same-day cooling"
    }
  },
  {
    id: 2,
    name: "Aling Marites Reyes",
    farmName: "Reyes Sunlit Orchard",
    location: "Misamis Oriental",
    specialty: "Fruits",
    photo: "images/farmer-marites.jpg",
    bio: "Specializes in naturally ripened Lakatan bananas, sweet Carabao mangoes, and zesty calamansi.",
    operations: {
      harvestSchedule: "Mon & Thu (6:00 AM – 9:30 AM)",
      pickupWindow: "Thu–Sun, 8:00 AM – 4:00 PM",
      practices: "Tree-ripened selection, zero chemical ripening agents, ventilated crate packing"
    }
  },
  {
    id: 3,
    name: "Kuya Danilo Santos",
    farmName: "Santos Valley Harvest",
    location: "Bukidnon, Northern Mindanao",
    specialty: "Vegetables & Fruits",
    photo: "images/farmer-danilo.jpg",
    bio: "Focuses on post-harvest curing for red onions and seasonal Queen pineapples with fair farm-gate pricing.",
    operations: {
      harvestSchedule: "Wed & Fri (5:30 AM – 8:30 AM)",
      pickupWindow: "Fri–Sun, 7:30 AM – 3:00 PM",
      practices: "Natural sun/air curing for bulbs, graded sizing, direct grower pricing"
    }
  }
];

const produceList = [
  {
    id: 1,
    farmerId: 1,
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
    farmerId: 3,
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
    farmerId: 1,
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
    farmerId: 1,
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
    farmerId: 2,
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
    farmerId: 2,
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
    farmerId: 3,
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
    farmerId: 2,
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
const farmerSelect = document.getElementById("farmer-select");
const clearFiltersBtn = document.getElementById("clear-filters-btn");
const productDetails = document.getElementById("product-details");

function getFarmerById(farmerId) {
  return farmersList.find((farmer) => farmer.id === farmerId);
}

function formatStockStatus(item) {
  if (item.stock === 0) return "Out of stock";
  if (item.stock <= 5) return `Low stock (${item.stock} ${item.unit} left)`;
  return `${item.stock} ${item.unit} available`;
}

function populateFarmerFilter() {
  farmersList.forEach((farmer) => {
    const option = document.createElement("option");
    option.value = String(farmer.id);
    option.textContent = `${farmer.name} — ${farmer.farmName}`;
    farmerSelect.appendChild(option);
  });
}

function filterProduce() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categorySelect.value;
  const selectedFarmer = farmerSelect.value;

  const filtered = produceList.filter((item) => {
    const farmer = getFarmerById(item.farmerId);
    const farmerText = farmer ? `${farmer.name} ${farmer.farmName}`.toLowerCase() : "";
    const matchesSearch =
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      farmerText.includes(query);
    const matchesCategory = category === "All" || item.category === category;
    const matchesFarmer = selectedFarmer === "All" || String(item.farmerId) === selectedFarmer;

    return matchesSearch && matchesCategory && matchesFarmer;
  });

  renderProduceCards(filtered);
}

function showFarmerProfile(farmer) {
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
  img.src = farmer.photo;
  img.alt = `${farmer.name} — ${farmer.farmName}`;
  img.className = "details-image";

  const badge = document.createElement("span");
  badge.className = "category-badge";
  badge.textContent = `Specialty: ${farmer.specialty}`;

  const heading = document.createElement("h2");
  heading.textContent = `${farmer.name} — ${farmer.farmName}`;

  const location = document.createElement("p");
  location.className = "farmer-credit";
  location.textContent = `Location: ${farmer.location}`;

  const bio = document.createElement("p");
  bio.textContent = farmer.bio;

  const opsBox = document.createElement("div");
  opsBox.className = "farmer-operations";

  const opsTitle = document.createElement("h3");
  opsTitle.textContent = "Farm Operational Details";

  const harvestLine = document.createElement("p");
  harvestLine.textContent = `Harvest Schedule: ${farmer.operations.harvestSchedule}`;

  const pickupLine = document.createElement("p");
  pickupLine.textContent = `Pickup / Fulfillment: ${farmer.operations.pickupWindow}`;

  const practicesLine = document.createElement("p");
  practicesLine.textContent = `Growing & Handling: ${farmer.operations.practices}`;

  opsBox.append(opsTitle, harvestLine, pickupLine, practicesLine);

  const catalogHeading = document.createElement("h3");
  catalogHeading.textContent = `Farm Catalog (${farmer.farmName})`;

  const farmerProducts = produceList.filter((item) => item.farmerId === farmer.id);
  const catalogList = document.createElement("ul");
  catalogList.className = "farmer-catalog-list";

  if (farmerProducts.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "No produce listed under this farm right now.";
    catalogList.appendChild(emptyItem);
  } else {
    farmerProducts.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name} — ₱${Number(item.price).toFixed(2)} / ${item.unit} • ${formatStockStatus(item)}`;
      catalogList.appendChild(li);
    });
  }

  const filterBtn = document.createElement("button");
  filterBtn.type = "button";
  filterBtn.className = "details-btn";
  filterBtn.textContent = "Filter Main Grid by This Farmer";
  filterBtn.addEventListener("click", () => {
    farmerSelect.value = String(farmer.id);
    filterProduce();
    productDetails.hidden = true;
  });

  productDetails.append(closeBtn, img, badge, heading, location, bio, opsBox, catalogHeading, catalogList, filterBtn);
}

function showProductDetails(item) {
  const farmer = getFarmerById(item.farmerId);
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
  meta.textContent = `₱${Number(item.price).toFixed(2)} / ${item.unit} • ${formatStockStatus(item)}`;

  productDetails.append(closeBtn, img, heading, desc, meta);

  if (farmer) {
    const farmerRow = document.createElement("p");
    farmerRow.className = "farmer-credit";
    farmerRow.textContent = "Grower / Producer: ";

    const farmerLinkBtn = document.createElement("button");
    farmerLinkBtn.type = "button";
    farmerLinkBtn.className = "farmer-link-btn";
    farmerLinkBtn.textContent = `${farmer.name} (${farmer.farmName})`;
    farmerLinkBtn.addEventListener("click", () => showFarmerProfile(farmer));

    const locationSuffix = document.createTextNode(` — ${farmer.location}`);
    farmerRow.append(farmerLinkBtn, locationSuffix);
    productDetails.appendChild(farmerRow);
  }
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
    const farmer = getFarmerById(item.farmerId);
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

    const farmerLabel = document.createElement("p");
    farmerLabel.className = "card-farmer-name";

    if (farmer) {
      farmerLabel.textContent = "Producer: ";
      const nameBtn = document.createElement("button");
      nameBtn.type = "button";
      nameBtn.className = "farmer-link-btn";
      nameBtn.textContent = farmer.name;
      nameBtn.addEventListener("click", () => showFarmerProfile(farmer));

      const farmSuffix = document.createTextNode(` • ${farmer.farmName}`);
      farmerLabel.append(nameBtn, farmSuffix);
    } else {
      farmerLabel.textContent = "Producer: Unassigned local farm";
    }

    const price = document.createElement("p");
    price.className = "produce-price";
    price.textContent = `₱${Number(item.price).toFixed(2)} / ${item.unit}`;

    const stock = document.createElement("p");
    stock.className = "stock-status";
    stock.textContent = formatStockStatus(item);
    if (item.stock === 0) stock.classList.add("out-of-stock");
    else if (item.stock <= 5) stock.classList.add("low-stock");

    const actions = document.createElement("div");
    actions.className = "card-actions";

    const detailsBtn = document.createElement("button");
    detailsBtn.type = "button";
    detailsBtn.className = "details-btn";
    detailsBtn.textContent = "View Details";
    detailsBtn.addEventListener("click", () => showProductDetails(item));

    actions.appendChild(detailsBtn);

    if (farmer) {
      const farmerBtn = document.createElement("button");
      farmerBtn.type = "button";
      farmerBtn.className = "secondary-btn";
      farmerBtn.textContent = "Farmer Profile";
      farmerBtn.addEventListener("click", () => showFarmerProfile(farmer));
      actions.appendChild(farmerBtn);
    }

    card.append(img, categoryBadge, title, farmerLabel, price, stock, actions);
    produceGrid.appendChild(card);
  });
}

clearFiltersBtn.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "All";
  farmerSelect.value = "All";
  filterProduce();
});

searchInput.addEventListener("input", filterProduce);
categorySelect.addEventListener("change", filterProduce);
farmerSelect.addEventListener("change", filterProduce);

populateFarmerFilter();
renderProduceCards(produceList);