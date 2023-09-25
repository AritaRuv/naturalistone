
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";


const PrivateRoute = ({ children }) => {

  const router = useRouter();

  useEffect(() => {
    const sessionId = Cookies.get("sessionId");
    if (!sessionId) {
      router.push("/signin");
    }
  }, []);

  return(<>{children}</>);
};

export default PrivateRoute;
