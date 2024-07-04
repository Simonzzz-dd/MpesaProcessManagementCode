const Group = require('../../models/roles/group_roles');
const User = require('../../models/user');

const addUsersToGroup = async (req, res) => {
    const { groupId, userIds } = req.body;

    try {
        const group = await Group.findById(groupId).populate('parent');
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if the group has a parent
        if (group.parent) {
            const parentGroup = await Group.findById(group.parent._id);
            if (!parentGroup) {
                return res.status(400).json({ error: 'Parent group not found' });
            }

            // Ensure all users are members of the parent group
            const invalidUserIds = userIds.filter(userId => !parentGroup.users.includes(userId));
            if (invalidUserIds.length > 0) {
                return res.status(400).json({ error: `Users must be members of the parent group: ${invalidUserIds.join(', ')}` });
            }
        }

        // Check if users exist and add them to the group
        const existingUsers = await User.find({ _id: { $in: userIds } });
        if (existingUsers.length !== userIds.length) {
            const missingUserIds = userIds.filter(userId => !existingUsers.some(user => user._id.equals(userId)));
            return res.status(400).json({ error: `Some users do not exist: ${missingUserIds.join(', ')}` });
        }

        const usersToAdd = userIds.filter(userId => !group.users.includes(userId));
        group.users.push(...usersToAdd);
        await group.save();

        // Update each user to include the new group
        await User.updateMany(
            { _id: { $in: usersToAdd } },
            { $addToSet: { groups: group._id } }
        );

        res.status(200).json(group);
    } catch (error) {
        console.error('Error adding users to group:', error);
        res.status(500).json({ error: 'Error adding users to group' });
    }
};

module.exports = addUsersToGroup;
