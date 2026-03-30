// 1. import custom hook จาก Context
// useFavorites = ใช้ดึงข้อมูล favorites และฟังก์ชัน toggleFavorite
import { useFavorites } from "../context/FavoritesContext";

// import component แสดงรายการโพสต์
import PostList from "../components/PostList";

// import component สำหรับเพิ่มโพสต์
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  // 2. เรียกใช้ hook
  // favorites = array ของ postId ที่กดถูกใจ
  // toggleFavorite = ฟังก์ชันเพิ่ม/ลบ favorite
  // 👉 ข้อมูลนี้มาจาก FavoritesContext (ตัวกลางของทั้งเว็บ)
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* ฟอร์มเพิ่มโพสต์ */}
      {/* onAddPost = function ที่จะถูกเรียกเมื่อมีการเพิ่มโพสต์ */}
      {/* ตอนนี้ยังไม่ได้ทำ logic (ส่งเป็น function เปล่า) */}
      <AddPostForm onAddPost={() => {}} />

      {/* 3. ส่งข้อมูลไปให้ PostList */}
      {/* favorites → ใช้เช็คว่า post ไหนถูกกด ❤️ */}
      {/* onToggleFavorite → ส่ง function ไปให้ลูกใช้ */}
      <PostList favorites={favorites} onToggleFavorite={toggleFavorite} />
    </div>
  );
}

// export ให้ App หรือ Router เรียกใช้
export default HomePage;
