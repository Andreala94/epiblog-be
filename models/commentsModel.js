const mongoose = require('mongoose');

const commentsModelSchema = new mongoose.Schema(
    {
        commento: {
            type: String,
            required: true,

        },
        


    }


)