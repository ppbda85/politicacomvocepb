import PostForm from "../PostForm";

export const metadata = { title: "Nova notícia" };

export default function NewPostPage() {
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-900">
        Nova notícia
      </h1>
      <PostForm />
    </div>
  );
}
