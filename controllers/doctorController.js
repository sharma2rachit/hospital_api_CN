//importing user model to create user or find user
const User = require('../models/user')
//using jwt authentication
const jwt = require('jsonwebtoken');


//function to create doctor or patient
module.exports.create = async function(req,res)
{
    try {
        //if user if available in the database then send status already exist else create new user
        let user = await User.findOne({username:req.body.username})

        if(user)
        {
            return res.status(409).json(
                {
                    message: 'UserName Already Exists',
                })

        }
        //creating new user
        user = await User.create({
            username:req.body.username,
            password:req.body.password,
            name:req.body.name,
            type:'Doctor'
        });

        //returning response to the network
        return res.status(201).json(
            {
                message: 'User created successfully',
            })
        //handeling error 
    } catch (error) {
        console.log(error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        );
    }
    

}

//creating session for the logged in user
module.exports.createSession = async function (req, res) {

    try {
        //if user exist then check for his/her credentials else return response
        let user = await User.findOne({ username: req.body.username });

        if (!user || user.password != req.body.password) {
            return res.status(422).json(
                {
                    message: "Invalid UserName or Password"
                }
            )
        }

        return res.status(200).json(
            {
                message: "Sign in successful. Here is your token, please keep it safe",
                data:
                {
                    token: jwt.sign(user.toJSON(),'Alert1234',{expiresIn:'1000000'})
                }
            }
        )

        //handeling errors

    } catch (error) {

        console.log('Error', error);
        return res.status(500).json(
            {
                message: "Internal Server Error"
            }
        );
    }

}