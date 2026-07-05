import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Avatar from "react-avatar";
import MDEditor from "@uiw/react-md-editor";
import NotFound from "../components/NotFound";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Pencil, Trash2 } from "lucide-react";

const Blog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/v1/blog/${params.slug}`, {
          method: "GET",
        });
        if (!res.ok) {
          console.log("Blog fetch failed");
          return;
        }
        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [params.slug]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      const res = await fetch(`/api/v1/blog/${params.slug}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success("Blog deleted successfully");
        navigate("/");
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete");
      }
    } catch (err) {
      toast.error("Internal Server Error");
    }
  };

  if (!loading && !blog)
    return <NotFound message={`${params.slug} Blog Not Found`} />;

  const isAuthor = user && blog && user._id === blog.author?._id;

  return (
    <div className="flex justify-center min-h-dvh">
      <div className="mt-[20dvh] pb-18 px-2 md:px-24 lg:px-42 w-full max-w-6xl">
        {loading ? (
          <span className="text-2xl font-bold">Loading...</span>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex gap-3 flex-col relative group">
              <span className="text-4xl font-bold">{blog.title}</span>
              <div className="flex justify-between items-center flex-wrap gap-4">
                <div className="flex gap-4 items-center">
                  <Avatar
                    name={blog.author.username}
                    size="46"
                    color="orange"
                    round
                    fgColor="#2e2e2e"
                    textSizeRatio={1.8}
                    className="font-light shadow-md"
                  />
                  <div className="flex flex-col">
                    <span className="font-bold text-xl">
                      {blog.author.username}
                    </span>
                    <span className="text-neutral-400 text-sm">
                      {new Date(blog.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>

                {isAuthor && (
                  <div className="flex gap-3">
                    <Link
                      to={`/edit/${blog.slug}`}
                      className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
                    >
                      <Pencil size={18} />
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                    <button
                      onClick={handleDelete}
                      className="flex items-center gap-2 px-4 py-2 bg-red-900/50 hover:bg-red-800 text-red-200 rounded transition-colors"
                    >
                      <Trash2 size={18} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="p-6 bg-neutral-900 rounded-lg border border-neutral-800" data-color-mode="dark">
              <span className="italic font-bold text-lg mb-4 block text-neutral-400">Summary</span>
              <MDEditor.Markdown source={blog.description} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }} />
            </div>

            <div className="flex flex-col gap-4 text-neutral-200 text-base md:text-lg leading-relaxed" data-color-mode="dark">
              <MDEditor.Markdown source={blog.body} style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
