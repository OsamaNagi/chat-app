import cloudinary from '../lib/cloudinary.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
	const { email, fullName, password } = req.body;

	try {
		if (!email || !fullName || !password) {
			return res.status(400).json({ message: 'Please fill in all fields' });
		}

		if (password.length < 8) {
			return res.status(400).json({ message: 'Password must be at least 8 characters long' });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new User({
			email,
			fullName,
			password: hashedPassword,
		});

		if (newUser) {
			generateToken(newUser._id, res);
			await newUser.save();

			return res.status(201).json({
				message: 'User created successfully',
				user: newUser,
			});
		} else {
			return res.status(400).json({ message: 'Invalid user data' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		if (!email || !password) {
			return res.status(400).json({ message: 'Please fill in all fields' });
		}

		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		if (user) {
			generateToken(user._id, res);
			return res.status(200).json({
				message: 'User logged in successfully',
				user: user,
			});
		} else {
			return res.status(400).json({ message: 'Invalid user data' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie('token');
		return res.status(200).json({ message: 'User logged out successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { avatar } = req.body;
		const userId = req.user._id;

		if (!avatar) {
			return res.status(400).json({ message: 'Please provide an avatar' });
		}

		const response = await cloudinary.uploader.upload(avatar);
		const updatedUser = await User.findByIdAndUpdate(userId, { avatar: response.secure_url }, { new: true });

		res.status(200).json({ message: 'User profile updated successfully', user: updatedUser });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server Error' });
	}
};

export const checkAuth = async (req, res) => {
	try {
		res.status(200).json({ user: req.user });
	} catch (error) {
		console.error('error in checkAuth: ', error.message);
		res.status(500).json({ message: 'Server Error' });
	}
};
