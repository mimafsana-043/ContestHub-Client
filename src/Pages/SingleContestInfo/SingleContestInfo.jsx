import { useEffect, useState } from "react";
import { FaClock, FaCrown, FaTrophy, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
const SingleContestInfo = ({ contests }) => {
    const { _id } = contests;
    const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
        const deadlineTime = new Date(contests.deadline).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = deadlineTime - now;
            if (distance <= 0) {
                setTimeLeft("Contest Ended");
                return;
            }
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            return true;
        };
        updateCountdown();

        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval);
    }, [contests.deadline]);


    return (
        <div>
            <section className="min-h-screen pb-20">

                {/* ===== Banner ===== */}
                <div className="relative h-[420px] max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-lg mt-10">
                    <img
                        src={contests.image}
                        alt={contests.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end">
                        <h1 className="text-white text-5xl font-extrabold p-10">
                            {contests.name}
                        </h1>
                    </div>
                </div>

                {/* ===== Content ===== */}
                <div className="max-w-6xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* ===== Left Section ===== */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* Description */}
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <h2 className="text-3xl font-bold mb-4">Contest Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {contests.description}
                            </p>

                            <h3 className="text-xl font-semibold mt-6 mb-2">Task Details</h3>
                            <ul className="list-disc list-inside text-gray-600 space-y-2">
                                <li>{contests.taskDetails}</li>
                                <li>{contests.taskDetails}</li>
                                <li>Submit Figma or live link</li>
                            </ul>
                        </div>

                        {/* Submit Task Card */}
                        <div className="bg-white rounded-3xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold mb-4">Submit Your Task</h2>
                            <p className="text-gray-500 mb-6">
                                Available after successful contest registration.
                            </p>

                            <button className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold opacity-70 cursor-not-allowed">
                                Submit Task
                            </button>
                        </div>

                        {/* Winner Section */}
                        <div className="bg-white rounded-3xl shadow-lg p-8 opacity-60">
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <FaCrown className="text-yellow-500" /> Winner
                            </h2>
                            <p className="text-gray-500">
                                Winner will be announced by the contest creator.
                            </p>
                        </div>
                    </div>

                    {/* ===== Right Section ===== */}
                    <div className="space-y-6">

                        {/* Info Card */}
                        <div className="bg-white rounded-3xl shadow-xl p-8 space-y-6">

                            <div className="flex items-center gap-4">
                                <FaUsers className="text-indigo-600 text-2xl" />
                                <div>
                                    <p className="text-gray-500 text-sm">Participants</p>
                                    <p className="font-bold text-lg">{contests.participants}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <FaTrophy className="text-emerald-600 text-2xl" />
                                <div>
                                    <p className="text-gray-500 text-sm">Prize Money</p>
                                    <p className="font-bold text-lg">{contests.prize} ৳</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <FaClock className="text-red-500 text-2xl" />
                                <div>
                                    <p className="text-gray-500 text-sm">Deadline</p>
                                    <p className="font-bold text-lg">
                                        {timeLeft}
                                    </p>
                                </div>
                            </div>

                            {timeLeft === "Contest Ended" ? (
                                <button className="w-full mt-4 py-4 rounded-xl bg-gray-300 text-gray-600 font-semibold cursor-not-allowed">
                                    Register Closed
                                </button>
                            ) : (
                                <Link to={`/paynow/${_id}`}>
                                    <button className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-600 transition">
                                        Register Now
                                    </button>
                                </Link>
                            )}


                        </div>
                    </div>
                </div>

                {/* ===== Modal UI (Design Only) ===== */}
                <div className="fixed inset-0 bg-black/40 hidden items-center justify-center">
                    <div className="bg-white rounded-3xl w-[90%] max-w-xl p-8">
                        <h2 className="text-2xl font-bold mb-4">Submit Task</h2>
                        <textarea
                            className="w-full h-40 border rounded-xl p-4 focus:outline-indigo-500"
                            placeholder="Paste Figma / GitHub / Live link here..."
                        ></textarea>

                        <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold">
                            Submit
                        </button>
                    </div>
                </div>

            </section>
        </div>

    );
};

export default SingleContestInfo;