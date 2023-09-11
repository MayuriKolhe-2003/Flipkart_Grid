const approval = require("../models/approveSchema");

exports.addApproval = async (req, res) => {
    try {
        const r = await approval.create(req.body);
        res.send("Added transaction");
    }
    catch (e) {
        console.log(e);
        res.send("Error");
    }
}

exports.getApprovals = async (req, res) => {
    try {
        const r = await approval.find();
        res.send(r);
    }
    catch (e) {
        console.log(e);
        res.send("Error");
    }
}

exports.deleteApproval = async (req, res) => {
    try {
        const itemId = req.params.id;
        // console.log(itemId);
        await approval.deleteOne({ _id: itemId });
        res.send("Success");
    }
    catch (err) {
        console.log(err);
        res.send("Unable to delete");
    }
}