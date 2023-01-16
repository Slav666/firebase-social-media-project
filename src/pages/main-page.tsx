import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  username: string;
  title: string;
  description: string;
}
export const Main = () => {
  const postsRef = collection(db, "posts");
  const [postsList, setPostList] = useState<Post[] | null>(null);
  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  getPosts();
  return (
    <h1>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </h1>
  );
};
