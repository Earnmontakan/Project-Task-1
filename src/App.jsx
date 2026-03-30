// import Router จาก react-router-dom
// BrowserRouter = ครอบทั้งแอปเพื่อให้ใช้ routing ได้
// Routes = กล่องรวม route ทั้งหมด
// Route = กำหนดว่า path ไหน ไปหน้าไหน
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Context Provider
// FavoritesProvider = ตัวกลางเก็บข้อมูล favorites ทั้งเว็บ
import { FavoritesProvider } from "./context/FavoritesContext";

// import component ต่าง ๆ ที่จะใช้ใน route
import Navbar from "./components/Navbar"; // เมนูด้านบน
import HomePage from "./pages/HomePage"; // หน้าแรก
import PostDetailPage from "./pages/PostDetailPage"; // หน้า detail
import ProfilePage from "./pages/ProfilePage"; // หน้า profile
import FavoritesPage from "./pages/FavoritesPage"; // หน้า favorites

function App() {
  return (
    // 1. ครอบทั้งแอปด้วย FavoritesProvider
    // 👉 ทำให้ทุก component ใช้ favorites ได้
    <FavoritesProvider>
      {/* 2. ครอบด้วย BrowserRouter */}
      {/* 👉 เปิดใช้งานระบบ routing */}
      <BrowserRouter>
        {/* 3. Navbar แสดงทุกหน้า */}
        {/* 👉 เช่น ปุ่ม Home / Favorites / Profile */}
        <Navbar />

        {/* 4. กล่องรวม route */}
        <Routes>
          {/* หน้าแรก */}
          {/* URL = "/" */}
          <Route path="/" element={<HomePage />} />

          {/* หน้า detail */}
          {/* URL = /posts/1, /posts/2 */}
          {/* :id = dynamic parameter */}
          <Route path="/posts/:id" element={<PostDetailPage />} />

          {/* หน้า profile */}
          <Route path="/profile" element={<ProfilePage />} />

          {/* หน้า favorites */}
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

// export ให้ index.js เรียกใช้
export default App;
