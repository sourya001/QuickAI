import { useUser, useAuth } from "@clerk/clerk-react";
import React from "react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart } from "lucide-react";
import { useEffect } from "react";
import axios from "axios";
import customToast from "../utils/toast";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// Community page to display user creations
// This page fetches and displays creations made by users in the community
const Community = () => {
  const [creations, setCreations] = React.useState([]);
  const { user } = useUser();
  const [loading, setLoading] = React.useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: { Authorization: `Bearer ${await getToken()}` },
      });
      if (data.success) {
        setCreations(data.creations);
      } else {
        customToast.error(data.message || "Failed to fetch creations.");
      }
    } catch (error) {
      customToast.error(error.message || "Failed to fetch creations.");
    }
    setLoading(false);
  };

  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creation",
        { id },
        {
          headers: { Authorization: `Bearer ${await getToken()}` },
        }
      );

      if (data.success) {
        customToast.success(data.message || "Creation liked/unliked successfully.");
        await fetchCreations();
      } else {
        customToast.error(data.message || "Failed to like/unlike creation.");
      }
    } catch (error) {
      customToast.error(error.message || "Failed to like/unlike creation.");
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return !loading ? (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      Creations
      <div className="bg-white h-full w-full rounded-xl overflow-y-scroll">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="relative group inline-block pl-3 pt-3 w-full sm:max-w-1/2 lg:max-w-1/3"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 top-0 right-0 left-3 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/80 text-white rounded-lg">
              <p className="text-sm hidden group-hover:block">
                {creation.prompt}
              </p>
              <div className="flex gap-1 items-center">
                <p>{creation.likes.length}</p>
                <Heart
                  onClick={() => imageLikeToggle(creation.id)}
                  className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                    user && creation.likes.includes(user.id)
                      ? "fill-red-500 text-red-600"
                      : "text-white"
                  }`}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : (
    <div className="flex h-full items-center justify-center">
      <span className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></span>
    </div>
  );
};
import { Sparkles, FileText } from "lucide-react";
export default Community;
