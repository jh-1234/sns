import CreatePostButton from "@/components/post/CreatePostButton";
import PostFeed from "@/components/post/PostFeed";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";
import { useSetSession } from "@/store/Session";
import { useNavigate } from "react-router";

const Index = () => {
  const navigate = useNavigate();
  const setSession = useSetSession();

  const { mutate: logout } = useLogout();

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setSession(null);
        navigate("/login", { replace: true });
      },
      onError: (e) => {
        console.error(e);
      },
    });
  };

  return (
    <div className="flex flex-col gap-10">
      <CreatePostButton />
      <PostFeed />
      <Button onClick={handleLogout}>로그아웃</Button>
    </div>
  );
};

export default Index;
