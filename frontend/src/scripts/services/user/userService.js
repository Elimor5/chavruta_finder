import {
    http
} from '../../../api/http';

export default {
    async getUsers(userIds) {
        return await http({
            url: `/topics`,
            method: 'GET',
            params: {
                user_ids: userIds
            }
        });
    }
}