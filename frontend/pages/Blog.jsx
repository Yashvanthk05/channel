import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Avatar from "react-avatar";
import ReactMarkdown from "react-markdown";
import NotFound from "../components/NotFound";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const Blog = () => {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/v1/blog/${params.slug}`, {
          method: "GET",
        });
        if (!res.ok) {
          console.log(res.json.message);
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
  }, []);

  if (!loading && !blog)
    return <NotFound message={`${params.slug} Blog Not Found`} />;

  return (
    <div className="flex justify-center min-h-dvh">
      <div className="mt-[20dvh] pb-18 px-2 md:px-24 lg:px-42">
        {loading ? (
          <span className="text-2xl font-bold">Loading...</span>
        ) : (
          <div className="flex flex-col gap-10">
            <div className="flex gap-3 flex-col">
              <span className="text-2xl font-bold">{blog.title}</span>
              <div className="flex gap-2">
                <Avatar
                  name={blog.author.username}
                  size="42"
                  color="orange"
                  round
                  fgColor="#2e2e2e"
                  textSizeRatio={1.8}
                  className=" font-light"
                />
                <div className="flex flex-col">
                  <span className="font-bold text-lg">
                    {blog.author.username}
                  </span>
                  <span className="text-neutral-400">
                    {new Date(blog.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <div className="">
              <span className="italic font-extralight text-lg">Summary</span>
              <span>
                <ReactMarkdown remarkPlugins={[remarkGfm]}
                                      rehypePlugins={[rehypeHighlight]}>{blog.description}</ReactMarkdown>
              </span>
            </div>
            <div className="flex flex-col gap-4 flex-wrap max-w-dvw text-wrap text-sm md:text-lg">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {blog.body}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
