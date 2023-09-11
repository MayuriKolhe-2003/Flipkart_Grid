const brandrequest = require("../models/requestSchema");

const getBrandRequest = async (req, res) => {
    const sellerid = req.query.sellerid;

    try {
        const result = await brandrequest.find({ sellerid });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const addRequest = async (req, res) => {
    const data = req.body;

    try {
        const resp = await brandrequest.create(data);

        console.log(resp)
        res.send(resp);
    }
    catch (e) {
        res.send(e);
    }

}

const delRequest = async (req, res) => {
    try {
        const itemId = req.params.id;
        console.log(itemId);
        await brandrequest.deleteOne({ _id: itemId });
        res.send("Success");
    }
    catch (err) {
        console.log(err);
        res.send("Unable to delete");
    }
}

module.exports = { getBrandRequest, addRequest, delRequest }