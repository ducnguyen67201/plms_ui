import { useSelector } from "react-redux";
import UserState from "@/lib/store/slices/loginSlice";
import AdminPage from "./admin";
import UserPage from "./user";

export default function HomePage() {
	const userState = useSelector((state: { login: ReturnType<typeof UserState> }) => state.login);
	return userState.role == "Admin" ? <AdminPage /> : <UserPage />;
}
