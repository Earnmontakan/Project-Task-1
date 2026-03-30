// import component UserList มาใช้
// UserList = component ที่ไปดึงข้อมูล user จาก API แล้วแสดงผล
import UserList from "../components/UserList";

function ProfilePage() {
  // component หน้านี้มีหน้าที่ "เป็นหน้าครอบ"
  // แล้วเรียก UserList มาแสดง
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "0 1rem" }}>
      {/* เรียกใช้ UserList */}
      {/* 👉 UserList จะไป fetch API เอง และ render รายชื่อ user */}
      <UserList />
    </div>
  );
}

// export เพื่อให้ Router หรือ App เรียกใช้หน้านี้
export default ProfilePage;
