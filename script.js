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
    bio: "Specializes in naturally ripened Lakatan bananas, Indian mangoes, and zesty calamansi.",
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
    bio: "Focuses on post-harvest curing for red onions and seasonal pineapples with fair farm-gate pricing.",
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

const deliveryOptions = [
  {
    id: "campus-pickup",
    label: "Campus Hub Pickup",
    fee: 0,
    note: "Collect at student hub kiosk (Sat–Sun, 8:00 AM – 3:00 PM)"
  },
  {
    id: "local-delivery",
    label: "Local Delivery",
    fee: 35,
    note: "Direct drop-off within city service area"
  },
  {
    id: "farm-gate",
    label: "Farm Gate Pickup",
    fee: 0,
    note: "Pick up directly from the grower's farm window"
  }
];

// Cart entries: { productId, qty }
const cartItems = [];
let selectedDeliveryId = deliveryOptions[0].id;
let isOrderSummaryOpen = false;

const produceGrid = document.getElementById("produce-grid");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const farmerSelect = document.getElementById("farmer-select");
const clearFiltersBtn = document.getElementById("clear-filters-btn");
const toggleCartBtn = document.getElementById("toggle-cart-btn");
const cartCountEl = document.getElementById("cart-count");
const orderSummaryPanel = document.getElementById("order-summary-panel");
const orderConfirmation = document.getElementById("order-confirmation");
const productDetails = document.getElementById("product-details");

function getFarmerById(farmerId) {
  return farmersList.find((farmer) => farmer.id === farmerId);
}

function getProductById(productId) {
  return produceList.find((item) => item.id === productId);
}

function getDeliveryOption() {
  return deliveryOptions.find((opt) => opt.id === selectedDeliveryId) || deliveryOptions[0];
}

function formatStockStatus(item) {
  if (item.stock === 0) return "Out of stock";
  if (item.stock <= 5) return `Low stock (${item.stock} ${item.unit} left)`;
  return `${item.stock} ${item.unit} available`;
}

function updateCartBadge() {
  const totalQty = cartItems.reduce((sum, entry) => sum + entry.qty, 0);
  cartCountEl.textContent = String(totalQty);
}

function addToCart(productId, qtyToAdd) {
  const product = getProductById(productId);
  const qty = Number(qtyToAdd);
  if (!product || product.stock <= 0 || !Number.isInteger(qty) || qty < 1) {
    return;
  }

  const existing = cartItems.find((entry) => entry.productId === productId);
  const currentQty = existing ? existing.qty : 0;
  const nextQty = Math.min(product.stock, currentQty + qty);

  if (nextQty <= currentQty) return;

  if (existing) {
    existing.qty = nextQty;
  } else {
    cartItems.push({ productId, qty: nextQty });
  }

  orderConfirmation.hidden = true;
  updateCartBadge();
  if (isOrderSummaryOpen) {
    renderOrderSummary();
  }
}

function updateCartQuantity(productId, nextQty) {
  const product = getProductById(productId);
  const index = cartItems.findIndex((entry) => entry.productId === productId);
  if (index === -1 || !product) return;

  const parsedQty = Number(nextQty);
  if (!Number.isInteger(parsedQty) || parsedQty <= 0) {
    cartItems.splice(index, 1);
  } else {
    cartItems[index].qty = Math.min(product.stock, parsedQty);
  }

  updateCartBadge();
  renderOrderSummary();
}

