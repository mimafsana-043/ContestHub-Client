import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";

const Paynow = () => {
    const { _id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        fullName: "",
        email: user?.email || "",
        amount: "",
        contestName: "",
        paymentMethod: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if(!formData.fullName || !formData.email || !formData.amount || !formData.contestName || !formData.paymentMethod) {
            alert("Please fill in all fields.");
            return;
        }
        const paymentData  = {
            userEmail : user?.email,
            contestId : _id,
            fullName : formData.fullName,
            amount : formData.amount,
            contestName : formData.contestName,
            paymentMethod : formData.paymentMethod,
            paymentDate : new Date()
        };
        try{
            const response = await fetch("http://localhost:3000/payments", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(paymentData)
                });
                if(response.ok) {
                    alert("Payment Successful!");
                    navigate("/dashboard/mycontest");
                } else {
                    throw new Error("Payment failed");
                }
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed. Please try again.");
        }
    };
    
    return (
        <div className="flex justify-center items-center mt-10 mb-10 ">
            <form onSubmit={handlePayment}>
                <fieldset className="border border-gray-300 p-4 rounded-md w-fit">
                    <legend className="px-2 font-semibold">Payment Details</legend>

                    <div className="flex flex-col gap-2">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Full Name"
                            className="border p-2 rounded"
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border p-2 rounded"
                            required
                        />

                        <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Amount (৳)"
                            className="border p-2 rounded"
                            required
                        />

                        <input
                            type="text"
                            name="contestName"
                            value={formData.contestName}
                            onChange={handleChange}
                            placeholder="Contest Name"
                            className="border p-2 rounded"
                            required
                        />

                        <select 
                            name="paymentMethod"
                            value={formData.paymentMethod}
                            onChange={handleChange}
                            className="border p-2 rounded"
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="bkash">bKash</option>
                            <option value="nagad">Nagad</option>
                            <option value="rocket">Rocket</option>
                        </select>

                        <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                            Pay Now
                        </button>

                        
                    </div>
                </fieldset>
            </form>
        </div>
    );
};

export default Paynow;