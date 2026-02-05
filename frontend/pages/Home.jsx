import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import Avatar from "react-avatar";
import { Link, useSearchParams } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 1;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`/api/v1/blog?page=${page}&limit=${limit}`);
        const data = await res.json();
        setBlogs(data.blogs);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="min-h-dvh flex justify-center">
      <div className="w-full mt-[30dvh]">
        <div className="flex flex-col w-full items-center gap-2">
          <span className="font-serif text-3xl">Welcome to Channel</span>
          <span className="font-mono text-xl">
            A Markdown Based Blogging Platform
          </span>
          <div className="mt-5 flex gap-5 font-extrabold text-xl">
            <Link to="/create">
              Create <span className="text-orange-300">Blog</span>
            </Link>
          </div>
        </div>
        <div className="mt-20 space-y-4">
          {loading ? (
            <p className="mt-2 text-xl">Loading...</p>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
