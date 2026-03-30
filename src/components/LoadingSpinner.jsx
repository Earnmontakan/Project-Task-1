// Component สำหรับแสดง loading (วงกลมหมุน)
// 👉 เป็น component กลาง (reusable) ใช้ได้หลายที่ในโปรเจค
function LoadingSpinner() {
  return (
    // container หลัก (จัดให้อยู่กลาง + เว้นระยะ)
    <div style={{ textAlign: "center", padding: "3rem", color: "#718096" }}>
      {/* วงกลม spinner */}
      <div
        style={{
          display: "inline-block", // ทำให้อยู่ตรงกลาง
          width: "40px",
          height: "40px",
          border: "4px solid #e2e8f0", // สีขอบรอบวง
          borderTopColor: "#1e40af", // สีด้านบน (เอาไว้ให้เห็นตอนหมุน)
          borderRadius: "50%", // ทำให้เป็นวงกลม
          animation: "spin 0.8s linear infinite", // ใส่ animation ให้หมุนตลอด
        }}
      />

      {/* ข้อความแสดงสถานะ */}
      <p style={{ marginTop: "1rem" }}>กำลังโหลด...</p>

      {/* CSS animation (กำหนดการหมุน) */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); } // หมุนครบ 360 องศา
        }
      `}</style>
    </div>
  );
}

// export component ไปใช้ที่อื่น
export default LoadingSpinner;
