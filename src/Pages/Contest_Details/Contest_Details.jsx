import { useEffect, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import SingleContestInfo from "../SingleContestInfo/SingleContestInfo";

const Contest_Details = () => {
    const data  = useLoaderData();
    const {_id} = useParams();
    const [contests, setContests] = useState({});
    
    useEffect(() => {
        const contestDetails = data.find(d => d._id === _id);
        setContests(contestDetails);
    }, [_id, data]);

    return (
        <div>
            <SingleContestInfo contests={contests}></SingleContestInfo>
        </div>
    );
};

export default Contest_Details;