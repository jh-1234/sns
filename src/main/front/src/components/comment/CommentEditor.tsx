import { useCommentSave, useCommentUpdate } from "@/hooks/usePost";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useEffect, useRef, useState } from "react";
import type { Comment } from "@/types/post";

const CommentEditor = ({
  postId,
  comment,
  isEditing = false,
  onCancel,
}: {
  postId?: number;
  comment?: Comment;
  isEditing?: boolean;
  onCancel?: () => void;
}) => {
  const { mutate: save } = useCommentSave();
  const { mutate: update } = useCommentUpdate();

  const [content, setContent] = useState("");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing) {
      if (comment) {
        setContent(comment.content);
      }

      textareaRef.current?.focus();
    }
  }, []);

  const handleSave = () => {
    if (postId) {
      save(
        { postId, content },
        {
          onSuccess: () => {
            setContent("");
          },
        },
      );

      return;
    }

    if (comment) {
      update(
        {
          commentId: comment.commentId,
          content: content,
          postId: comment.postId,
        },
        {
          onSuccess: () => {
            if (onCancel) onCancel();
          },
        },
      );
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <Textarea
        ref={textareaRef}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex justify-end gap-2">
        <Button onClick={handleSave} className="cursor-pointer">
          {isEditing ? "수정" : "작성"}
        </Button>
        {isEditing && (
          <Button
            className="cursor-pointer"
            variant={"secondary"}
            onClick={onCancel}
          >
            취소
          </Button>
        )}
      </div>
    </div>
  );
};

export default CommentEditor;
