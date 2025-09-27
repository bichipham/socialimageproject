# 📰 Next.js Social Feed App

A demo social feed application built with **Next.js 14 (App Router)**, **Redux Toolkit**, and **TypeScript**.  
Supports **authentication with access token & refresh token**, and **Axios interceptors** for automatic token refresh.  

👉 **Live Demo:** [https://blogproject-hazel-zeta.vercel.app/newsfeed](https://blogproject-hazel-zeta.vercel.app/newsfeed)

👉 **Fake API:** https://dummyjson.com/
---

## 🚀 Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🗂️ **Redux Toolkit** for state management
- 🔐 **Authentication**
  - Login with `accessToken` + `refreshToken`
  - Tokens stored in **cookies**
  - **Axios interceptor** handles automatic refresh
- 📄 **Pages**
  - `Login` page
  - `Newsfeed` (list of posts)
  - `Post Detail` (with comments)
  - `Search` (with debounce & no-results UI)
- 🧪 **Testing**
  - Unit test for `Login` form (React Testing Library + Jest)

---

## 📂 Project Structure

```
src/
 ├─ app/
 │   ├─ login/        # Login page
 │   ├─ newsfeed/     # Newsfeed page
 │   ├─ post/[id]/    # Post detail page
 │   ├─ search/       # Search page
 │   └─ layout.tsx    # Main layout
 │
 ├─ components/
 │   ├─ PostCard.tsx
 │   └─ ...
 │
 ├─ reduxStore/
 │   ├─ store.ts
 │   ├─ authSlice.ts
 │   └─ feedSlice.ts
 │
 ├─ utils/
 │   └─ axiosClient.ts  # Axios + interceptor setup
 │
 └─ __tests__/
     └─ login.test.tsx  # Unit test for Login form
```

---

## 🔑 Authentication Flow

1. User logs in → `accessToken` + `refreshToken` saved in cookies.
2. Axios attaches `accessToken` to every request.
3. If `accessToken` expires → interceptor automatically calls refresh endpoint using `refreshToken`.
4. If refresh fails → user is redirected to `/login`.

---

## ⚙️ Installation

```bash
# Clone repo
git clone https://github.com/bichipham/blogproject.git

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🧪 Testing

Run unit tests:

```bash
npm run test
```

Example test: **Login form**

```tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Login from "../app/login/page";
import { Provider } from "react-redux";
import { store } from "@/reduxStore/store";

test("renders login form and submits", () => {
  render(
    <Provider store={store}>
      <Login />
    </Provider>
  );

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: "testuser" },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: "password" },
  });
  fireEvent.click(screen.getByRole("button", { name: /login/i }));

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});
```

---

## 📌 Todo

- [ ] Improve UI with Skeleton Loading
- [ ] Add infinite scroll to Newsfeed
- [ ] list of posts with virtualization
- [ ] Write more tests (Post detail, Search, etc.)

---

## 📝 License

MIT © 2025 Bichi Pham
