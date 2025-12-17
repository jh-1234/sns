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

const PostEditorModal = () => {
  const { isOpen, close } = usePostEditorModal();
  const openAlertModal = useOpenAlertModal();

  const [content, setContent] = useState("");
  const [images, setImages] = useState<Image[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: postSave, isPending } = usePostSave();

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  });

  useEffect(() => {
    if (!isOpen) {
      images.forEach((image) => {
        URL.revokeObjectURL(image.previewUrl);
      });

      return;
    }

    setContent("");
    setImages([]);
    textareaRef.current?.focus();
  }, [isOpen]);

  const handleCloseModal = () => {
    if (content !== "" || images.length > 0) {
      openAlertModal({
        title: "게시글 작성이 마무리 되지 않았습니다.",
        description: "이 화면에서 나가면 작성중이던 내용이 사라집니다.",
        onPositive: () => {
          close();
        },
      });

      return;
    }

    close();
  };

  const handleCreatePostClick = () => {
    const data = {
      content,
    };

    const files = images.map((img) => img.file);

    postSave(
      { data, images: files },
      {
        onSuccess: () => {
          alert("포스트가 등록되었습니다.");
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

      files.forEach((file) => {
        setImages((prev) => [
          ...prev,
          { file, previewUrl: URL.createObjectURL(file) },
        ]);
      });
    }

    e.target.value = "";
  };

  const handleDeleteImage = (image: Image) => {
    setImages((prevImages) =>
      prevImages.filter((item) => item.previewUrl !== image.previewUrl),
    );

    URL.revokeObjectURL(image.previewUrl);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleCloseModal}>
      <DialogContent className="max-h-[90vh]">
        <DialogTitle>포스트 작성</DialogTitle>
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
          저장
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default PostEditorModal;
