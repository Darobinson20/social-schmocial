const { Thought, User } = require('../models');

const thoughtController = {
//get's all thoughts  
getAllThoughts(req, res) {
  Thought.find({})
  .then(dbThoughtData => res.json(dbThoughtData))
  .catch(err => {
    console.log(err);
    res.status().json(err);
  });
},


  // get's thoughts by id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.thoughtid })
      .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(400).json({ message: 'No thought with this id'});
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate({ _id: params.thoughtid }, body, { new: true, runValidators:
      true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
    },

 
  // remove thoughts
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'No thought with this id' });
        }
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // remove reactions
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { replies: { replyId: params.reactionId } } },
      { new: true }
    )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;