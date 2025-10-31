'use client';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { GiPadlock } from 'react-icons/gi';
import { useForm } from 'react-hook-form';
import { RegisterSchema, registerSchema } from '@/lib/schemas/registerSchema';
import { zodResolver } from '@hookform/resolvers/zod';
export default function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<RegisterSchema>({
		resolver: zodResolver(registerSchema),
		mode: 'onChange',
	});
	const onSubmit = (data: RegisterSchema) => {
		console.log(data);
	};
	return (
		<Card className="w-2/5 mx-auto">
			<CardHeader className="flex flex-col items-center justify-center">
				<div className="flex flex-col gap-2 items-center text-secondary">
					<div className="flex flex-row items-center gap-3">
						<GiPadlock size={30} />
						<h1 className="text-3xl font-semibold">Register</h1>
					</div>
					<p className="text-neutral-500">Welcome to NextMatch</p>
				</div>
			</CardHeader>
			<CardBody>
				<form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
					<div className="space-y-4">
						<Input
							autoComplete="name"
							defaultValue=""
							label="Name"
							variant="bordered"
							type="text"
							{...register('name')}
							isInvalid={!!errors.name}
							errorMessage={errors.name?.message}
						/>
						<Input
							autoComplete="username"
							defaultValue=""
							label="Email"
							variant="bordered"
							type="email"
							{...register('email')}
							isInvalid={!!errors.email}
							errorMessage={errors.email?.message}
						/>
						<Input
							autoComplete="current-password"
							defaultValue=""
							label="Password"
							variant="bordered"
							type="password"
							{...register('password')}
							isInvalid={!!errors.password}
							errorMessage={errors.password?.message}
						/>
						<Button
							isDisabled={!isValid}
							fullWidth
							color="secondary"
							type="submit"
						>
							Register
						</Button>
					</div>
				</form>
			</CardBody>
		</Card>
	);
}