function removeFromCart(productId) {
  const index = cartItems.findIndex((entry) => entry.productId === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  updateCartBadge();
  renderOrderSummary();
}

function confirmOrder() {
  if (cartItems.length === 0) return;

  const delivery = getDeliveryOption();
  let subtotal = 0;

  const summaryLines = cartItems
    .map((entry) => {
      const product = getProductById(entry.productId);
      if (!product) return null;
      const validQty = Math.min(entry.qty, product.stock);
      if (validQty <= 0) return null;

      product.stock -= validQty;
      const lineTotal = validQty * product.price;
      subtotal += lineTotal;
      return `${product.name} (${validQty} ${product.unit}) — ₱${lineTotal.toFixed(2)}`;
    })
    .filter(Boolean);

  const totalCost = subtotal + delivery.fee;

  cartItems.length = 0;
  isOrderSummaryOpen = false;
  orderSummaryPanel.hidden = true;
  updateCartBadge();
  filterProduce();

  if (!productDetails.hidden && productDetails.dataset.activeItemId) {
    const activeItem = getProductById(Number(productDetails.dataset.activeItemId));
    if (activeItem) showProductDetails(activeItem);
  }

  orderConfirmation.hidden = false;
  orderConfirmation.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = "Order Confirmed";

  const methodLine = document.createElement("p");
  methodLine.textContent = `Delivery Option: ${delivery.label} (₱${delivery.fee.toFixed(2)}) • ${delivery.note}`;

  const itemsLine = document.createElement("p");
  itemsLine.textContent = `Items: ${summaryLines.join("; ")}`;

  const totalLine = document.createElement("p");
  totalLine.className = "farmer-credit";
  totalLine.textContent = `Total Paid / Due: ₱${totalCost.toFixed(2)}`;

  const dismissBtn = document.createElement("button");
  dismissBtn.type = "button";
  dismissBtn.className = "close-details-btn";
  dismissBtn.textContent = "Dismiss";
  dismissBtn.addEventListener("click", () => {
    orderConfirmation.hidden = true;
  });

  orderConfirmation.append(heading, methodLine, itemsLine, totalLine, dismissBtn);
}

function renderOrderSummary() {
  if (!isOrderSummaryOpen) {
    orderSummaryPanel.hidden = true;
    return;
  }

  orderSummaryPanel.hidden = false;
  orderSummaryPanel.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.className = "panel-header-row";

  const heading = document.createElement("h2");
  heading.textContent = "Order Summary & Shopping Cart";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close-details-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    isOrderSummaryOpen = false;
    orderSummaryPanel.hidden = true;
  });

  headerRow.append(heading, closeBtn);
  orderSummaryPanel.appendChild(headerRow);

  if (cartItems.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "Your cart is currently empty. Open any produce item's details to add items.";
    orderSummaryPanel.appendChild(emptyMsg);
    return;
  }

  const list = document.createElement("ul");
  list.className = "cart-item-list";

  let subtotal = 0;

  cartItems.forEach((entry) => {
    const product = getProductById(entry.productId);
    if (!product) return;

    const clampedQty = Math.min(entry.qty, Math.max(0, product.stock));
    entry.qty = clampedQty;
    if (clampedQty <= 0) return;

    const lineSubtotal = clampedQty * product.price;
    subtotal += lineSubtotal;

    const li = document.createElement("li");
    li.className = "cart-item-row";

    const info = document.createElement("div");
    info.className = "cart-item-info";

    const nameEl = document.createElement("strong");
    nameEl.textContent = product.name;

    const unitPriceEl = document.createElement("span");
    unitPriceEl.className = "cart-unit-price";
    unitPriceEl.textContent = `₱${Number(product.price).toFixed(2)} / ${product.unit} • Subtotal: ₱${lineSubtotal.toFixed(2)}`;

    info.append(nameEl, unitPriceEl);

    const controls = document.createElement("div");
    controls.className = "cart-item-controls";

    const decBtn = document.createElement("button");
    decBtn.type = "button";
    decBtn.className = "qty-btn";
    decBtn.textContent = "-";
    decBtn.setAttribute("aria-label", `Decrease quantity of ${product.name}`);
    decBtn.addEventListener("click", () => updateCartQuantity(product.id, entry.qty - 1));

    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.max = String(product.stock);
    qtyInput.value = String(entry.qty);
    qtyInput.className = "cart-qty-input";
    qtyInput.setAttribute("aria-label", `Quantity of ${product.name}`);
    qtyInput.addEventListener("change", () => updateCartQuantity(product.id, qtyInput.value));

    const incBtn = document.createElement("button");
    incBtn.type = "button";
    incBtn.className = "qty-btn";
    incBtn.textContent = "+";
    incBtn.disabled = entry.qty >= product.stock;
    incBtn.setAttribute("aria-label", `Increase quantity of ${product.name}`);
    incBtn.addEventListener("click", () => updateCartQuantity(product.id, entry.qty + 1));

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "small-cancel-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(product.id));

    controls.append(decBtn, qtyInput, incBtn, removeBtn);
    li.append(info, controls);
    list.appendChild(li);
  });

  const deliveryBox = document.createElement("div");
  deliveryBox.className = "delivery-options-box";

  const deliveryHeading = document.createElement("h3");
  deliveryHeading.textContent = "Select Delivery Option";
  deliveryBox.appendChild(deliveryHeading);

  deliveryOptions.forEach((opt) => {
    const label = document.createElement("label");
    label.className = "delivery-option-label";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "deliveryOption";
    radio.value = opt.id;
    radio.checked = opt.id === selectedDeliveryId;
    radio.addEventListener("change", () => {
      selectedDeliveryId = opt.id;
      renderOrderSummary();
    });

    const textSpan = document.createElement("span");
    const feeText = opt.fee === 0 ? "Free (₱0.00)" : `₱${opt.fee.toFixed(2)}`;
    textSpan.textContent = `${opt.label} — ${feeText} (${opt.note})`;

    label.append(radio, textSpan);
    deliveryBox.appendChild(label);
  });

  const activeDelivery = getDeliveryOption();
  const totalCost = subtotal + activeDelivery.fee;

  const totalsBox = document.createElement("div");
  totalsBox.className = "order-totals-box";

  const subtotalLine = document.createElement("p");
  subtotalLine.textContent = `Items Subtotal: ₱${subtotal.toFixed(2)}`;

  const feeLine = document.createElement("p");
  feeLine.textContent = `Delivery Fee (${activeDelivery.label}): ₱${activeDelivery.fee.toFixed(2)}`;

  const totalLine = document.createElement("p");
  totalLine.className = "order-grand-total";
  totalLine.textContent = `Total Cost: ₱${totalCost.toFixed(2)}`;

  const confirmBtn = document.createElement("button");
  confirmBtn.type = "button";
  confirmBtn.className = "details-btn";
  confirmBtn.textContent = "Confirm Order";
  confirmBtn.addEventListener("click", confirmOrder);

  totalsBox.append(subtotalLine, feeLine, totalLine, confirmBtn);
  orderSummaryPanel.append(list, deliveryBox, totalsBox);
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
  delete productDetails.dataset.activeItemId;
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
  productDetails.dataset.activeItemId = String(item.id);
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

  const cartBox = document.createElement("div");
  cartBox.className = "reserve-box";

  const cartHeading = document.createElement("h3");
  cartHeading.textContent = "Add to Cart";
  cartBox.appendChild(cartHeading);

  if (item.stock <= 0) {
    const soldOutMsg = document.createElement("p");
    soldOutMsg.textContent = "Currently out of stock.";
    cartBox.appendChild(soldOutMsg);
  } else {
    const form = document.createElement("form");
    form.className = "reserve-form";

    const qtyLabel = document.createElement("label");
    qtyLabel.textContent = `Quantity (${item.unit}): `;
    const qtyInput = document.createElement("input");
    qtyInput.type = "number";
    qtyInput.min = "1";
    qtyInput.max = String(item.stock);
    qtyInput.value = "1";
    qtyLabel.appendChild(qtyInput);

    const addBtn = document.createElement("button");
    addBtn.type = "submit";
    addBtn.className = "details-btn";
    addBtn.textContent = "Add to Cart";

    const viewSummaryBtn = document.createElement("button");
    viewSummaryBtn.type = "button";
    viewSummaryBtn.className = "secondary-btn";
    viewSummaryBtn.textContent = "Open Order Summary";
    viewSummaryBtn.addEventListener("click", () => {
      isOrderSummaryOpen = true;
      renderOrderSummary();
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      addToCart(item.id, qtyInput.value);
      isOrderSummaryOpen = true;
      renderOrderSummary();
    });

    form.append(qtyLabel, addBtn, viewSummaryBtn);
    cartBox.appendChild(form);
  }

  productDetails.appendChild(cartBox);
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

toggleCartBtn.addEventListener("click", () => {
  isOrderSummaryOpen = !isOrderSummaryOpen;
  renderOrderSummary();
});

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
updateCartBadge();
renderProduceCards(produceList);