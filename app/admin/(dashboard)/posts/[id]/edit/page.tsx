import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
import PostForm from "../../PostForm";

export const dynamic = "force-dynamic";
export const metadata = { title: "Editar notícia" };

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-brand-900">
        Editar notícia
      </h1>
      <PostForm post={post} />
    </div>
  );
}
