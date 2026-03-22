import { useFavorites } from "../context/FavoritesContext"; // 1. นำเข้า hook ที่คุณสร้างไว้
import PostList from "../components/PostList";
import AddPostForm from "../components/AddPostForm";

function HomePage() {
  // 2. เรียกใช้งาน hook ตัวนี้ (มันจะดึง favorites และ toggleFavorite มาให้เลย)
  const { favorites, toggleFavorite } = useFavorites(); 

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <AddPostForm onAddPost={() => {}} />
      {/* 3. ส่งข้อมูลที่ได้ไปให้ PostList */}
      <PostList 
        favorites={favorites} 
        onToggleFavorite={toggleFavorite} 
      />
    </div>
  );
}

export default HomePage;