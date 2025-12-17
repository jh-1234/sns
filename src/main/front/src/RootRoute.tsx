import { Route, Routes } from "react-router";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Join from "./pages/Join";
import PostDetail from "./pages/PostDetail";
import ProfileDetail from "./pages/ProfileDetail";
import AccountInfoUpdate from "./pages/AccountInfoUpdate";
import GlobalLayout from "./components/layout/GlobalLayout";
import AuthLayout from "./components/layout/AuthLayout";
import GuestFilter from "./filters/GuestFilter";
import NotFound from "./pages/NotFound";
import AuthFilter from "./filters/AuthFilter";
import ForgetPassword from "./pages/ForgetPassword";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route element={<GuestFilter />}>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>
      </Route>
      <Route element={<AuthFilter />}>
        <Route element={<GlobalLayout />}>
          <Route path="/" element={<Index />} />

          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/profile/:userId" element={<ProfileDetail />} />
          <Route path="/reset-password" element={<AccountInfoUpdate />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
