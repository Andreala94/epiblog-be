const mongoose = require('mongoose');


const PostModelSchema = new mongoose.Schema(
   {
	
		category: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		cover: {
			type: String,
			required: false,
		},
		readTime: {
			value: {
				type: Number,
				required: false,
				default: 0,
			},
			unit: {
				type: String,
				required: false,
				
			},
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Author",
		},
		content: {
			type: String,
			required: true,
		},
		commenti:[
			{
			type: mongoose.Schema.Types.ObjectId,
			ref: "comments",
			default: []
		}
	]
	},
	{
		timestamps: true,
		strict: true,
	}
);

module.exports = mongoose.model('Post', PostModelSchema, 'posts')
//  prima è un nome che vogliamo dare, il secondo è il nostro schema e il terzo è dove vogliano creare nel db