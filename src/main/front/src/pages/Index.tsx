import CreatePostButton from "@/components/post/CreatePostButton";
import PostFeed from "@/components/post/PostFeed";

const Index = () => {
  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostFeed />
    </div>
  );
};

export default Index;
