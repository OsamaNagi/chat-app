import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const is_auth = async (req, res, next) => {
	try {
		const token = req.cookies.token;

		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		if (!decoded) {
			return res.status(401).json({ message: 'Unauthorized' });
		}

		const user = await User.findById(decoded.userId).select('-password');

		if (!user) {
			return res.status(401).json({ message: 'user not found' });
		}

		req.user = user;

		next();
	} catch (error) {
		console.error('Error in is_auth middleware: ', error.message);
		res.status(500).json({ message: 'Server Error' });
	}
};
