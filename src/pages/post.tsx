import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../config/firebase";
import { Post as IPost } from "./main-page";

interface Props {
  post: IPost;
}

interface Like {
  userId: string;
}

export const Post = (props: Props) => {
  const { post } = props;
  const likeRef = collection(db, "likes");
  const likesDoc = query(likeRef, where("postId", "==", post.id));
  const [user] = useAuthState(auth);

  const [like, setLike] = useState<Like[] | null>(null);

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLike(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };

  const addLike = async () => {
    await addDoc(likeRef, {
      userId: user?.uid,
      postId: post.id,
    });
    if (user) {
      setLike((prev) =>
        prev ? [...prev, { userId: user?.uid }] : [{ userId: user?.uid }]
      );
    }
  };

  React.useEffect(() => {
    getLikes();
  }, []);

  const hasUserLike = like?.find((element) => element.userId === user?.uid);

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
        <button onClick={addLike}>
          {" "}
          {hasUserLike ? <>&#128078;</> : <>&#128077;</>}
        </button>
        {like && <p>Likes: {like?.length}</p>}
      </div>
    </div>
  );
};
