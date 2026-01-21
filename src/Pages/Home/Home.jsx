import { Suspense } from "react";
import { Link, useLoaderData } from "react-router-dom";
import Additional from "../Additional/Additional";
import Banner from "../Banner/Banner";
import Contest_6_info from "../Contest_6_info/Contest_6_info";


const Home = () => {
    const contest = useLoaderData();
    return (
        <div>
            <Banner></Banner>

            <div className="my-16 text-center">
                <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
                    Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                        Contests
                    </span>
                </h2>

                <p className="mt-4 text-lg md:text-xl text-gray-500 max-w-xl mx-auto">
                    Join exciting challenges and showcase your skills to the world.
                </p>

                <div className="mt-6 flex justify-center">
                    <span className="w-24 h-1 rounded-full bg-gradient-to-r from-primary to-purple-600"></span>
                </div>
            </div>



            <div className="grid lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-1 justify-items-center mx-6 mb-12">
                <Suspense fallback={<span className="loading loading-spinner loading-xl"></span>}>
                    {
                        contest.map((d) => <Contest_6_info key={d._id} d={d}></Contest_6_info>)
                    }
                </Suspense>
            </div>
            <div className="flex justify-center items-center">
                <Link
                    to="/all"
                    className="btn bg-white text-primary text-xl p-6 hover:bg-gray-100 mb-6 rounded-2xl border border-cyan-800"
                >
                    Explore All Contests
                </Link>
            </div>
            <Additional></Additional>

        </div>
    );
};

export default Home;