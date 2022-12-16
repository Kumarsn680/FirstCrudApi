const Score = require("./score.model");

const getScores = async (gameId) =>{
    return await Score.find({gameId:gameId})
}


const addScores =async (gameId,userId,score) =>{
    const newScore = new Score({
      gameId: gameId,
      userId: userId,
      score: score,
    })
    return await newScore.save();
}

const updateScores = async(gameId, userId, score) => {
    return await Score.findOneAndUpdate({gameId:gameId,userId:userId},{score:score},{new:true})
};

const deleteScores = async(gameId,userId) => {
    return await Score.findOneAndDelete({gameId:gameId,userId:userId})
};

module.exports = {
  getScores,
  addScores,
  updateScores,
  deleteScores,
};