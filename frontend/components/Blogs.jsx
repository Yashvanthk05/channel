import { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Link, useSearchParams } from "react-router-dom";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;

  const [limits, setLimits] = useState(5);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/v1/blog?page=${page}&limit=${limit}`);
        const data = await res.json();
        setBlogs(data.blogs);
        setTotalPages(data.totalPages || 1);
        setLimits(data.limit);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setSearchParams({ page: newPage, limit });
  };

  return (
    <>
      <div className="mt-20 space-y-4">
        <div className="flex gap-2 justify-center items-center">
          <span>Limit:</span>
          <input
            type="number"
            value={limits}
            onChange={(e) => {
              setLimits(e.target.value);
              setSearchParams({ page: page, limit: e.target.value });
            }}
            className="bg-neutral-700 px-3 py-1 rounded"
            min={1}
            max={10}
          />
        </div>

        {loading ? (
          <p className="mt-2 text-xl">Loading...</p>
        ) : (
          <>
            <div className="mt-2 flex justify-center gap-4 flex-wrap">
              {blogs.map((blog) => (
                <Link
                  className="flex flex-col justify-between cursor-pointer h-60 w-94 p-4 bg-neutral-800 rounded-sm"
                  key={blog._id}
                  to={`/blog/${blog.slug}`}
                >
                  <span className="font-bold text-xl">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {blog.title}
                    </ReactMarkdown>
                  </span>
                  <span className="text-justify">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {blog.description.length > 200
                        ? `${blog.description.slice(0, 200)}...`
                        : blog.description}
                    </ReactMarkdown>
                  </span>
                  <div className="mt-2 flex gap-2 items-center">
                    <Avatar
                      name={blog.author.username}
                      size="42"
                      color="orange"
                      round
                      fgColor="#2e2e2e"
                      textSizeRatio={1.8}
                      className=" font-light"
                    />
                    <span className="flex flex-col">
                      <span className="font-bold text-lg">
                        {blog.author.username}
                      </span>
                      <span className="text-neutral-400">
                        {new Date(blog.createdAt).toLocaleString()}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-8 flex justify-center gap-2 items-center">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="p- text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`px-3 py-2 rounded ${
              page === p
                ? "bg-orange-300 text-black"
                : "bg-neutral-800 text-gray-300 hover:bg-neutral-700"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          className="p-2 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronRight />
        </button>
      </div>
    </>
  );
};

export default Blogs;
