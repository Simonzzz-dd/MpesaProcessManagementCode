const User = require("../../models/user")


const get_all_users = async (req, res) => {
    try {
        // Validate user exists
        const user = await User.find();
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error assigning roles to user:', error);
        res.status(500).json({ error: 'No users available' });
    }

}


module.exports = get_all_users