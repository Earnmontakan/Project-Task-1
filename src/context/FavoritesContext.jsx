// import ของ React
// createContext = สร้างพื้นที่แชร์ข้อมูล (global)
// useContext = ใช้ดึงข้อมูลจาก context
// useState = เก็บ state
import { createContext, useContext, useState } from "react";

// 1. สร้าง context object
// เปรียบเหมือน "กล่องกลาง" สำหรับเก็บข้อมูลที่หลาย component ใช้ร่วมกัน
const FavoritesContext = createContext();

// 2. Provider component — ครอบ App ทั้งหมด
// children = component ลูกทั้งหมดที่ถูกครอบไว้ (เช่น App, หน้าเว็บต่าง ๆ)
export function FavoritesProvider({ children }) {
  // state เก็บ id ของ post ที่ถูก favorite
  const [favorites, setFavorites] = useState([]);

  // ฟังก์ชันสำหรับเพิ่ม/ลบ favorite
  function toggleFavorite(postId) {
    // setFavorites แบบ callback เพื่อใช้ค่าเดิม (prev)
    setFavorites((prev) =>
      // ถ้า postId นี้มีอยู่แล้วใน favorites
      prev.includes(postId)
        ? // → ลบออก
          prev.filter((id) => id !== postId)
        : // ถ้ายังไม่มี → เพิ่มเข้าไป
          [...prev, postId],
    );
  }

  return (
    // Provider คือจุดที่ "แจกข้อมูล"
    // value = ข้อมูลที่อยากให้ component ลูกใช้ได้
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {/* children = component ทั้งหมดที่ถูกครอบ */}
      {/* เช่น <App /> หรือทุกหน้าในเว็บ */}
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับใช้งาน context ง่าย ๆ
export function useFavorites() {
  // ดึงค่าจาก FavoritesContext
  // จะได้ { favorites, toggleFavorite }
  return useContext(FavoritesContext);
}
