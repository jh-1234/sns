import { LoaderCircleIcon } from "lucide-react";

const Loader = () => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-5">
      <LoaderCircleIcon className="animate-spin" />
      <div className="text-sm">데이터를 불러오는 중...</div>
    </div>
  );
};

export default Loader;
