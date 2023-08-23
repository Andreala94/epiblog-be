const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const minlength = [
	8,
	"The value of path `{PATH}` (`{VALUE}`) is shorter than the minimum allowed length ({MINLENGTH}).",
];
const AuthorModelSchema = new mongoose.Schema(

  {
    name: {
      type: String,
     
    },
    surname: {
      type: String,
      
    },
    password: {
      type: String,
     
    },
    email: {
      type: String
     
    },

    avatar: {
      type: String
      
    },
    dob: {
      type: String
      
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      }
    ]

  },
  {
    timestamps: true,
    strict: true,
  }

)
AuthorModelSchema.pre('save',async function(next){
  const user = this
  try {
    const salt = await bcrypt.genSalt(10) 
    const hash = await bcrypt.hash(user.password, salt)
    user.password= hash
    next()
  } catch (error) {
    console.log(error);
  }
})
module.exports = mongoose.model('Author', AuthorModelSchema, 'Authors');