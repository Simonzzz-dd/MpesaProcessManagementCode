const express = require('express');
const createNewGroup = require('../../controllers/roles/create_group_role');
const addUsersToGroup = require('../../controllers/roles/add_users_to_group');
const addDirectoryToGroup = require('../../controllers/roles/add_dir_to_group');
const removeGroupFromDirectory = require('../../controllers/roles/remove_group_from_dir');
const assignRolesToUser = require('../../controllers/roles/assign_roles_user');
const get_current_user_roles = require('../../controllers/roles/get_user_roles');
const get_current_user_groups = require('../../controllers/roles/get_current_user_groups');

const rolesRouter = express.Router();

rolesRouter.post('/create-group', createNewGroup);
rolesRouter.post('/add-users-to-group', addUsersToGroup);
rolesRouter.post('/add-directory-to-group', addDirectoryToGroup);
rolesRouter.post('/remove-group-from-directory', removeGroupFromDirectory);
rolesRouter.post('/assign-roles-to-user', assignRolesToUser);
rolesRouter.get("/get-current-user-role", get_current_user_roles)
rolesRouter.get("/get-current-user-groups", get_current_user_groups)

module.exports = rolesRouter;
