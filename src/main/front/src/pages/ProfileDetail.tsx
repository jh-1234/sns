import PostFeed from "@/components/post/PostFeed";
import ProfileInfo from "@/components/profile/ProfileInfo";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router";

const ProfileDetail = () => {
  const params = useParams();
  const uuid = params.uuid;

  if (!uuid) return <Navigate to={"/"} replace />;

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <ProfileInfo uuid={uuid} />
      <div className="border-b"></div>
      <PostFeed uuid={uuid} />
    </div>
  );
};

export default ProfileDetail;
