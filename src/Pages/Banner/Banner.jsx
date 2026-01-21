import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Contest_6 from "../../data/Contest_six.json";

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  
  const contestRef = useRef({
    flyTo: (contest) => {
      // Navigate to contest details page with animation/transition
      navigate(`/detail/${contest._id}`);
    }
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // backend query will go here later
    const form = e.target;
    const search = form.search.value;
    const contest = Contest_6.find(c => c.name.toLowerCase().includes(search.toLowerCase()));
    if (contest) {
      console.log("Found contest:", contest);
      contestRef.current.flyTo(contest);
    } else {
      console.log("No contest found for:", search);
    }

        console.log("Searching for:", search);
  };

  return (
    <section className="relative bg-[url('/contest2.jpg')] text-white py-24 px-4 overflow-hidden bg-cover bg-center bg-no-repeat">
      
      {/* Soft background glow */}
      <div className="absolute inset-0 bg-black/20"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          BattleOfBrains
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-200 mb-10"
        >
          Where creativity meets competition
        </motion.p>

        {/* Search */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center bg-white rounded-full shadow-lg overflow-hidden max-w-xl mx-auto"
        >
          <input
            type="search"
            placeholder="Search contest types (coding, design, math...)"
            className="flex-1 px-6 py-4 text-gray-800 outline-none"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            
          />
          <button
            type="submit" 
            className="bg-primary text-white px-6 py-4 hover:bg-primary-focus transition"
          >
            <FaSearch />
          </button>
        </motion.form>

      </div>
    </section>
  );
};

export default Banner;
