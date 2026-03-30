// import hook จาก React
// useState = เก็บข้อมูล post
// useEffect = ใช้ดึงข้อมูลเมื่อ id เปลี่ยน
import { useState, useEffect } from "react";

// useParams = ใช้ดึง parameter จาก URL
// Link = ใช้เปลี่ยนหน้าแบบไม่ reload
import { useParams, Link } from "react-router-dom";

// useFavorites = ดึงข้อมูล favorites จาก Context กลาง
import { useFavorites } from "../context/FavoritesContext";

// Component แสดง comment ของโพสต์
import CommentList from "../components/CommentList";

// Component แสดง loading
import LoadingSpinner from "../components/LoadingSpinner";

function PostDetailPage() {
  // ดึง id จาก URL
  // เช่น /posts/3 → id = "3"
  const { id } = useParams();

  // ดึง favorites และฟังก์ชัน toggle จาก Context
  const { favorites, toggleFavorite } = useFavorites();

  // state เก็บข้อมูลโพสต์
  const [post, setPost] = useState(null);

  // state สำหรับ loading
  const [loading, setLoading] = useState(true);

  // useEffect ทำงานเมื่อ id เปลี่ยน
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลโพสต์จาก API
    async function fetchPost() {
      // ใช้ id จาก URL ไปเรียก API
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
      );

      // แปลงเป็น JSON
      const data = await res.json();

      // เก็บข้อมูลใน state
      setPost(data);

      // ปิด loading
      setLoading(false);
    }

    // เรียกใช้งาน
    fetchPost();
  }, [id]); // ทำงานใหม่เมื่อ id เปลี่ยน

  // ถ้ายังโหลดอยู่ → แสดง spinner
  if (loading) return <LoadingSpinner />;

  // เช็คว่าโพสต์นี้ถูกกด favorite หรือยัง
  const isFavorite = favorites.includes(post.id);

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* ปุ่มกลับหน้าหลัก */}
      <Link to="/" style={{ color: "#1e40af", textDecoration: "none" }}>
        ← กลับหน้าหลัก
      </Link>

      <div
        style={{
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          padding: "1.5rem",
          margin: "1rem 0",
          background: "white",
        }}
      >
        {/* ชื่อโพสต์ (มาจาก API) */}
        <h2 style={{ margin: "0 0 1rem", color: "#1e40af" }}>{post.title}</h2>

        {/* เนื้อหาโพสต์ */}
        <p style={{ color: "#4a5568", lineHeight: 1.8 }}>{post.body}</p>

        {/* ปุ่มกด favorite */}
        <button
          onClick={() => toggleFavorite(post.id)} // เรียก context
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "1rem",
            color: isFavorite ? "#e53e3e" : "#a0aec0", // สีเปลี่ยนตามสถานะ
          }}
        >
          {/* แสดงข้อความตามสถานะ */}
          {isFavorite ? "❤️ ถูกใจแล้ว" : "🤍 ถูกใจ"}
        </button>
      </div>

      {/* แสดง comment ของโพสต์นี้ */}
      {/* ส่ง post.id ไปให้ CommentList */}
      <CommentList postId={post.id} />
    </div>
  );
}

// export ให้ Router เรียกใช้
export default PostDetailPage;
