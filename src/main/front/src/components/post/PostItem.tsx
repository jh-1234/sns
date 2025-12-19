import type { Post } from "@/types/post";
import defaultProfile from "@/assets/default-profile.png";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { MessageCircle } from "lucide-react";
import { formatTimeAgo } from "@/lib/time";
import EditPostButton from "./EditPostButton";
import DeletePostButton from "./DeletePostButton";
import { useSession } from "@/store/Session";
import LikePostButton from "./LikePostButton";

const PostItem = (post: Post) => {
  const session = useSession();
  const seq = session?.seq;

  const isMine = post.authorId === seq;

  return (
    <div className="flex flex-col gap-4 border-b pb-8">
      <div className="flex justify-between">
        <div className="flex items-start gap-4">
          <img
            src={post.profileUrl || defaultProfile}
            className="h-10 w-10 rounded-full object-cover"
          />
          <div>
            <div className="font-bold hover:underline">{post.authorName}</div>
            <div className="text-muted-foreground text-sm">
              {post.createdDate && formatTimeAgo(post.createdDate)}
            </div>
          </div>
        </div>

        <div className="text-muted-foreground flex text-sm">
          {isMine && (
            <>
              <EditPostButton post={post} />
              <DeletePostButton postId={post.postId!} />
            </>
          )}
        </div>
      </div>

      <div className="flex cursor-pointer flex-col gap-5">
        <div className="line-clamp-2 wrap-break-word whitespace-pre-wrap">
          {post.content}
        </div>

        <Carousel>
          <CarouselContent>
            {post.files?.map((file, index) => (
              <CarouselItem className={`basis-3/5`} key={index}>
                <div className="overflow-hidden rounded-xl">
                  <img
                    src={file.fileLoadPath}
                    className="h-full max-h-[350px] w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="flex gap-2">
        <LikePostButton
          postId={post.postId!}
          isLiked={post.isLiked!}
          likeCount={post.likeCount!}
        />
      </div>

      <div className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded-xl border p-2 px-4 text-sm">
        <MessageCircle className="h-4 w-4" />
        <span>댓글달기</span>
      </div>
    </div>
  );
};

export default PostItem;
