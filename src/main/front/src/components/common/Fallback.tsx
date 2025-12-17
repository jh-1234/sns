import { TriangleAlert } from "lucide-react";

const Fallback = () => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-2">
      <TriangleAlert className="h-6 w-6" />
      <div>오류가 발생했습니다.</div>
    </div>
  );
};

export default Fallback;
