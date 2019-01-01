<template>
    <div class="topicSelectorComponent">
        <h3 class="pageHeader">Step 1: Choose a topic</h3>

        <div class="searchContainer">
            <v-ons-search-input class="topicInput" placeholder="Search Topics" v-model="Query"></v-ons-search-input>

            <template v-if="ShowDropdown && Topics">
                <div class="topicsResultsContainer">
                    <template v-for="(topic, $index) in Topics">
                        <TopicResult
                            :key="$index"
                            :Topic="topic"
                            :Index="$index"
                            @selected="SelectTopic"
                        ></TopicResult>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";
import TopicResult from "./_partials/topic-result/TopicResult.vue";

export default {
    components: {
        TopicResult
    },
    data() {
        return {
            Query: null,
            ShowDropdown: false,
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
        },
        SelectTopic(topicId) {
            this.$emit("selected", topicId);

            const searchBar = document.querySelector(".pageHeader");
            searchBar.scrollIntoView({ behavior: "smooth" });

            this.ShowDropdown = false;
        }
    },
    watch: {
        Query(newVal) {
            if (newVal.length < 3) return;
            this.ShowDropdown = true;

            this.DebouncedTopicsCall();
        }
    }
};
</script>

<style lang="scss" scoped>
.topicSelectorComponent {
    padding: 15px 15px 0 15px;

    .searchContainer {
        position: relative;

        padding: 15px 0;

        .topicInput {
            width: 100%;
        }
    }

    .topicsResultsContainer {
        position: absolute;
        width: 100%;
    }
}
</style>
