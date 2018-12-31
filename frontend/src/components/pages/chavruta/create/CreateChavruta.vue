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
export default {
    data() {
        return {
            Query: null
        };
    },
    computed: {
        Topics() {
            return this.$store.state.topic.topics;
        }
    },
    watch: {
        async Query(newVal) {
            if (newVal.length < 3) return;
            
            await this.$store.dispatch("topic/getAllTopics", {
                topic: {
                    search: newVal
                }
            });
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
