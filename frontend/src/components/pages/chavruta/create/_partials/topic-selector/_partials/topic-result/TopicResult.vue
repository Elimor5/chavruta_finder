<template>
    <div class="topicResultsCardComponent">
        <SearchResult class="topicCard" @click="SelectItem">
            <template slot="title">{{Topic.name}}</template>
        </SearchResult>
    </div>
</template>

<script>
import SearchResult from "../../../../../../../shared/buttons/search-result/SearchResult.vue";

export default {
    components: {
        SearchResult
    },
    props: {
        Topic: {
            required: true
        },
        Index: {
            type: String,
            required: true
        }
    },
    methods: {
        SelectItem() {
            this.$emit("selected", this.Index);
        }
    }
};
</script>

