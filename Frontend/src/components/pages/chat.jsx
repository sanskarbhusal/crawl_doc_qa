import React, { useContext, useEffect, useState } from "react";
import { FiPaperclip } from "react-icons/fi";
import { IoMdSend } from "react-icons/io";
import { appContext } from "../../store/storeContext";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const { getAuth, getUserData, isLoggedIn, userData, logout } =
    useContext(appContext);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const init = async () => {
      await getAuth();
      await getUserData();
      setLoading(false);
    };
    init();
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (loading) return <div className="text-white p-10">Loading chat...</div>;

  return (
    <div className="flex w-full h-screen">
      {/* Sidebar */}
      <aside className="w-1/3 px-4 overflow-y-auto bg-zinc-900 border-r border-secondary">
        <div className="sticky top-0 z-10 bg-zinc-900 py-4 flex items-center justify-between gap-3">
          <button
            onClick={handleLogout}
            className="bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium px-4 py-2 rounded-xl hover:cursor-pointer"
          >
            Log Out
          </button>
          <input
            type="text"
            placeholder="Search user or group..."
            className="flex-1 px-4 py-2 text-sm text-white bg-zinc-800 border border-zinc-700 rounded-md"
          />
          <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-xl text-sm font-medium">
            + Add Chat
          </button>
        </div>

        {/* Chat List */}
        <div className="mt-4 flex flex-col gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-zinc-800 p-4 rounded-lg text-white hover:bg-zinc-700 transition"
            >
              Chat {i}
            </div>
          ))}
        </div>
      </aside>

      {/* Chat Window */}
      <main className="w-2/3 flex flex-col bg-zinc-950">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-zinc-900 border-b border-secondary p-4 flex items-center gap-4">
          <img
            src={userData?.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <p className="text-white font-semibold">
              {userData?.username || userData?.displayName ||"Unknown User"}
            </p>
            <p className="text-sm text-zinc-400">Chat description</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse gap-4">
          <div className="self-end bg-zinc-700 text-white px-4 py-3 rounded-xl max-w-xs">
            Sample message (you)
          </div>
          <div className="self-start bg-zinc-600 text-white px-4 py-3 rounded-xl max-w-xs">
            Sample message (them)
          </div>
        </div>

        {/* Attachments Preview */}
        <div className="p-4 grid grid-cols-5 gap-4">
          <div className="w-32 h-32 rounded-xl overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt="Attachment"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Input Section */}
        <div className="p-4 flex items-center gap-3 border-t border-secondary bg-zinc-900">
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xl hover:cursor-pointer">
            <FiPaperclip />
          </button>
          <input
            type="text"
            placeholder="Message"
            className="flex-1 px-4 py-2 text-sm bg-zinc-800 text-white border border-zinc-700 rounded-md"
          />
          <button className="p-3 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white text-xl hover:cursor-pointer">
            <IoMdSend />
          </button>
        </div>
      </main>
    </div>
  );
};
export default Chat;