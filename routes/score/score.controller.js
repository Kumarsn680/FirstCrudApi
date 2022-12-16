var express = require("express");
const {
  scoreDTOValidator,
  addScoreDTO,
  updateScoreDTO,
  deleteScoreDTO,
} = require("../../validators/score.validators");
const {
  getScores,
  addScores,
  updateScores,
  deleteScores,
} = require("./score.service");
var router = express.Router();

/* GET home page. */
//          http://localhost:3000/score
//  get scores of a particular gameId
router.get("/:gameId", async function (req, res, next) {
  const { gameId } = req.params;
  try {
    const scores = await getScores(gameId);
    res.json({
      data: scores,
    });
  } catch (error) {
    next(error);
  }
});

// Add a new Score
router.post(
  "/",
  scoreDTOValidator(addScoreDTO),
  async function (req, res, next) {
    const { gameId, userId, score } = req.body;

    try {
      const savedScore = await addScores(gameId, userId, score);
      res.json({
        data: savedScore,
      });
    } catch (error) {
      next(error);
    }
  }
);

// update the score of given gameId
router.put(
  "/:gameId",
  scoreDTOValidator(updateScoreDTO),
  async function (req, res, next) {
    const { gameId } = req.params;
    const { userId, score } = req.body;
    try {
      const updatedScore = await updateScores(gameId, userId, score);
      if (updatedScore === null) {
        res.status(404).json({
            error : 'gameId or scoreId not found'
        });
      } else {
        res.json({
          data: updatedScore,
        });
      }
    } catch (error) {
      next(error);
    }
  }
);

// delete the given gameid
router.delete(
  "/:gameId",
  scoreDTOValidator(deleteScoreDTO),
  async function (req, res, next) {
    const { gameId } = req.params;
    const { userId } = req.body;
    try {
        const deletedScore = await deleteScores(gameId, userId);
        if (deletedScore===null){
            res.status(404).json({
              error: "gameId or scoreId not found",
            });
        }else{
            res.json({
              data: deletedScore,
            });
        }
    } catch (error) {
        next(error)
    }
    
  }
);

module.exports = router;
