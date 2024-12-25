import { useAuth } from "@/context/context";
import { useEffect } from "react";

const Logout = () => {
	const { logoutUser } = useAuth();

	useEffect(() => {
		logoutUser();
	}, [logoutUser]);

	return null;
};

export default Logout;