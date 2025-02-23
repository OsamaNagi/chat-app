import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Camera, Mail, User } from 'lucide-react';

const Profile = () => {
	const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
	const [selectedImage, setSelectedImage] = useState(null);

	const handleImageUpload = async (event) => {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onload = async () => {
			const base64Image = reader.result;
			setSelectedImage(base64Image);
			await updateProfile({ avatar: base64Image });
		};
	};

	return (
		<div className="h-screen pt-20">
			<div className="max-w-2xl p-4 py-8 mx-auto">
				<div className="p-6 space-y-8 bg-base-300 rounded-xl">
					<div className="text-center">
						<h1 className="text-2xl font-bold">Profile</h1>
						<p className="text-base-content/60">Your profile information</p>
					</div>

					{/* avatar upload */}
					<div className="flex flex-col items-center gap-4">
						<div className="relative">
							<img src={selectedImage || authUser.user.avatar || '/avatar.png'} alt="Profile" className="object-cover border-4 rounded-full size-32" />
							<label htmlFor="avatar-upload" className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}`}>
								<Camera className="size-5 text-base-200" />
								<input type="file" id="avatar-upload" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={isUpdatingProfile} />
							</label>
						</div>
						<p className="text-sm text-zinc-400">{isUpdatingProfile ? 'Uploading...' : 'Click the camera to upload a new avatar'}</p>
					</div>

					{/* user information */}
					<div className="px-6 space-y-6">
						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-sm text-zinc-400">
								<User className="size-4" />
								Full Name
							</div>
							<p className="text-zinc-400 rounded-lg border px-4 py-2.5">{authUser?.user.fullName}</p>
						</div>

						<div className="space-y-1.5">
							<div className="flex items-center gap-2 text-sm text-zinc-400">
								<Mail className="size-4" />
								Email Address
							</div>
							<p className="text-zinc-400 rounded-lg border px-4 py-2.5 ">{authUser?.user.email}</p>
						</div>
					</div>

					<div className="p-5 mt-6 bg-base-300 rounded-xl">
						<h2 className="mb-4 text-lg font-medium">Account Information</h2>
						<div className="flex items-center justify-between py-2 space-y-3 border-b text-zinc-400">
							<span>Member Since</span>
							<span>{authUser.user.createdAt?.split('T')[0]}</span>
						</div>
						<div className="flex items-center justify-between py-2">
							<span>Account Status</span>
							<span className="text-green-500">Active</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
