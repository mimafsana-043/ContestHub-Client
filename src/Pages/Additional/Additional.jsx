
const Additional = () => {
    return (
        <div>
            <section className="py-16 bg-base-200">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-10">
                        Why <span className="text-primary">BattleOfBrains</span>?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="card bg-base-100 shadow-md p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">🏆 Skill-Based Contests</h3>
                            <p className="text-sm text-gray-500">
                                Real challenges to test your problem-solving skills.
                            </p>
                        </div>

                        <div className="card bg-base-100 shadow-md p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">⏱ Live Deadlines</h3>
                            <p className="text-sm text-gray-500">
                                Compete with time and improve your focus.
                            </p>
                        </div>

                        <div className="card bg-base-100 shadow-md p-6 text-center">
                            <h3 className="text-xl font-semibold mb-2">🚀 Career Boost</h3>
                            <p className="text-sm text-gray-500">
                                Build portfolio-worthy projects through contests.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Additional;