// import hook จาก React
// useState = เก็บข้อมูล posts
// useEffect = ใช้ทำงานเมื่อ favorites เปลี่ยน
import { useState, useEffect } from "react";

// Link = ใช้เปลี่ยนหน้า (routing) แบบไม่ reload
import { Link } from "react-router-dom";

// useFavorites = custom hook ที่ดึงข้อมูลจาก FavoritesContext
import { useFavorites } from "../context/FavoritesContext";

function FavoritesPage() {
  // ดึงข้อมูลจาก Context กลาง (FavoritesProvider)
  // favorites = array ของ postId ที่ผู้ใช้กดถูกใจ
  // toggleFavorite = ฟังก์ชันเพิ่ม/ลบ favorite
  const { favorites, toggleFavorite } = useFavorites();

  // state สำหรับเก็บข้อมูลโพสต์จริง (title, body)
  const [posts, setPosts] = useState([]);

  // useEffect จะทำงานทุกครั้งที่ favorites เปลี่ยน
  useEffect(() => {
    // ถ้าไม่มี favorite → ไม่ต้องดึงข้อมูล
    if (favorites.length === 0) return;

    // ฟังก์ชันดึงข้อมูลโพสต์ที่ถูกใจ
    async function fetchFavoritePosts() {
      // Promise.all = ดึงหลาย API พร้อมกัน
      const results = await Promise.all(
        // วนลูป favorites (ซึ่งเป็น id)
        favorites.map((id) =>
          // เอา id ไปดึงข้อมูลจาก API
          fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((r) =>
            r.json(),
          ),
        ),
      );

      // เอาข้อมูลทั้งหมดมาเก็บใน state posts
      setPosts(results);
    }

    // เรียกฟังก์ชัน
    fetchFavoritePosts();
  }, [favorites]); // ทำงานใหม่เมื่อ favorites เปลี่ยน

  // กรณีไม่มีโพสต์ที่ถูกใจเลย
  if (favorites.length === 0) {
    return (
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#718096", fontSize: "1.1rem" }}>
          ยังไม่มีโพสต์ที่ถูกใจ
        </p>

        {/* ปุ่ม link กลับไปหน้า Home */}
        <Link to="/" style={{ color: "#1e40af" }}>
          ← กลับหน้าหลัก
        </Link>
      </div>
    );
  }

  // ถ้ามี favorite → แสดงรายการโพสต์
  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* หัวข้อ + จำนวน favorite */}
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #e53e3e",
          paddingBottom: "0.5rem",
        }}
      >
        ❤️ โพสต์ที่ถูกใจ ({favorites.length})
      </h2>

      {/* วนลูป posts ที่ได้จาก API */}
      {posts.map((post) => (
        <div
          key={post.id} // React ใช้ key จัดการ list
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            padding: "1rem",
            marginBottom: "1rem",
            background: "white",
          }}
        >
          <h3 style={{ margin: "0 0 0.5rem", color: "#1e40af" }}>
            {/* Link ไปหน้า detail ของ post */}
            <Link
              to={`/posts/${post.id}`} // dynamic route
              style={{ color: "inherit", textDecoration: "none" }}
            >
              {post.title} {/* ชื่อโพสต์ */}
            </Link>
          </h3>

          {/* เนื้อหาโพสต์ */}
          <p style={{ margin: "0 0 0.75rem", color: "#4a5568" }}>{post.body}</p>

          {/* ปุ่มยกเลิก favorite */}
          <button
            onClick={() => toggleFavorite(post.id)} // เรียกจาก Context
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#e53e3e",
              fontSize: "0.9rem",
            }}
          >
            ❤️ ยกเลิกถูกใจ
          </button>
        </div>
      ))}
    </div>
  );
}

// export ให้ Router หรือ App เรียกใช้
export default FavoritesPage;
