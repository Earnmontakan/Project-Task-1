import { Link } from "react-router-dom";
// 👆 มาจาก react-router-dom ใช้สำหรับเปลี่ยนหน้าแบบ SPA (ไม่ reload หน้า)

import { useFavorites } from "../context/FavoritesContext";
// 👆 มาจากไฟล์ context/FavoritesContext
// เป็น custom hook ใช้ดึงข้อมูล favorites จาก Context กลาง

// Component Navbar (แถบเมนูด้านบน ใช้ใน App.jsx)
function Navbar() {
  // 👇 ดึงข้อมูล favorites จาก Context (แชร์ทั้งแอป)
  const { favorites } = useFavorites();

  return (
    // แถบเมนูหลัก
    <nav
      style={{
        background: "#1e40af",
        color: "white",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* โลโก้ / ชื่อเว็บ */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        {/* 👇 กดแล้วไปหน้า "/" (HomePage) */}
        <h1 style={{ margin: 0, fontSize: "1.5rem" }}>DevBoard</h1>
      </Link>

      {/* เมนูด้านขวา */}
      <div style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
        {/* ลิงก์ไปหน้าหลัก */}
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          {/* 👇 ไปหน้า "/" → HomePage */}
          หน้าหลัก
        </Link>

        {/* ลิงก์ไปหน้าสมาชิก */}
        <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>
          {/* 👇 ไปหน้า "/profile" → ProfilePage */}
          สมาชิก
        </Link>

        {/* ลิงก์ไปหน้าถูกใจ */}
        <Link
          to="/favorites"
          style={{
            color: "white",
            textDecoration: "none",

            // 👇 เช็คจาก Context: ถ้ามี favorites จะเปลี่ยนสีพื้นหลัง
            background: favorites.length > 0 ? "#e53e3e" : "transparent",

            padding: "0.25rem 0.75rem",
            borderRadius: "20px",
            fontSize: "0.9rem",
          }}
        >
          {/* 👇 แสดงจำนวน favorites (มาจาก Context) */}
          ❤️ ถูกใจ {favorites.length > 0 && `(${favorites.length})`}
        </Link>
      </div>
    </nav>
  );
}

// export ไปใช้ใน App.jsx (เพื่อให้แสดงทุกหน้า)
export default Navbar;
