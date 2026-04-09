# pw-hooks
Resources:
https://playwright.dev/docs/api/class-test#test-before-each

## 🧪 Test Coverage – SauceDemo (Playwright)

This project includes automated end-to-end tests using Playwright for validating authentication and core application functionality.

---

## 🔐 Login Test Coverage

The following scenarios validate authentication flows:

| # | Test Case | Description |
|---|----------|------------|
| 1 | Valid Login | Verify user can log in with valid credentials (`standard_user`) |
| 2 | Invalid Password | Error displayed when password is incorrect |
| 3 | Invalid Username | Error displayed for non-existent user |
| 4 | Empty Username | Validation message when username is missing |
| 5 | Empty Password | Validation message when password is missing |
| 6 | Locked User | Access denied for `locked_out_user` |
| 7 | Problem User | Login succeeds for `problem_user` (UI anomalies expected) |
| 8 | Performance User | Login succeeds for `performance_glitch_user` |

---

## 🛒 Post-Login (Inventory & App Functionality) Test Coverage

These tests validate behavior after successful authentication:

| # | Test Case | Description |
|---|----------|------------|
| 1 | Inventory Load | Verify products are displayed on inventory page |
| 2 | Add to Cart | User can add item to cart and badge updates |
| 3 | Remove from Cart | User can remove item and badge disappears |
| 4 | Cart Navigation | User can navigate to cart page |
| 5 | Sort A–Z | Products sort correctly by name |
| 6 | Sort by Price | Products sort correctly by price (low → high) |
| 7 | Logout | User can log out and return to login page |
| 8 | Complete Checkout | End-to-end purchase flow succeeds |

---

## ⚙️ How to Run Tests

```bash
npm install
npx playwright install
npx playwright test
