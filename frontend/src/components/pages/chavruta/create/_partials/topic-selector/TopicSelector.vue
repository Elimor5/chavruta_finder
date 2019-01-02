<template>
    <div class="topicSelectorComponent">
        <h3 class="pageHeader">Step 1: Choose a topic</h3>

        <div class="searchContainer">
            <v-ons-search-input
                ref="searchInput"
                class="topicInput"
                placeholder="Search Topics"
                v-model="Query"
                v-on-clickaway="CloseDropdown"
            ></v-ons-search-input>

            <template v-if="IsDropdownOpen && Topics">
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
    mounted() {
        this.$nextTick(() => {
            const searchInput = this.$refs["searchInput"];

            searchInput.$el.onfocus = () => {
                this.OpenDropdown();
            };
        });
    },
    data() {
        return {
            Query: null,
            IsDropdownOpen: false,
            SearchInput: null,
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

            this.CloseDropdown();
        },
        CloseDropdown() {
            this.IsDropdownOpen = false;
        },
        OpenDropdown() {
            this.IsDropdownOpen = true;
        }
    },
    watch: {
        Query(newVal) {
            if (newVal.length !== 0 && newVal.length < 3) return;

            this.OpenDropdown();

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
