import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";

// Apply for a job
export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.id;
    if(!jobId){
        return res.status(400).josn({
            message:"Job id is required",
            success:false
        })
    };
    // Check if the user already applied
    const existingApplication = await Application.findOne({
      job:jobId,
      applicant:userId,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied to this job",
      });
    }
    const job= await Job.findById(jobId);
    if(!job){
        return res.status(404).json({
            message:"Job not found",
            success:false
        })
    }
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();

    return res.status(201).json({
      success: true,
      message:"Job applied successfully"
    });
  } catch (error) {
    console.error("Apply job error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Get all jobs applied by the logged-in user
export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!application) {
      return res.status(404).json({
        message: "No Applications",
        success: "false",
      });
    }
    return res.status(200).json({
      application,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all applicants for a specific job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "Job Not FOund",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    console.error("Get applicants error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// Update application status
export const updateStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;
if(!status){
    return res.status(400).json({
        message:"status not found",
        success:false
    })
};
const application=await Application.findOne({_id:applicationId});
if(!application){
    return res.status(404).json({
        message:"Application not found",
        success:false
    })
};
application.status= status.toLowerCase();
await application.save();
    
    
      return res.status(200).json({
        success: true,
        message: "Status updated successfully",
      });
    }

    catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
