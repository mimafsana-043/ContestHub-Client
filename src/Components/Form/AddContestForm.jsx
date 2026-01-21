import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { uploadImage } from "../../Utils/index";

const AddContestForm = () => {
    const { user } = useContext(AuthContext);
    

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();


    const onSubmit = async data => {
        try {
            const imageFile = data?.image[0];
            
            if (!imageFile) {
                alert('Please select an image file');
                return;
            }
            
            const imageUrl = await uploadImage(imageFile);

            const contestData = {
                name: data.name,
                image: imageUrl,
                description: data.description,
                type: data.type,
                prize: data.prize,
                deadline: data.deadline,
                createdBy: {
                    image: user?.photoURL || 'https://i.ibb.co/4pDNDk1/avatar.png',
                    name: user?.displayName || 'Anonymous',
                    email: user?.email || 'No Email'
                }
            };

            console.log('Sending contest data:', contestData);

            const response = await fetch('http://localhost:3000/contests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contestData),
            });

            console.log('Response status:', response.status);
            
            const contentType = response.headers.get('content-type');
            console.log('Response content-type:', contentType);

            const responseText = await response.text();
            console.log('Raw response:', responseText);

            // Check if response is HTML (error page)
            if (responseText.trim().startsWith('<!DOCTYPE') || responseText.trim().startsWith('<html')) {
                console.error('Server returned HTML error page');
                alert(`Server Error (${response.status}): The endpoint may not exist or server crashed. Check server console.`);
                return;
            }

            let result;
            if (responseText) {
                try {
                    result = JSON.parse(responseText);
                    console.log('Parsed response:', result);
                } catch (parseError) {
                    console.error('Failed to parse JSON:', parseError);
                    alert(`Server returned invalid response: ${responseText.substring(0, 200)}`);
                    return;
                }
            }

            if (response.ok) {
                alert('Contest added successfully!');
                window.location.reload(); // Refresh to see new contest
            } else {
                alert(`Failed to add contest: ${result?.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error adding contest:', error);
            alert(`Error: ${error.message}`);
        }
    };
        
    
    return (
        <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl bg-base-200 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4">
          Add New Contest
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          {/* Contest Name */}
          <div>
            <label className="label">Contest Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Contest name"
              
              {...register("name", { required: 'Contest name is required'}) }
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="label">Contest Image</label>
            <input
              type="file"
              name="image"
              className="file-input file-input-bordered w-full"
              accept="image/*"
             
              {...register("image", { required: 'Image is required'}) }
            />
          </div>

          {/* Description */}
          <div>
            <label className="label">Description</label>
            <textarea
              name="description"
              className="textarea textarea-bordered w-full"
              placeholder="Contest description"
              required
                {...register("description", { required: 'Description is required'})}
            ></textarea>
          </div>

          {/* Contest Type */}
          <div>
            <label className="label">Contest Type</label>
            <select
              name="type"
              className="select select-bordered w-full"
              {...register("type", { required: 'Contest type is required'}) }
            >
              <option value="">Select type</option>
              <option value="Design">Design</option>
              <option value="Coding">Coding</option>
              <option value="Photography">Photography</option>
              <option value="Article Writing">Article Writing</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Prize Money */}
          <div>
            <label className="label">Prize Money (৳)</label>
            <input
              type="number"
              name="prize"
              className="input input-bordered w-full"
              placeholder="Prize amount"
              {...register("prize", { required: 'Prize amount is required'}) }
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="label">Deadline</label>
            <input
              type="date"
              name="deadline"
              className="input input-bordered w-full"
              {...register("deadline", { required: 'Deadline is required'}) }
            />
          </div>

          {/* Submit */}
          <button className="btn btn-neutral w-full mt-3">
            Add Contest
          </button>
        </form>
      </div>
    </div>     
    );
};

export default AddContestForm;


