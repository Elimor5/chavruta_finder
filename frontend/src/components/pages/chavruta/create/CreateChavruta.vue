<template>
    <div class="createChavrutaComponent">
        <h3>Step 1: Choose a topic</h3>

        <p class="searchContainer">
            <v-ons-search-input class="topicInput" placeholder="Search Topics" v-model="Query"></v-ons-search-input>
        </p>
        <pre>{{Topics}}</pre>
    </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
    data() {
        return {
            Query: null,
            DebouncedTopicsCall: debounce(this.GetTopicsByQuery, 500)
        };
    },
    computed: {
        Topics() {
            return this.$store.state.topic.topics;
        }
    },
    methods: {
        async GetTopicsByQuery() {
            await this.$store.dispatch("topic/getAllTopics", {
                topic: {
                    search: this.Query
                }
            });
        }
    },
    watch: {
        Query(newVal) {
            if (newVal.length < 3) return;

            this.DebouncedTopicsCall();
        }
    }
};
</script>

<style lang="scss" scoped>
.createChavrutaComponent {
    padding: 15px 15px 0 15px;

    .searchContainer {
        padding: 15px 0;

        .topicInput {
            width: 100%;
        }
    }
}
</style>
