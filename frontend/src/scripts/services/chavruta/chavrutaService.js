import {
    http
} from '../../../api/http';

export default {
    async getAllTopics(searchQuery) {
        return await http({
            url: `/topics`,
            method: 'GET',
            params: searchQuery
        });
    }
}