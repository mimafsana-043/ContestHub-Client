import axios from "axios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Contest_All_info = ({ d, onDelete }) => {
    const { name, image, participants, description, prize, deadline, _id } =
        d;
   const handleDelete = async (_id) => {
    const result = await Swal.fire(
        {
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:3000/contests/${_id}`)

                Swal.fire(
                    'Deleted!',
                    'Your contest has been deleted.',
                    'success'
                );
                onDelete(_id);
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an error deleting the contest.',
                    'error'
                );
            }
        }
   }
    return (
        <div className="group relative w-full max-w-sm rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl hover:scale-[1.02] transition-all duration-300">

            {/* Image */}
            <div className="h-52 overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="h-full w-full object-cover group-hover:scale-110 transition duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-6 space-y-4 bg-gradient-to-t from-black/60 to-black/20 text-white">

                <h2 className="text-2xl font-bold leading-tight">
                    {name}
                </h2>

                <p className="text-sm text-zinc-200 line-clamp-2">
                    {description}
                </p>

                {/* Info */}
                <div className=" text-sm text-zinc-800">
                    <div className="flex items-center gap-3">
                        <FaUsers />
                        <span>{participants} joined</span>
                    </div>

                    <span className="font-semibold text-emerald-600 text-lg">
                        Prize Money : ৳{prize}
                    </span>
                </div>

                {/* Deadline */}
                <div className="flex justify-between items-center">
                    <p className="text-xs text-red-400">
                        Deadline: {deadline}
                    </p>

                    <button onClick={()=>handleDelete( _id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Contest"
                    >
                        <FaTrashAlt size={16} />
                    </button>
                </div>


                {/* Button */}
                <Link to={`/detail/${_id}`}>
                    <button className="w-full py-3 rounded-2xl bg-white text-black font-semibold tracking-wide hover:bg-gradient-to-r from-primary to-purple-600 transition">
                        More Details
                    </button>
                </Link>


            </div>
        </div>
    );
};

export default Contest_All_info;