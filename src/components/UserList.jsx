// import Hook จาก React
// useState = ใช้เก็บข้อมูล (state)
// useEffect = ใช้ทำงานตอน component โหลด (เช่น fetch API)
import { useState, useEffect } from "react";

// import Component อื่นมาใช้
// UserCard = เอาไว้แสดงข้อมูล user ทีละคน
import UserCard from "./UserCard";

// LoadingSpinner = เอาไว้แสดงตอนกำลังโหลดข้อมูล
import LoadingSpinner from "./LoadingSpinner";

function UserList() {
  // state เก็บข้อมูล users (เริ่มต้นเป็น array ว่าง)
  const [users, setUsers] = useState([]);

  // state สำหรับเช็คว่าโหลดอยู่ไหม (true = กำลังโหลด)
  const [loading, setLoading] = useState(true);

  // useEffect จะทำงาน "ครั้งแรกตอน component ถูก render"
  useEffect(() => {
    // ฟังก์ชันดึงข้อมูลจาก API
    async function fetchUsers() {
      try {
        // ไปดึงข้อมูลจาก API ภายนอก (jsonplaceholder)
        const res = await fetch("https://jsonplaceholder.typicode.com/users");

        // แปลงข้อมูลเป็น JSON
        const data = await res.json();

        // เอาข้อมูลที่ได้มาเก็บใน state users
        setUsers(data);
      } catch {
        // กรณี error (ยังไม่ได้เขียนอะไรเพิ่ม)
      } finally {
        // ไม่ว่าจะสำเร็จหรือ error → หยุด loading
        setLoading(false);
      }
    }

    // เรียกใช้ฟังก์ชัน fetchUsers
    fetchUsers();
  }, []); // [] = ให้ทำงานแค่ครั้งเดียวตอนโหลดหน้า

  // ถ้ายังโหลดอยู่ → แสดง LoadingSpinner แทน
  if (loading) return <LoadingSpinner />;

  // เมื่อโหลดเสร็จแล้ว → แสดง UI ด้านล่าง
  return (
    <div>
      <h2
        // หัวข้อ "สมาชิก"
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>

      {/* วนลูป users ที่ได้จาก API */}
      {users.map((user) => (
        // ส่งข้อมูลไปให้ UserCard ทีละคน (props)
        // user.id → ใช้เป็น key (React ใช้จัดการ list)
        // user.name → ส่งไปเป็น name
        // user.email → ส่งไปเป็น email
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

// export เพื่อให้ไฟล์อื่นเรียกใช้ เช่น App.jsx
export default UserList;
