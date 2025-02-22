import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUser = req.user._id;
		const filteredUsers = await User.find({ _id: { $ne: loggedInUser } }).select('-password');

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error('Error in getUsersForSidebar: ', error.message);
		res.status(500).json({ message: 'Internal server Error' });
	}
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const myId = req.user._id;

		const messages = await Message.find({
			$or: [
				{ sender: myId, receiver: userToChatId },
				{ sender: userToChatId, receiver: myId },
			],
		});
	} catch (error) {}
};
