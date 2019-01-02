<template>
    <div class="topicResultsCardComponent">
        <template v-if="CreateTopic">
            <SearchResult class="topicCard" @click="ToggleTopicCreateForm">
                <template slot="title">Can't find Topic? Create one</template>
            </SearchResult>
        </template>
        <template v-else>
            <SearchResult class="topicCard" @click="SelectItem">
                <template slot="title">{{Topic.name}}</template>
            </SearchResult>
        </template>
    </div>
</template>

<script>
import SearchResult from "../../../../../../../shared/buttons/search-result/SearchResult.vue";

export default {
    components: {
        SearchResult
    },
    props: {
        Topic: {},
        Index: {
            type: String
        },
        CreateTopic: {
            type: Boolean
        }
    },
    methods: {
        SelectItem() {
            this.$emit("selected", this.Index);
        },
        ToggleTopicCreateForm() {
            this.$emit("toggle-topic-form", true);
        }
    }
};
</script>

