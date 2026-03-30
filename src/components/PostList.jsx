import { useState, useEffect } from "react"; // hook ของ React
import PostCard from "./PostCard";
// 👆 มาจากไฟล์ PostCard.jsx (ใช้แสดงโพสต์แต่ละอัน)

import LoadingSpinner from "./LoadingSpinner";
// 👆 มาจากไฟล์ LoadingSpinner.jsx (ใช้ตอนกำลังโหลด)

// Component สำหรับแสดงรายการโพสต์ (ถูกเรียกจาก HomePage)
function PostList({ favorites, onToggleFavorite }) {
  // 👇 state ภายใน component นี้
  const [posts, setPosts] = useState([]); // เก็บข้อมูลโพสต์จาก API
  const [loading, setLoading] = useState(true); // สถานะกำลังโหลด
  const [error, setError] = useState(null); // เก็บ error
  const [search, setSearch] = useState(""); // เก็บคำค้นหา

  // useEffect ทำงานตอนโหลด component ครั้งแรก
  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        setError(null);

        // 👇 ดึงข้อมูลจาก API ภายนอก
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        // ถ้า error
        if (!res.ok) throw new Error("ดึงข้อมูลไม่สำเร็จ");

        // แปลงเป็น JSON
        const data = await res.json();

        // 👇 เก็บแค่ 20 รายการแรก
        setPosts(data.slice(0, 20));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // โหลดเสร็จ
      }
    }

    fetchPosts();
  }, []);
  // 👆 [] = ทำครั้งเดียวตอน component ถูกสร้าง (mount)

  // 👇 filter โพสต์ตามคำค้นหา
  const filtered = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()),
  );

  // 👇 ถ้ากำลังโหลด → แสดง LoadingSpinner
  if (loading) return <LoadingSpinner />;

  // 👇 ถ้ามี error → แสดงข้อความ error
  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  return (
    <div>
      {/* หัวข้อ */}
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        โพสต์ล่าสุด
      </h2>

      {/* ช่องค้นหา */}
      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search} // 👈 มาจาก state
        onChange={(e) => setSearch(e.target.value)}
        // 👈 เปลี่ยนค่า search → ทำให้ filtered เปลี่ยน → render ใหม่
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* ถ้าไม่พบโพสต์ */}
      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      {/* loop แสดงโพสต์ */}
      {filtered.map((post) => (
        <PostCard
          key={post.id} // 👈 สำคัญสำหรับ list
          post={post}
          // 👈 ส่งข้อมูลโพสต์ไปให้ PostCard

          isFavorite={favorites?.includes(post.id)}
          // 👈 มาจาก props (ส่งมาจาก HomePage / Context)

          onToggleFavorite={() => onToggleFavorite(post.id)}
          // 👈 เรียกฟังก์ชันจาก component แม่
        />
      ))}
    </div>
  );
}

// export ไปใช้ใน HomePage
export default PostList;
