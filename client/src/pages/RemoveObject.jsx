import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import customToast from "../utils/toast";
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const RemoveObject = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input) {
      customToast.error("Please select an image file.");
      return;
    }
    
    if (!object.trim()) {
      customToast.error("Please describe the object to remove.");
      return;
    }
    
    if (object.split(" ").length > 1) {
      customToast.error("Please provide a single object to remove.");
      return;
    }
    
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object.trim());

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data.success) {
        setContent(data.content);
        customToast.success("Object removed successfully!");
      } else {
        customToast.error(data.message || "Failed to remove object.");
      }
    } catch (error) {
      console.error("Error removing object:", error);
      customToast.error(error.response?.data?.message || error.message || "Failed to remove object.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/*left side*/}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Object Remover</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload Image</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          accept="image/*"
          type="file"
          className="text-gray-600 w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
          required
        />

        <p className="mt-6 text-sm font-medium">
          Describe object name to remove
        </p>

        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="w-full p-2 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Explain what to remove(only single object at a time)."
          required
        />

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
          Remove Object
        </button>
      </form>

      {/*right side*/}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 ">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        {
          !content ? ( <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
            <Scissors className="w-9 h-9" />
            <p>Please upload an image to remove the object.</p>
          </div>
        </div>) :(
          <img src={content} alt="image" className="mt-3 w-full h-full"/>
        )
        }
       
      </div>
    </div>
  );
};

export default RemoveObject;
