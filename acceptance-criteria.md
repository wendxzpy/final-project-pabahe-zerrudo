# Acceptance Criteria

### Feature: Product Listing
US1:
- Given a user opens the Homepage or Products page, when the page loads, then categorized product cards display with a photo, unit price, and availability status.

US2:
- Given a user is viewing the product listings, when they enter a search keyword or select a category/filter, then the displayed list updates to show only matching products (or an empty state if none match).

US3:
- Given a user is viewing a product card, when they click or select it, then the product details opens showing the full description, unit price, and availability.

### Feature: Farmer Profiles
US1:
- Given a user is on a product card or product details view, when they click the farmer's name or profile link, then that farmer's profile view opens with their farm details.

US2:
- Given a user is on a farmer's profile view, when the profile loads, then it displays only that farmer's listed products along with their unit prices and availability.

### Feature: Order Summary
US1:
- Given a user is viewing a product card or product details view, when they click Add to Cart, then the item is added to the shopping cart and the cart count updates.

US2:
- Given a user has items in the shopping cart, when they increase/decrease an item's quantity or click Remove, then the item quantity updates or the item is removed and the cart totals recalculate immediately.

US3:
- Given a user has items in the shopping cart and opens the order summary, when they choose a delivery option, then an itemized list, delivery fee/option, and total cost display so they can confirm the order.

### Feature: Order Tracking
US1:
- Given a user navigates to My Orders, when the page loads, then a list of their past and current orders appears with order IDs, dates, and totals.

US2:
- Given a user is on the My Orders view, when they select an order, then that order's tracking view opens showing its items and delivery details.

US3:
- Given a user is on an order's tracking view, when the order progresses or updates, then the current status displays clearly from confirmation to delivery.

