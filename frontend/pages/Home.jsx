import { Link } from "react-router-dom";
import Blogs from "../components/Blogs";

const Home = () => {
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
        <Blogs />
      </div>
    </div>
  );
};

export default Home;
