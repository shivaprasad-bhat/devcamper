const mongoose = require('mongoose');
const slugify = require('slugify');
const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Plase add name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: [500, 'String cannot exceed 500 chars'],
    },
    website: {
        type: String,
    },
    phone: {
        type: String,
        maxlength: [20, 'Please enter valid phone number'],
    },
    email: {
        type: String,
    },
    address: {
        type: String,
        required: [true, 'Please enter a valid address'],
    },
    location: {
        //GeoJson
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
        },
        coordinates: {
            type: [Number],

            index: '2dsphere',
        },
        formattedAddress: {
            type: String,
        },
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'UI/UX',
            'Mobile Developemt',
            'Data Science',
            'Business',
            'Others',
        ],
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating must be atleast 1'],
        max: [10, 'Rating cannot exceed 10'],
    },
    averageRating: Number,
    photo: {
        type: String,
        default: 'no-phpto.jpg',
    },
    housing: {
        type: Boolean,
        default: false,
    },
    jobAssistance: {
        type: Boolean,
        default: false,
    },
    jobGaurentee: {
        type: Boolean,
        default: false,
    },
    acceptGi: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Create slug from name
BootcampSchema.pre('save', function (next) {
    console.log('Sluggify ran', this.name);
    this.slug = slugify(this.name, { lower: true });
    next();
});
module.exports = mongoose.model('Bootcamp', BootcampSchema);
