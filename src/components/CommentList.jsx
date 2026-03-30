import { useState, useEffect } from "react"; // hook สำหรับ state และ side effect
import LoadingSpinner from "./LoadingSpinner";
// 👆 import มาจากไฟล์ LoadingSpinner.jsx (component แสดง loading)
// แต่ในโค้ดนี้ยังไม่ได้ใช้จริง (ใช้เป็นข้อความแทน)

// Component สำหรับแสดงรายการความคิดเห็นของโพสต์ (ถูกเรียกจาก PostCard)
function CommentList({ postId }) {
  // 👇 state ภายใน component นี้เอง
  const [comments, setComments] = useState([]); // เก็บข้อมูล comment จาก API
  const [loading, setLoading] = useState(true); // เช็คสถานะกำลังโหลด
  const [error, setError] = useState(null); // เก็บ error

  // useEffect ทำงานเมื่อ:
  // 1. component ถูก render ครั้งแรก
  // 2. postId เปลี่ยน (เชื่อมกับ PostCard)
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลจาก API ภายนอก
    async function fetchComments() {
      try {
        setLoading(true); // เริ่มโหลด

        // 👇 เรียก API โดยใช้ postId (มาจาก PostCard)
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        );

        // ถ้า API error
        if (!res.ok) throw new Error("ดึงความคิดเห็นไม่สำเร็จ");

        // แปลงเป็น JSON
        const data = await res.json();

        // 👇 เอาข้อมูลมาเก็บใน state
        setComments(data);
      } catch (err) {
        // ถ้ามี error → เก็บ message
        setError(err.message);
      } finally {
        // หยุด loading ไม่ว่าจะสำเร็จหรือ error
        setLoading(false);
      }
    }

    // เรียกใช้งาน
    fetchComments();
  }, [postId]);
  // 👆 ถ้า postId เปลี่ยน → จะ fetch ใหม่
  // (เชื่อมกับ PostCard ที่ส่ง post.id มา)

  // 👇 ถ้ากำลังโหลด
  if (loading)
    return <p style={{ color: "#718096" }}>กำลังโหลดความคิดเห็น...</p>;
  // (จริง ๆ สามารถเปลี่ยนเป็น <LoadingSpinner /> ได้)

  // 👇 ถ้ามี error
  if (error) return <p style={{ color: "#c53030" }}>{error}</p>;

  return (
    <div style={{ marginTop: "0.75rem" }}>
      {/* แสดงจำนวนความคิดเห็น */}
      <strong style={{ color: "#4a5568" }}>
        ความคิดเห็น ({comments.length})
      </strong>

      {/* loop แสดง comment ทีละตัว */}
      {comments.map((comment) => (
        <div
          key={comment.id} // 👈 ต้องมี key เพื่อให้ React track list ได้
          style={{
            background: "#f7fafc",
            borderRadius: "6px",
            padding: "0.5rem 0.75rem",
            marginTop: "0.5rem",
            fontSize: "0.85rem",
          }}
        >
          {/* ชื่อคนคอมเมนต์ (มาจาก API) */}
          <div style={{ fontWeight: "bold", color: "#2d3748" }}>
            {comment.name}
          </div>

          {/* เนื้อหาคอมเมนต์ (มาจาก API) */}
          <div style={{ color: "#718096" }}>{comment.body}</div>
        </div>
      ))}
    </div>
  );
}

// export ไปใช้ใน PostCard
export default CommentList;
