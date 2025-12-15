import { getUsers } from "@/api/test";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useLogout";
import { useQuery } from "@tanstack/react-query";

const Index = () => {
  const { data: users } = useQuery({
    queryFn: getUsers,
    queryKey: ["users"],
  });

  const { mutate: logout } = useLogout();

  return (
    <>
      {users && users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.userId}>{user.name}</li>
          ))}
        </ul>
      ) : (
        <div>-----</div>
      )}

      <Button onClick={() => logout()}>로그아웃</Button>
    </>
  );
};

export default Index;
