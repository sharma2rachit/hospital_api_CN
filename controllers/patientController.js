//importing report model form models to find report as well as user model
const Report = require('../models/reports');
const User = require('../models/user')

//function to register doctor or patient on the application
module.exports.register = async function(req,res)
{
    try {
        
        let user = await User.findOne({username:req.body.number})

        if(user)
        {
            return res.status(200).json(
                {
                    message: 'User Already Registered',
                    data:{
                        user:user
                    }
                })

        }

        user = await User.create({
            username:req.body.number,
            name:req.body.name,
            password:'12345',
            type:'Patient'
        });

        return res.status(201).json(
            {
                message: 'Patient registered successfully',
                data: user
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        );
    }
    

}

//function to create report of the patient 

module.exports.createReport = async function(req,res)
{

    //handeling errors
    try {
        //if report is not exist then create one else return response
        const user = await User.findById(req.params.id)

        if(!user)
        {
            return res.status(422).json(
                {
                    message: "Patient Does not exist"
                })

        }

        report = await Report.create({
            createdByDoctor:req.user.id,
            patient:req.params.id,
            status:req.body.status,
            date:new Date()
        })

        user.reports.push(report)
        
        

        return res.status(201).json(
            {
                message: 'Report created successfully',
                data: report
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        );
    }
    

}


//getting patient report and sending it to the network
module.exports.patientReports = async function(req,res)
{
    try {
        const reports = await Report.find({patient:req.params.id}).populate('createdByDoctor').sort('date')

        const reportData = reports.map(report => {
            const originalDate = report.date;
            const dateObj = new Date(originalDate);

            const formattedDate = dateObj.toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false
            });

            return {
              createdByDoctor: report.createdByDoctor.name,
              status: report.status,
              date: formattedDate
            };
          });

        return res.status(200).json(
            {
                message: `List of Reports of User with id -  ${req.params.id}`,
                reports:reportData    
            })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        );
    }
    

}