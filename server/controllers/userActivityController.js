
const  userActivity = require( "../models/userActivitySchema");



exports.addActivity = async(req,res)=>{
        // usre id ,debited/credited,activity,productinfo-productId,productname
        try{
    
            const r = await userActivity.create(req.body);

            res.send("Activity added");
        }
        catch(e)
        {
            console.log(e);
            res.send("Error");

        }
    

}

exports.getActivity = async(req,res)=>{
        // get user id from query parameters 


        const userId= req.query.id;

        try{
                const data = await userActivity.find({userId}).sort({"createdAt": 1});
                res.send(data);
        }
        catch(e)
        {
            console.log(e);
            res.send("Error")
        }
}