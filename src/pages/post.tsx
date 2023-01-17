import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../config/firebase";
import { Post as IPost } from "./main-page";

interface Props {
  post: IPost;
}

export const Post = (props: Props) => {
  const { post } = props;
  const likeRef = collection(db, "likes");
  const likesDoc = query(likeRef, where("postId", "==", post.id));
  const [user] = useAuthState(auth);

  const getLikes = () => {
    getDocs(likesDoc);
  };

  const addLike = async () => {
    await addDoc(likeRef, {
      userId: user?.uid,
      postId: post.id,
    });
  };

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>
      <div className="footer">
        <p>{post.username}</p>
        <button onClick={addLike}> &#128077;</button>
        <p>Likes: {}</p>
      </div>
    </div>
  );
};
