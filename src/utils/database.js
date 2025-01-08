// MongoDB Collections Structure
const collections = {
  users: {
    email: String,
    password: String,
    role: ['admin', 'member', 'trainer'],
    campus: ['4kilo', '6kilo'],
    isTemporaryPassword: Boolean,
    createdAt: Date
  },
  
  members: {
    user: ObjectId, // Reference to users collection
    fullName: String,
    age: Number,
    phone: String,
    isStudent: Boolean,
    studentIdPhoto: String, // File path
    selectedPackage: ObjectId, // Reference to packages collection
    paymentProof: String, // File path
    paymentStatus: ['pending', 'approved', 'rejected'],
    membershipStatus: ['active', 'cancelled', 'expired']
  },
  
  trainers: {
    user: ObjectId, // Reference to users collection
    fullName: String,
    phone: String,
    cv: String, // File path
    applicationLetter: String,
    preferredCampus: ['4kilo', '6kilo'],
    status: ['pending', 'approved', 'rejected']
  },
  
  packages: {
    name: String,
    description: String,
    price: Number,
    duration: String,
    features: [String],
    sessions: String
  },
  
  complaints: {
    member: ObjectId, // Reference to members collection
    subject: String,
    description: String,
    campus: ['4kilo', '6kilo'],
    status: ['pending', 'resolved'],
    resolution: String,
    createdAt: Date
  }
};

// Sample Package Data
const samplePackages = [
  {
    name: "Student Basic",
    description: "Perfect for AAU students looking to start their fitness journey",
    price: 500,
    duration: "1 month",
    features: [
      "Access to gym equipment",
      "Locker access",
      "Student discount",
      "Basic fitness assessment"
    ],
    sessions: "Unlimited"
  },
  {
    name: "Staff Standard",
    description: "Comprehensive package for AAU staff members",
    price: 800,
    duration: "1 month",
    features: [
      "Access to gym equipment",
      "Locker access",
      "1 trainer session/month",
      "Fitness assessment",
      "Workout plan"
    ],
    sessions: "Unlimited"
  },
  {
    name: "Premium",
    description: "Full-featured package with personal training",
    price: 1200,
    duration: "1 month",
    features: [
      "Access to gym equipment",
      "Locker access",
      "4 trainer sessions/month",
      "Advanced fitness assessment",
      "Personalized workout plan",
      "Nutrition consultation"
    ],
    sessions: "Unlimited"
  }
];