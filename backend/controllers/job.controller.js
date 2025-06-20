import {Job} from "../models/job.model.js";


export const postJob=async(req,res)=>{
    try{
        const{title,description ,requirements,salary,location , jobType,experience,position,companyId } =req.body;
        const userId=req.user._id;
        if(!title || !description || !requirements || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message:"Something is missing in job posting",
                success:false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experienceLevel:experience ,
            position,
            company:companyId,
            created_by:userId
        })
        return res.status(201).json({
            message:"New Job created ",
            job,
            success:true 
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
    
}

    export const getAllJobs= async(req,res)=>{
        try{
            const keyword=req.query.keyword || "";
            const query={
                $or:[
                    {title:{$regex:keyword, $options:"i"}},
                    {description:{$regex:keyword, $options:"i"}},
                ]
            };
            const jobs = await Job.find(query).populate({
                path:"company"
            }).sort({createdAt:-1});
            if(!jobs){
                return res.status(404).json({
                    message:"Jobs not found",
                    success:false
                })
            };
            return res.status(200).json({
                jobs,
                success:true
            })

        }
        catch(error){
            console.log(error);
        }
    
}
export const getJobById = async(req,res)=>{
    try{
        const jobId= req.params.id; 
        const job = await Job.findById(jobId).populate({
            path:"applications"
        });
        if(!job){
            return res.status(400).json({
                message:"Job not found by this id ",
                success:false
            })
        }
        return res.status(201).json({
            job, 
            success:true
        })
    }
    catch(error){
        return res.status(400).json({
            message:"Something went wrong in finding jo by id "
        })
    }


}
//admin ne kon kon si job post ki hai unko find krne ke liey
export const getAdminJobs= async(req,res)=>{
    try{
        const adminId = req.user._id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:"company",
            createdAt:-1
        });
        if(!jobs){
            return res.status(400).json({
                message:"Job not found by this id ",
                success:false
            })
        }
        return res.status(200).json({
            jobs,
            success:true
        })
    }
    catch(error){
        console.log(error);

    }
}
export const updateJob = async (req, res) => {
    try {
        const jobId = req.params.id;
        const { title, description, requirements, salary, location, jobType, experience, position } = req.body;

        const updatedJob = await Job.findByIdAndUpdate(
            jobId,
            {
                title,
                description,
                requirements,
                salary,
                location,
                jobType,
                experienceLevel: experience,
                position
            },
            { new: true, runValidators: true }
        );

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "Job updated successfully",
            job: updatedJob,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}
