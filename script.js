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
    description: "Juicy, fragrant Indian mangoes with honey-sweet flavor and minimal fiber."
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

const trackingStages = [
  { key: "Order Confirmed", detail: "Order received and assigned to partner grower." },
  { key: "Preparing Harvest", detail: "Produce is being harvested, weighed, and packed." },
  { key: "Out for Delivery", detail: "Order is en route to your chosen pickup or delivery point." },
  { key: "Delivered", detail: "Order completed and received." }
];

const ordersHistory = [
  {
    id: "HH-1042",
    placedAt: "2026-11-24 09:15 AM",
    deliveredAt: null,
    deliveryLabel: "Campus Hub Pickup",
    deliveryFee: 0,
    subtotal: 230,
    totalCost: 230,
    stageIndex: 1,
    items: [
      { name: "Tomatoes", qty: 2, unit: "kg", unitPrice: 45, lineTotal: 90 },
      { name: "Carabao Mangoes", qty: 1, unit: "kg", unitPrice: 140, lineTotal: 140 }
    ]
  }
];

// Cart & UI state
const cartItems = [];
let selectedDeliveryId = deliveryOptions[0].id;
let isOrderSummaryOpen = false;
let isMyOrdersOpen = false;
let selectedOrderId = null;

const produceGrid = document.getElementById("produce-grid");
const searchInput = document.getElementById("search-input");
const categorySelect = document.getElementById("category-select");
const farmerSelect = document.getElementById("farmer-select");
const clearFiltersBtn = document.getElementById("clear-filters-btn");
const toggleOrdersBtn = document.getElementById("toggle-orders-btn");
const ordersCountEl = document.getElementById("orders-count");
const toggleCartBtn = document.getElementById("toggle-cart-btn");
const cartCountEl = document.getElementById("cart-count");
const orderSummaryPanel = document.getElementById("order-summary-panel");
const myOrdersPanel = document.getElementById("my-orders-panel");
const orderTrackingPanel = document.getElementById("order-tracking-panel");
const orderConfirmation = document.getElementById("order-confirmation");
const productDetails = document.getElementById("product-details");

function isOrderDelivered(order) {
  return order.stageIndex >= trackingStages.length - 1;
}

function formatCurrentTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function revealPanel(panelEl, shouldScroll = true) {
  panelEl.hidden = false;
  panelEl.classList.remove("panel-animate");
  void panelEl.offsetWidth;
  panelEl.classList.add("panel-animate");
  if (shouldScroll) {
    panelEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function getFarmerById(farmerId) {
  return farmersList.find((farmer) => farmer.id === farmerId);
}

function getProductById(productId) {
  return produceList.find((item) => item.id === productId);
}

function getProductByName(name) {
  return produceList.find((item) => item.name.toLowerCase() === String(name).toLowerCase());
}

function getDeliveryOption() {
  return deliveryOptions.find((opt) => opt.id === selectedDeliveryId) || deliveryOptions[0];
}

function getOrderById(orderId) {
  return ordersHistory.find((order) => order.id === orderId);
}

function formatStockStatus(item) {
  if (item.stock === 0) return "Out of stock";
  if (item.stock <= 5) return `Low stock (${item.stock} ${item.unit} left)`;
  return `${item.stock} ${item.unit} available`;
}

function updateOrdersBadge() {
  const activeCount = ordersHistory.filter((order) => !isOrderDelivered(order)).length;
  ordersCountEl.textContent = `${ordersHistory.length}${activeCount > 0 ? ` • ${activeCount} active` : ""}`;
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
    renderOrderSummary(false);
  }
}

function reorderOrderItems(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;

  let addedAny = false;
  order.items.forEach((orderItem) => {
    const product = getProductByName(orderItem.name);
    if (product && product.stock > 0) {
      addToCart(product.id, Math.min(orderItem.qty, product.stock));
      addedAny = true;
    }
  });

  if (addedAny) {
    isOrderSummaryOpen = true;
    renderOrderSummary(true);
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
  renderOrderSummary(false);
}

function removeFromCart(productId) {
  const index = cartItems.findIndex((entry) => entry.productId === productId);
  if (index !== -1) {
    cartItems.splice(index, 1);
  }
  updateCartBadge();
  renderOrderSummary(false);
}

function confirmOrder() {
  if (cartItems.length === 0) return;

  const delivery = getDeliveryOption();
  let subtotal = 0;
  const confirmedItems = [];

  cartItems.forEach((entry) => {
    const product = getProductById(entry.productId);
    if (!product) return;
    const validQty = Math.min(entry.qty, product.stock);
    if (validQty <= 0) return;

    product.stock -= validQty;
    const lineTotal = validQty * product.price;
    subtotal += lineTotal;
    confirmedItems.push({
      name: product.name,
      qty: validQty,
      unit: product.unit,
      unitPrice: product.price,
      lineTotal
    });
  });

  if (confirmedItems.length === 0) return;

  const totalCost = subtotal + delivery.fee;
  const newOrder = {
    id: `HH-${1043 + ordersHistory.length}`,
    placedAt: `Today, ${formatCurrentTime()}`,
    deliveredAt: null,
    deliveryLabel: delivery.label,
    deliveryFee: delivery.fee,
    subtotal,
    totalCost,
    stageIndex: 0,
    items: confirmedItems
  };

  ordersHistory.unshift(newOrder);
  selectedOrderId = newOrder.id;

  cartItems.length = 0;
  isOrderSummaryOpen = false;
  orderSummaryPanel.hidden = true;
  updateCartBadge();
  updateOrdersBadge();
  filterProduce();

  if (!productDetails.hidden && productDetails.dataset.activeItemId) {
    const activeItem = getProductById(Number(productDetails.dataset.activeItemId));
    if (activeItem) showProductDetails(activeItem, false);
  }

  orderConfirmation.innerHTML = "";

  const heading = document.createElement("h2");
  heading.textContent = `Order Confirmed (${newOrder.id})`;

  const methodLine = document.createElement("p");
  methodLine.textContent = `Delivery Option: ${delivery.label} (₱${delivery.fee.toFixed(2)}) • Total: ₱${totalCost.toFixed(2)}`;

  const trackNowBtn = document.createElement("button");
  trackNowBtn.type = "button";
  trackNowBtn.className = "details-btn";
  trackNowBtn.textContent = "Track This Order";
  trackNowBtn.addEventListener("click", () => {
    isMyOrdersOpen = true;
    selectedOrderId = newOrder.id;
    renderMyOrders(false);
    renderOrderTracking(true);
  });

  const dismissBtn = document.createElement("button");
  dismissBtn.type = "button";
  dismissBtn.className = "secondary-btn";
  dismissBtn.textContent = "Dismiss";
  dismissBtn.addEventListener("click", () => {
    orderConfirmation.hidden = true;
  });

  orderConfirmation.append(heading, methodLine, trackNowBtn, dismissBtn);
  revealPanel(orderConfirmation, true);
}

function advanceOrderStage(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;
  if (order.stageIndex < trackingStages.length - 1) {
    order.stageIndex += 1;
    if (isOrderDelivered(order) && !order.deliveredAt) {
      order.deliveredAt = `Today, ${formatCurrentTime()}`;
    }
  }
  updateOrdersBadge();
  renderMyOrders(false);
  renderOrderTracking(false);
}

function resetOrderToConfirmed(orderId) {
  const order = getOrderById(orderId);
  if (!order) return;
  order.stageIndex = 0;
  order.deliveredAt = null;
  updateOrdersBadge();
  renderMyOrders(false);
  renderOrderTracking(false);
}

function renderOrderTracking(animate = true) {
  if (!selectedOrderId) {
    orderTrackingPanel.hidden = true;
    return;
  }

  const order = getOrderById(selectedOrderId);
  if (!order) {
    orderTrackingPanel.hidden = true;
    return;
  }

  const delivered = isOrderDelivered(order);
  const currentStage = trackingStages[order.stageIndex] || trackingStages[0];
  orderTrackingPanel.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.className = "panel-header-row";

  const heading = document.createElement("h2");
  heading.textContent = `Order Tracking — ${order.id}`;

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close-details-btn";
  closeBtn.textContent = "Close Tracking";
  closeBtn.addEventListener("click", () => {
    selectedOrderId = null;
    orderTrackingPanel.hidden = true;
  });

  headerRow.append(heading, closeBtn);

  const statusBadge = document.createElement("span");
  statusBadge.className = `category-badge ${delivered ? "status-badge-delivered" : "status-badge-active"}`;
  statusBadge.textContent = delivered
    ? `Delivered (${order.deliveredAt || "Completed"})`
    : `Current Status: ${currentStage.key}`;

  const stageDetail = document.createElement("p");
  stageDetail.className = "farmer-credit";
  stageDetail.textContent = currentStage.detail;

  const metaLine = document.createElement("p");
  metaLine.textContent = `Delivery: ${order.deliveryLabel} • Total: ₱${Number(order.totalCost).toFixed(2)} • Placed: ${order.placedAt}`;

  const stepsList = document.createElement("ol");
  stepsList.className = "tracking-steps";

  trackingStages.forEach((stage, idx) => {
    const li = document.createElement("li");
    li.className = "tracking-step";
    const isCompleted = idx < order.stageIndex || (delivered && idx === order.stageIndex);
    const isCurrent = !delivered && idx === order.stageIndex;

    if (isCompleted) li.classList.add("completed");
    if (isCurrent) li.classList.add("current");

    const stateLabel = isCompleted ? "Completed" : isCurrent ? "In Progress" : "Pending";
    li.textContent = `${stage.key} (${stateLabel}) — ${stage.detail}`;
    stepsList.appendChild(li);
  });

  const itemsList = document.createElement("ul");
  itemsList.className = "farmer-catalog-list";
  order.items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.qty} ${item.unit} × ₱${Number(item.unitPrice).toFixed(2)} = ₱${Number(item.lineTotal).toFixed(2)}`;
    itemsList.appendChild(li);
  });

  const actions = document.createElement("div");
  actions.className = "card-actions";

  const advanceBtn = document.createElement("button");
  advanceBtn.type = "button";
  advanceBtn.className = "details-btn";
  advanceBtn.textContent = delivered ? "Delivered" : "Advance Status Step";
  advanceBtn.disabled = delivered;
  advanceBtn.addEventListener("click", () => advanceOrderStage(order.id));

  const reorderBtn = document.createElement("button");
  reorderBtn.type = "button";
  reorderBtn.className = "secondary-btn";
  reorderBtn.textContent = "Reorder Items";
  reorderBtn.addEventListener("click", () => reorderOrderItems(order.id));

  const resetStageBtn = document.createElement("button");
  resetStageBtn.type = "button";
  resetStageBtn.className = "secondary-btn";
  resetStageBtn.textContent = "Reset to Confirmed";
  resetStageBtn.addEventListener("click", () => resetOrderToConfirmed(order.id));

  actions.append(advanceBtn, reorderBtn, resetStageBtn);
  orderTrackingPanel.append(headerRow, statusBadge, stageDetail, metaLine, stepsList, itemsList, actions);

  if (animate) {
    revealPanel(orderTrackingPanel, true);
  } else {
    orderTrackingPanel.hidden = false;
  }
}

function createOrderCardElement(order) {
  const delivered = isOrderDelivered(order);
  const stage = trackingStages[order.stageIndex] || trackingStages[0];

  const li = document.createElement("li");
  li.className = `order-history-card ${delivered ? "order-delivered-card" : ""}`;

  const info = document.createElement("div");
  info.className = "order-history-info";

  const titleRow = document.createElement("div");
  titleRow.className = "order-title-row";

  const title = document.createElement("strong");
  title.textContent = `Order ${order.id}`;

  const badge = document.createElement("span");
  badge.className = `order-status-pill ${delivered ? "delivered" : "active"}`;
  badge.textContent = delivered ? "Delivered" : stage.key;

  titleRow.append(title, badge);

  const itemsSummary = order.items.map((item) => `${item.name} (${item.qty} ${item.unit})`).join(", ");
  const itemsLine = document.createElement("p");
  itemsLine.className = "order-items-preview";
  itemsLine.textContent = itemsSummary;

  const details = document.createElement("p");
  const timeNote = delivered
    ? `Delivered: ${order.deliveredAt || "Completed"}`
    : `Placed: ${order.placedAt}`;
  details.textContent = `${timeNote} • ${order.deliveryLabel} • Total: ₱${Number(order.totalCost).toFixed(2)}`;

  info.append(titleRow, itemsLine, details);

  const btnGroup = document.createElement("div");
  btnGroup.className = "card-actions";

  const trackBtn = document.createElement("button");
  trackBtn.type = "button";
  trackBtn.className = delivered ? "secondary-btn" : "details-btn";
  trackBtn.textContent = delivered ? "View Receipt & Tracking" : "Track Order";
  trackBtn.addEventListener("click", () => {
    selectedOrderId = order.id;
    renderOrderTracking(true);
  });

  btnGroup.appendChild(trackBtn);

  if (delivered) {
    const reorderBtn = document.createElement("button");
    reorderBtn.type = "button";
    reorderBtn.className = "details-btn";
    reorderBtn.textContent = "Reorder Items";
    reorderBtn.addEventListener("click", () => reorderOrderItems(order.id));
    btnGroup.appendChild(reorderBtn);
  }

  li.append(info, btnGroup);
  return li;
}

function renderMyOrders(animate = true) {
  if (!isMyOrdersOpen) {
    myOrdersPanel.hidden = true;
    return;
  }

  myOrdersPanel.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.className = "panel-header-row";

  const heading = document.createElement("h2");
  heading.textContent = "My Orders";

  const closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "close-details-btn";
  closeBtn.textContent = "Close";
  closeBtn.addEventListener("click", () => {
    isMyOrdersOpen = false;
    myOrdersPanel.hidden = true;
  });

  headerRow.append(heading, closeBtn);
  myOrdersPanel.appendChild(headerRow);

  if (ordersHistory.length === 0) {
    const emptyMsg = document.createElement("p");
    emptyMsg.textContent = "No orders placed yet. Confirm an order from Order Summary to start tracking.";
    myOrdersPanel.appendChild(emptyMsg);
    if (animate) revealPanel(myOrdersPanel, true);
    else myOrdersPanel.hidden = false;
    return;
  }

  const activeOrders = ordersHistory.filter((order) => !isOrderDelivered(order));
  const deliveredOrders = ordersHistory.filter((order) => isOrderDelivered(order));

  if (activeOrders.length > 0) {
    const activeHeading = document.createElement("h3");
    activeHeading.className = "orders-group-heading";
    activeHeading.textContent = `Active Orders (${activeOrders.length})`;
    myOrdersPanel.appendChild(activeHeading);

    const activeList = document.createElement("ul");
    activeList.className = "orders-history-list";
    activeOrders.forEach((order) => activeList.appendChild(createOrderCardElement(order)));
    myOrdersPanel.appendChild(activeList);
  }

  if (deliveredOrders.length > 0) {
    const deliveredHeading = document.createElement("h3");
    deliveredHeading.className = "orders-group-heading";
    deliveredHeading.textContent = `Delivered Orders (${deliveredOrders.length})`;
    myOrdersPanel.appendChild(deliveredHeading);

    const deliveredList = document.createElement("ul");
    deliveredList.className = "orders-history-list";
    deliveredOrders.forEach((order) => deliveredList.appendChild(createOrderCardElement(order)));
    myOrdersPanel.appendChild(deliveredList);
  }

  if (animate) {
    revealPanel(myOrdersPanel, true);
  } else {
    myOrdersPanel.hidden = false;
  }
}

function renderOrderSummary(animate = true) {
  if (!isOrderSummaryOpen) {
    orderSummaryPanel.hidden = true;
    return;
  }

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
    if (animate) revealPanel(orderSummaryPanel, true);
    else orderSummaryPanel.hidden = false;
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
      renderOrderSummary(false);
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

  if (animate) {
    revealPanel(orderSummaryPanel, true);
  } else {
    orderSummaryPanel.hidden = false;
  }
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
  revealPanel(productDetails, true);
}

function showProductDetails(item, animate = true) {
  const farmer = getFarmerById(item.farmerId);
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
      renderOrderSummary(true);
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      addToCart(item.id, qtyInput.value);
      isOrderSummaryOpen = true;
      renderOrderSummary(true);
    });

    form.append(qtyLabel, addBtn, viewSummaryBtn);
    cartBox.appendChild(form);
  }

  productDetails.appendChild(cartBox);

  if (animate) {
    revealPanel(productDetails, true);
  } else {
    productDetails.hidden = false;
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
    detailsBtn.addEventListener("click", () => showProductDetails(item, true));

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

// Live progression for active orders every 30 seconds
setInterval(() => {
  let changed = false;
  ordersHistory.forEach((order) => {
    if (!isOrderDelivered(order)) {
      order.stageIndex += 1;
      if (isOrderDelivered(order) && !order.deliveredAt) {
        order.deliveredAt = `Today, ${formatCurrentTime()}`;
      }
      changed = true;
    }
  });
  if (changed) {
    updateOrdersBadge();
    if (isMyOrdersOpen) renderMyOrders(false);
    if (selectedOrderId) renderOrderTracking(false);
  }
}, 30000);

toggleOrdersBtn.addEventListener("click", () => {
  isMyOrdersOpen = !isMyOrdersOpen;
  renderMyOrders(true);
});

toggleCartBtn.addEventListener("click", () => {
  isOrderSummaryOpen = !isOrderSummaryOpen;
  renderOrderSummary(true);
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
updateOrdersBadge();
updateCartBadge();
renderProduceCards(produceList);