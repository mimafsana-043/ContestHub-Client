import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxiosSecure from "../../Hooks/UseAxios/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";
const MyContest = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    // Fetch user's contests
    const { data: myContests = [], isLoading: contestsLoading, error: contestsError } = useQuery({
        queryKey: ['mycontests', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mycontests?email=${user?.email}`);
            console.log('My Contests Response:', res.data);
            return res.data;
        },
        enabled: !!user?.email // Only run query when user email exists
    })

    // Fetch user's payments
    const { data: myPayments = [], isLoading: paymentsLoading, error: paymentsError } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user?.email}`);
            console.log('My Payments Response:', res.data);
            return res.data;
        },
        enabled: !!user?.email // Only run query when user email exists
    })

    if (contestsError) return <div className="text-center mt-10 text-red-500">Error loading contests: {contestsError.message}</div>;
    if (paymentsError) return <div className="text-center mt-10 text-red-500">Error loading payments: {paymentsError.message}</div>;

    // Check if user is logged in
    if (!user) {
        return <div className="text-center mt-10 text-xl">Please log in to view your contests and payments.</div>
    }

    console.log('User Email:', user?.email);
    console.log('My Contests:', myContests);
    console.log('My Payments:', myPayments);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">My Contests</h2>
            {contestsLoading ? (
                <div className="text-center">Loading contests...</div>
            ) : myContests.length > 0 ? (
                myContests.map((contest) => (
                    <div key={contest._id} className="border p-4 rounded mb-4 shadow-sm">
                        <h3 className="text-xl font-semibold">{contest.name}</h3>
                        <p className="mt-2">{contest.description}</p>
                        <p className="mt-2">Type: {contest.type}</p>
                        <p className="mt-2">Prize: ৳{contest.prize}</p>
                        <p className="mt-2">Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">No contests found.</p>
            )}

            <h2 className="text-3xl font-bold mb-6 mt-10">My Payments</h2>
            {paymentsLoading ? (
                <div className="text-center">Loading payments...</div>
            ) : myPayments.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-300">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-4 py-2 border">Full Name</th>
                                <th className="px-4 py-2 border">Contest Name</th>
                                <th className="px-4 py-2 border">Amount</th>
                                <th className="px-4 py-2 border">Payment Method</th>
                                <th className="px-4 py-2 border">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myPayments.map((payment, index) => (
                                <tr key={payment._id || index} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border">{payment.fullName}</td>
                                    <td className="px-4 py-2 border">{payment.contestName}</td>
                                    <td className="px-4 py-2 border">৳{payment.amount}</td>
                                    <td className="px-4 py-2 border capitalize">{payment.paymentMethod}</td>
                                    <td className="px-4 py-2 border">
                                        {payment.paymentDate
                                            ? new Date(payment.paymentDate).toLocaleDateString()
                                            : "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No payments found.</p>
            )}
        </div>
    );
};

export default MyContest;