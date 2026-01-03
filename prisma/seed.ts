import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcryptjs';
import { membersData } from './membersData';
import * as dotenv from 'dotenv';

dotenv.config();

// 1. Create a connection pool using your environment variable
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// 2. Pass the adapter to the PrismaClient
const prisma = new PrismaClient({ adapter });

async function seedMembers() {
	return Promise.all(
		membersData.map(async (member) => {
			const hashedPassword = await hash('password', 10);
			return prisma.user.create({
				data: {
					email: member.email,
					emailVerified: new Date(),
					name: member.name,
					passwordHash: hashedPassword,
					image: member.image,
					member: {
						create: {
							dateOfBirth: new Date(member.dateOfBirth),
							gender: member.gender,
							name: member.name,
							created: new Date(member.created),
							updated: new Date(member.lastActive),
							description: member.description,
							city: member.city,
							country: member.country,
							image: member.image,
							photos: {
								create: {
									url: member.image,
								},
							},
						},
					},
				},
			});
		})
	);
}

async function main() {
	console.log('Seeding database...');
	await prisma.user.deleteMany();
	await seedMembers();
	console.log('Seeding finished.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		await pool.end(); // Don't forget to close the pool!
	});
