const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    heading: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    views: Number,
    createdDate: {
        type: Date
    },
    updatedDate: {
        type: Date
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
    author: {
        //required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    votes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vote'
    }],
    voteValue:{
        type: Number
    }
});

postSchema.pre('save',function (next) {
    let now = Date.now();
    console.log("inside post-pre saveeee");

    this.updatedDate = now;
    if (!this.createdDate) {
        this.createdDate = now;
    }
    next();
});


module.exports = mongoose.model('Post', postSchema);