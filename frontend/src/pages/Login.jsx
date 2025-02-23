import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from 'lucide-react';
import AuthImagePattern from '../components/AuthImagePattern';
import { Link } from 'react-router-dom';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { login, isLoggingIn } = useAuthStore();

	const handleSubmit = (e) => {
		e.preventDefault();
		login(formData);
	};

	return (
		<div className="grid min-h-screen lg:grid-cols-2">
			{/* left side */}
			<div className="flex flex-col items-center justify-center p-6 sm:p-12">
				<div className="w-full max-w-md space-y-8">
					{/* logo */}
					<div className="mb-8 text-center">
						<div className="flex flex-col items-center gap-2 group">
							<div className="flex items-center justify-center transition-colors size-12 rounded-xl bg-primary/10 group-hover:bg-primary/20">
								<MessageSquare className="size-6 text-primary" />
							</div>
							<h1 className="text-2xl font-bold">Create Account</h1>
							<p className="text-base-content/60">Get started with your free account</p>
						</div>
					</div>

					{/* form */}
					<form onSubmit={handleSubmit} className="space-y-6">
						<div className="form-control">
							<label className="label">
								<span className="font-medium label-text">Email</span>
							</label>

							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Mail className="size-5 text-base-content/40" />
								</div>
								<input type="text" className={`input input-bordered w-full pl-10`} placeholder="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
							</div>
						</div>

						<div className="form-control">
							<label className="label">
								<span className="font-medium label-text">Password</span>
							</label>

							<div className="relative">
								<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
									<Lock className="size-5 text-base-content/40" />
								</div>
								<input type={showPassword ? 'text' : 'password'} className={`input input-bordered w-full pl-10`} placeholder="********" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

								<button type="button" className="absolute inset-y-0 right-0 flex items-center pr-3" onClick={() => setShowPassword(!showPassword)}>
									{showPassword ? <EyeOff className="size-5 text-base-content/40" /> : <Eye className="size-5 text-base-content/40" />}
								</button>
							</div>
						</div>

						<button type="submit" className="w-full btn btn-primary" disabled={isLoggingIn}>
							{isLoggingIn ? (
								<>
									<Loader2 className="size-5 animate-spin" />
									Loading...
								</>
							) : (
								'Login'
							)}
						</button>
					</form>

					<div className="text-center">
						<p className="text-base-content/60">
							Don't have an account?{' '}
							<Link to="/login" className="link link-primary">
								Create Account
							</Link>
						</p>
					</div>
				</div>
			</div>

			{/* right side */}
			<AuthImagePattern title="Join our community" subtitle="Connect with friends, share moments, and stay in touch." />
		</div>
	);
};

export default Login;
