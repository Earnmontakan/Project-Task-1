// ฟังก์ชัน Component ชื่อ UserCard
// รับ props จาก component อื่น (เช่น App.jsx หรือ HomePage.jsx)
// โดยรับค่า name และ email เข้ามาใช้งาน
function UserCard({ name, email }) {
  // ส่วนนี้คือการเอา "ชื่อ" (name) ที่รับมา
  // มาสร้างเป็นตัวอักษรย่อ (avatar)
  // เช่น "John Doe" → "JD"
  const initials = name
    .split(" ") // แยกชื่อด้วยช่องว่าง → ["John", "Doe"]
    .map((n) => n[0]) // เอาตัวอักษรตัวแรกของแต่ละคำ → ["J", "D"]
    .join(""); // รวมกลับเป็น string → "JD"

  // return คือสิ่งที่จะแสดงผลบนหน้าเว็บ (UI)
  return (
    <div
      // กล่องหลักของ UserCard (container)
      // ใช้ flex เพื่อจัด layout แนวนอน
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        border: "1px solid #e2e8f0",
        borderRadius: "8px",
        padding: "0.75rem 1rem",
        marginBottom: "0.75rem",
        background: "white",
      }}
    >
      <div
        // วงกลม avatar ด้านซ้าย
        // แสดงตัวอักษรย่อ (initials) ที่คำนวณจาก name
        style={{
          width: "40px",
          height: "40px",
          background: "#1e40af",
          color: "white",
          borderRadius: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "0.9rem",
        }}
      >
        {initials} {/* เอาค่าที่คำนวณได้มาแสดง */}
      </div>

      <div>
        {/* แสดงชื่อ (มาจาก props.name) */}
        <div style={{ fontWeight: "bold", color: "#2d3748" }}>{name}</div>

        {/* แสดงอีเมล (มาจาก props.email) */}
        <div style={{ fontSize: "0.85rem", color: "#718096" }}>{email}</div>
      </div>
    </div>
  );
}

// export ออกไปให้ไฟล์อื่นเรียกใช้ได้
// เช่น import UserCard from "./components/UserCard";
export default UserCard;
