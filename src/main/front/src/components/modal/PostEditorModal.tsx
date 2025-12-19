import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { usePostEditorModal } from "@/store/PostEditorModal";
import { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { Image } from "@/types/post";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { useOpenAlertModal } from "@/store/AlertModal";
import { usePostSave } from "@/hooks/usePost";
import axios from "axios";
import { axiosErrorMessageFormat } from "@/utils/errorUtil";
import { toast } from "sonner";

const PostEditorModal = () => {
  const { isOpen, post, close } = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();

  const isEditMode = !!post;

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);
  const [deleteFileIds, setDeleteFileIds] = useState<number[]>([]);
  const [originData, setOriginData] = useState<{
    content: string;
    imageCount: number;
  } | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: postSave, isPending } = usePostSave();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [content]);

  useEffect(() => {
    if (!isOpen) {
      setContent("");
      setDeleteFileIds([]);
      setOriginData(null);

      images.forEach((image) => {
        if (!image.fileId && image.previewUrl)
          URL.revokeObjectURL(image.previewUrl);
      });

      return;
    }

    if (isEditMode && post) {
      setContent(post.content);

      const existingImages: Image[] = (post.files || []).map((file) => ({
        file: null,
        previewUrl: file.fileLoadPath,
        fileId: file.fileId,
      }));

      setImages(existingImages);
      setDeleteFileIds([]);
      setOriginData({
        content: post.content,
        imageCount: post.files?.length || 0,
      });
    } else {
      setContent("");
      setImages([]);
      setDeleteFileIds([]);
      setOriginData({ content: "", imageCount: 0 });
    }

    textareaRef.current?.focus();
  }, [isOpen]);

  const handleCloseModal = () => {
    const isContentChanged = content !== originData?.content;
    const isImageChanged =
      deleteFileIds.length > 0 || images.some((image) => image.file);

    if (isContentChanged || isImageChanged) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => close(),
      });

      return;
    }

    close();
  };

  const handleCreatePostClick = () => {
    const data = {
      postId: post?.postId,
      content: content,
      deleteFileIds: deleteFileIds,
    };

    const newFiles = images
      .filter((image) => image.file)
      .map((image) => image.file as File);

    postSave(
      { data, images: newFiles },
      {
        onSuccess: () => {
          toast.success(
            isEditMode ? "포스트가 수정되었습니다" : "포스트가 등록되었습니다.",
            {
              position: "top-center",
            },
          );

          close();
        },
        onError: (e) => {
          if (axios.isAxiosError(e)) {
            alert(axiosErrorMessageFormat(e));
          }
        },
      },
    );
  };

  const handleSelectImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const newImages: Image[] = files.map((file) => ({
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      setImages((prev) => [...prev, ...newImages]);

      e.target.value = "";
    }
  };

  const handleDeleteImage = (image: Image) => {
    if (image.fileId) {
      setDeleteFileIds((prev) => [...prev, image.fileId as number]);
    } else {
      URL.revokeObjectURL(image.previewUrl);
    }

    setImages((prev) =>
      prev.filter((item) => item.previewUrl !== image.previewUrl),
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>{isEditMode ? "포스트 수정" : "포스트 작성"}</DialogTitle>
        <DialogDescription></DialogDescription>
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="max-h-125 min-h-25 focus:outline-none"
          placeholder="내용을 입력해주세요."
        />
        <input
          onChange={handleSelectImages}
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        {images.length > 0 && (
          <Carousel>
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem className="basis-2/5" key={image.previewUrl}>
                  <div className="relative">
                    <img
                      src={image.previewUrl}
                      className="h-full w-full rounded-sm object-cover"
                    />
                    <div
                      onClick={() => handleDeleteImage(image)}
                      className="absolute top-0 right-0 m-1 cursor-pointer rounded-full bg-black/30 p-1"
                    >
                      <XIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        )}
        <Button
          onClick={() => {
            fileInputRef.current?.click();
          }}
          variant={"outline"}
          className="cursor-pointer"
        >
          <ImageIcon />
          이미지 추가
        </Button>
        <Button
          onClick={handleCreatePostClick}
          className="cursor-pointer"
          disabled={isPending}
        >
          {isEditMode ? "수정" : "저장"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditorModal;
