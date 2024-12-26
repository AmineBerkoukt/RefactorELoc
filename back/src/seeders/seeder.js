import { faker } from '@faker-js/faker';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Evaluate from '../models/Evaluate.js';
import Favorise from '../models/Favorise.js';
import connectDB from "../config/db.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";

dotenv.config();
console.log('MONGODB_URI:', process.env.MONGODB_URI);

const seedData = async () => {
    try {
        await connectDB();

        // Effacer les anciennes données
        await User.deleteMany();
        await Post.deleteMany();
        await Evaluate.deleteMany();
        await Favorise.deleteMany();

        console.log('Données existantes supprimées');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);
        // Créer des utilisateurs
        const roles = ['admin', 'house_owner', 'student'];
        const users = [];
        for (let i = 0; i < 20; i++) {
            const user = new User({
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                email: faker.internet.email(),
                password: hashedPassword,
                phoneNumber: faker.phone.number(),
                address: faker.location.streetAddress(),
                role: 'student',
            });
            users.push(user);
        }
        await User.insertMany(users);
        console.log('20 utilisateurs créés');

        // Créer des posts
        const posts = [];
        for (let i = 0; i < 30; i++) {
            const post = new Post({
                userId: faker.helpers.arrayElement(users)._id,
                title: faker.lorem.sentence(),
                description: faker.lorem.paragraph(),
                images: Array.from({ length: faker.number.int({ min: 1, max: 6 }) }, () =>
                    faker.image.url()
                ),
                price: faker.number.float({ min: 50, max: 1000, precision: 0.01 }),
                address: faker.location.streetAddress(),
                elevator: faker.datatype.boolean(),
                maximumCapacity: faker.number.int({ min: 1, max:  4}),
                likesCount: faker.number.int({ min: 1, max: 1000 }),
                avgRate: faker.number.float({ min: 1, max: 5, precision: 0.01 }),
            });
            posts.push(post);
        }
        await Post.insertMany(posts);
        console.log('30 posts créés');

        // Créer des évaluations
        const evaluations = [];
        for (let i = 0; i < 70; i++) {
            const evaluation = new Evaluate({
                userId: faker.helpers.arrayElement(users)._id,
                postId: faker.helpers.arrayElement(posts)._id,
                rate: faker.number.int({ min: 1, max: 5 }),
            });
            evaluations.push(evaluation);
        }
        await Evaluate.insertMany(evaluations);
        console.log('70 évaluations créées');

        // Créer des favoris
        const favorises = [];
        for (let i = 0; i < 70; i++) {
            const favorise = new Favorise({
                userId: faker.helpers.arrayElement(users)._id,
                postId: faker.helpers.arrayElement(posts)._id,
            });
            favorises.push(favorise);
        }
        await Favorise.insertMany(favorises);
        console.log('70 favoris créés');

        console.log('Seeding terminé avec succès !');
        process.exit(0);
    } catch (error) {
        console.error(`Erreur pendant le seeding : ${error.message}`);
        process.exit(1);
    }
};

seedData();