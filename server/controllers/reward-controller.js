const Reward = require('../models/rewardsSchema');

const getRewards  = async (req, res)=>{
    try {
        const result = await Reward.find({});
        res.json(result);
      } catch (error) {
        res.status(500).json({ error: error });
      }
}

const addReward = async (req, res) => {
    const rewardData = req.body;
    try {
      const reward = new Reward(rewardData);
      const savedreward = await reward.save();
      res.json(savedreward);
      //res.status(200).send("reward added");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error });
    }
  };

module.exports = {
    getRewards,addReward
}