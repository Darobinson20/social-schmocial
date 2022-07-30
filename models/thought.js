const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false,
  }
);

// get total count of comments and replies on retrieval
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length(
    (total, comment) => total + comment.replies.length + 1,
    0
  );
});

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
