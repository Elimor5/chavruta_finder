import ChavrutaService from '../../services/chavruta/chavrutaService'
import merge from 'lodash/merge';

export default {
    strict: true,
    namespaced: true,
    state: {
        topics: {}
    },
    mutations: {
        updateTopics(state, topics) {
            state.topics = topics;
        },
        clearAllTopics(state) {
            state.topics = {};
        },
        mergeTopics(state, newTopics) {
            const mergedTopics = merge({}, state.topics, newTopics);

            state.topics = mergedTopics;
        }
    },
    actions: {
        async getAllTopics(context, query) {
            const topics = await ChavrutaService.getAllTopics(query);

            context.commit('updateTopics', topics.data.topics);
        }
    }
}