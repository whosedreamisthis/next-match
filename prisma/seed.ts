import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { hash } from 'bcryptjs';
import { membersData } from './membersData';
import * as dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function seedMembers() {
	return Promise.all(
		membersData.map(async (member) => {
			const hashedPassword = await hash('password', 10);

			// Using upsert to prevent "Unique constraint failed" errors
			return prisma.user
				.upsert({
					where: { email: member.email }, // Check if email already exists
					update: {}, // If user exists, do nothing (prevents overwriting data)
					create: {
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
				})
				.then((user) => {
					console.log(`✅ Processed user: ${user.email}`);
				});
		})
	);
}

async function main() {
	console.log('🚀 Starting seeding process...');

	// Note: deleteMany() is commented out so we don't lose old data
	// await prisma.user.deleteMany();

	await seedMembers();
	console.log('✨ Seeding finished successfully.');
}

main()
	.catch((e) => {
		console.error('❌ Seeding error:', e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
		await pool.end();
	});
