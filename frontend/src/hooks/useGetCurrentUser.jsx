import { useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../App.jsx";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const result = await axios.get(
          `${serverUrl}/api/user/current`,
          { withCredentials: true }
        );

        dispatch(setUserData(result.data));
      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };

    fetchCurrentUser();
  }, [dispatch]);
}

export default useGetCurrentUser;