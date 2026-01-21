import { Suspense, lazy, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
// import Contest_All_info from '../Contest_All_info/Contest_All_info';
const Contest_All_info = lazy(
    () => import('../Contest_All_info/Contest_All_info')    
);
const Contest_All = () => {
    const loadedContests = useLoaderData();
    const [all_contests, setAll_contests] = useState(loadedContests);

    const handleDeleteContest = (id) => {
        setAll_contests(all_contests.filter(contest => contest._id !== id));
    };
    return (
        <div>
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
                        all_contests.map((d) => <Contest_All_info key={d._id} d={d} onDelete={handleDeleteContest}></Contest_All_info >)
                    }
                </Suspense>
            </div>

            <div className="flex justify-center items-center">
                <Link
                    to="/update-form"
                    className="btn bg-white text-primary text-xl p-6 hover:bg-gray-100 mb-6 rounded-2xl border border-cyan-800"
                >
                    Add Contest
                </Link>
            </div>
            

        </div>
    );
};

export default Contest_All;