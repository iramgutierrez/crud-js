import Base from 'entities/BaseEntity'
import mongoose from 'mongoose'
import validate from 'mongoose-validator'
import uniqueValidator from 'mongoose-unique-validator'

let ProductSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        unique: true,
        validate : [
            validate({
                validator: 'isLength',
                arguments: [3, 50],
                message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
            })
        ]
    },
    price: {
        type: Number,
        required : true
    }
})

ProductSchema.plugin(uniqueValidator)

export default mongoose.model('Product', ProductSchema)
