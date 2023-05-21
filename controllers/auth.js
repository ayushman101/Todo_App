const users=require('../models/User');

const register = async(req,res)=>{

    try {
        
        console.log("Inserting new user");
        const newUser= await users.create({...req.body});
    
        res.status(200).json(newUser);
    } catch (error) {

        console.log("Insertion Failed",error);
        res.status(404).json({err: error});
    }

}

const Login= async (req,res)=>{

    console.log("Login");
    const {email,password}=req.body;

    if(!email || !password)
    {
        console.log("Invalid");
        res.status(401).json({error: "Login Failed ! Wrong Username or Password"});
        res.end();
    }

    else
    {
        const user=await users.findOne({email});

        if(!user)
        {
            console.log("User not found");
            res.status(401).json({error: "Login Failed ! User Not Found"});
            res.end();
        }

        else{

            const passmatch= user.password===password;

            if(!passmatch)
            {
                console.log("Wrong Pass");
                res.status(401).json({error: "Unauthorized Access"})
                res.end();
            }

            else
            {
                console.log(user);
                try {
                    res.status(200).json(user);
                    res.end();
                    
                } catch (error) {
                    
                    console.log(error);
                }
            }
            
        }

    }

    // res.end();
}

module.exports={register,Login};