import { useState } from "react"; // hook ของ React สำหรับเก็บ state

// Component สำหรับเพิ่มโพสต์ใหม่ (ถูกเรียกใช้จากหน้า HomePage หรือหน้าหลัก)
function AddPostForm({ onAddPost }) {
  // 👇 state ภายใน component นี้ (ไม่ได้มาจากที่อื่น)
  const [title, setTitle] = useState(""); // เก็บหัวข้อโพสต์
  const [body, setBody] = useState(""); // เก็บเนื้อหาโพสต์

  // ฟังก์ชันตอนกด submit ฟอร์ม
  function handleSubmit(e) {
    e.preventDefault(); // ป้องกันหน้า reload (สำคัญมากใน React)

    // เช็คว่าห้ามกรอกว่าง
    if (!title.trim() || !body.trim()) return;

    // 👇 ส่งข้อมูล "ขึ้นไป" ให้ component แม่ (เช่น HomePage)
    // onAddPost ถูกส่งเข้ามาทาง props
    onAddPost({ title, body });

    // ล้างค่า input หลังโพสต์เสร็จ
    setTitle("");
    setBody("");
  }

  return (
    // ฟอร์มหลัก (เมื่อ submit จะเรียก handleSubmit)
    <form
      onSubmit={handleSubmit}
      style={{
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "1rem",
        marginBottom: "1.5rem",
        background: "#f7fafc",
      }}
    >
      {/* หัวข้อฟอร์ม */}
      <h3 style={{ margin: "0 0 0.75rem", color: "#2d3748" }}>
        เพิ่มโพสต์ใหม่
      </h3>

      {/* input สำหรับกรอกหัวข้อโพสต์ */}
      <input
        type="text"
        placeholder="หัวข้อโพสต์"
        value={title} // 👈 มาจาก state ใน component นี้
        onChange={(e) => setTitle(e.target.value)}
        // 👈 อัปเดต state ทุกครั้งที่พิมพ์
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.5rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          boxSizing: "border-box",
        }}
      />

      {/* textarea สำหรับกรอกเนื้อหาโพสต์ */}
      <textarea
        placeholder="เนื้อหาโพสต์"
        value={body} // 👈 มาจาก state
        onChange={(e) => setBody(e.target.value)}
        // 👈 อัปเดต state
        rows={3}
        style={{
          width: "100%",
          padding: "0.5rem",
          marginBottom: "0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "4px",
          fontSize: "1rem",
          resize: "vertical",
          boxSizing: "border-box",
        }}
      />

      {/* ปุ่ม submit */}
      <button
        type="submit" // 👈 กดแล้วจะ trigger onSubmit ของ form
        style={{
          background: "#1e40af",
          color: "white",
          border: "none",
          padding: "0.5rem 1.5rem",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem",
        }}
      >
        โพสต์
      </button>
    </form>
  );
}

// export component ไปใช้ในไฟล์อื่น (เช่น HomePage)
export default AddPostForm;
