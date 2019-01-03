<template>
    <div class="topicSelectorComponent">
        <div class="searchContainer">
            <v-ons-search-input
                ref="searchInput"
                class="topicInput"
                placeholder="Search Topics"
                v-model="Query"
                v-on-clickaway="CloseDropdown"
            ></v-ons-search-input>

            <template v-if="IsDropdownOpen">
                <div class="topicsResultsContainer">
                    <template v-if="Topics">
                        <template v-for="(topic, $index) in Topics">
                            <TopicResult
                                :key="$index"
                                :Topic="topic"
                                :Index="$index"
                                @selected="SelectTopic"
                            ></TopicResult>
                        </template>
                    </template>

                    <template v-if="Query && Query.length >2">
                        <TopicResult
                            :CreateTopic="true"
                            @toggle-topic-form="ShowCreateTopicForm(true)"
                        ></TopicResult>
                    </template>
                </div>
            </template>

            <template v-if="IsCreateTopicFormShown">
                <CreateTopic :Query="Query" @created="SelectTopic" @topic-created="AddNewTopic"></CreateTopic>
            </template>
        </div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";

import TopicResult from "./_partials/topic-result/TopicResult.vue";
import CreateTopic from "./_partials/create-topic/CreateTopic.vue";

export default {
    components: {
        TopicResult,
        CreateTopic
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
            DebouncedTopicsCall: debounce(this.GetTopicsByQuery, 500),
            IsCreateTopicFormShown: false
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

            this.IsCreateTopicFormShown = false;

            const searchBar = document.querySelector(".pageHeader");
            searchBar.scrollIntoView({ behavior: "smooth" });

            this.CloseDropdown();
        },
        AddNewTopic(topicId) {
            this.ShowCreateTopicForm = false;

            this.SelectTopic(topicId);
        },
        CloseDropdown() {
            this.IsDropdownOpen = false;
        },
        OpenDropdown() {
            this.IsDropdownOpen = true;
        },
        ShowCreateTopicForm(boolean) {
            this.IsCreateTopicFormShown = boolean;
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
    .searchContainer {
        position: relative;

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
