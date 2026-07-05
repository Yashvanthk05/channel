import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NotFound from "../components/NotFound";

const Edit = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");
  const [status, setStatus] = useState("public");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/v1/blog/${slug}`);
        if (!res.ok) {
          setError(true);
          return;
        }
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setBody(data.body);
        setStatus(data.status || "public");
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`/api/v1/blog/${slug}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          body,
          status,
        }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        toast.error(data.message || "Failed to update blog");
        return;
      }

      toast.success("Blog updated successfully!");
      if(data.slug || (data.blog && data.blog.slug)) {
         navigate(`/blog/${data.slug || data.blog.slug}`);
      } else {
         navigate(`/blog/${slug}`);
      }
    } catch (err) {
      console.error(err);
      toast.error("Internal Server Error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-dvh flex justify-center mt-20 text-xl">Loading...</div>;
  }

  if (error) {
    return <NotFound message="Blog Not Found or You don't have permission" />;
  }

  return (
    <div className="flex justify-center min-h-dvh">
      <div className="mt-[15dvh] pb-18 px-2 md:px-10 lg:px-24 w-full max-w-5xl">
        <h1 className="text-3xl font-bold mb-8 text-neutral-200">Edit Blog</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-lg font-bold text-neutral-300">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              required
              className="bg-neutral-800 text-neutral-100 border border-neutral-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-lg font-bold text-neutral-300">
              Description / Summary (Max 200 chars)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of your post..."
              maxLength={200}
              required
              className="bg-neutral-800 text-neutral-100 border border-neutral-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 min-h-24 resize-y"
            />
            <span className="text-right text-xs text-neutral-400">
              {description.length}/200
            </span>
          </div>

          <div className="flex flex-col gap-2" data-color-mode="dark">
            <label className="text-lg font-bold text-neutral-300">Content</label>
            <MDEditor
              value={body}
              onChange={setBody}
              height={400}
              className="mt-2 text-neutral-100"
              preview="edit"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="text-lg font-bold text-neutral-300">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="bg-neutral-800 text-neutral-100 border border-neutral-700 px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 w-full sm:w-48"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>

          <div className="mt-4 flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-md font-bold transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={() => navigate(`/blog/${slug}`)}
              className="bg-neutral-700 hover:bg-neutral-600 text-neutral-100 px-6 py-2 rounded-md font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Edit;
