import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface CreateDataForm {
  title: string;
  description: string;
}

export const CreateForm = () => {
  const [user] = useAuthState(auth);
  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("You must add a description"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDataForm>({
    resolver: yupResolver(schema),
  });

  const postRef = collection(db, "posts");
  const onCreatePost = async (data: CreateDataForm) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title..." {...register("title")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <input placeholder="Description..." {...register("description")} />
      <p style={{ color: "red" }}>{errors.title?.message}</p>
      <input type="submit" />
    </form>
  );
};
