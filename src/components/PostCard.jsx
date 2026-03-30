import { useState } from "react"; // ใช้จัดการ state ภายใน component นี้
import { Link } from "react-router-dom"; // ใช้เชื่อมไปหน้าอื่น (routing)
import { useFavorites } from "../context/FavoritesContext"; // ดึงข้อมูล + ฟังก์ชันจาก FavoritesContext
import CommentList from "./CommentList"; // import component แสดงความคิดเห็น (อีกไฟล์นึง)

// Component สำหรับแสดงโพสต์ 1 อัน (ถูกเรียกใช้จากหน้า HomePage หรือหน้ารวมโพสต์)
function PostCard({ post }) {
  // ดึง favorites (list id) และฟังก์ชัน toggle จาก Context
  const { favorites, toggleFavorite } = useFavorites();

  // เช็คว่า post นี้ถูกกดถูกใจหรือยัง
  const isFavorite = favorites.includes(post.id);

  // state สำหรับเปิด/ปิด comment
  const [showComments, setShowComments] = useState(false);

  return (
    // กล่องโพสต์
    <div
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1rem",
        background: "white",
      }}
    >
      {/* หัวข้อโพสต์ */}
      <h3 style={{ margin: "0 0 0.5rem" }}>
        <Link
          // 👇 กดแล้วจะไปหน้า /posts/:id (เชื่อมกับ Route ใน App.jsx)
          to={`/posts/${post.id}`}
          style={{ color: "#1e40af", textDecoration: "none" }}
        >
          {post.title} {/* ข้อมูลมาจาก props post */}
        </Link>
      </h3>

      {/* เนื้อหาโพสต์ */}
      <p style={{ margin: "0 0 0.75rem", color: "#4a5568", lineHeight: 1.6 }}>
        {post.body} {/* มาจาก props post */}
      </p>

      {/* ปุ่มต่าง ๆ */}
      <div style={{ display: "flex", gap: "0.5rem" }}>
        {/* ปุ่มกดถูกใจ */}
        <button
          // 👇 เรียกฟังก์ชันจาก FavoritesContext
          onClick={() => toggleFavorite(post.id)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            // เปลี่ยนสีตามสถานะ (เช็คจาก favorites)
            color: isFavorite ? "#e53e3e" : "#a0aec0",
          }}
        >
          {/* เปลี่ยน icon ตามสถานะ */}
          {isFavorite ? "❤️" : "🤍"}
        </button>

        {/* ปุ่มแสดง/ซ่อนความคิดเห็น */}
        <button
          // 👇 เปลี่ยนค่า showComments (true/false)
          onClick={() => setShowComments((prev) => !prev)}
          style={{
            background: "none",
            border: "1px solid #e2e8f0",
            cursor: "pointer",
            fontSize: "0.9rem",
            padding: "0.25rem 0.75rem",
            borderRadius: "4px",
            color: "#4a5568",
          }}
        >
          {/* เปลี่ยนข้อความตาม state */}
          {showComments ? "▲ ซ่อน" : "▼ ความคิดเห็น"}
        </button>
      </div>

      {/* 👇 ถ้า showComments = true จะเรียก CommentList มาแสดง */}
      {/* CommentList จะไป fetch API ตาม postId ที่ส่งไป */}
      {showComments && <CommentList postId={post.id} />}
    </div>
  );
}

export default PostCard;
