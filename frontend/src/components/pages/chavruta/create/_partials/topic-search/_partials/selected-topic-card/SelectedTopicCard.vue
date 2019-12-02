<template>
    <div class="topicResultsCardComponent" v-if="Topic">
        <div class="cardContainer">
            <p class="selectedTopicHeader">Selected Topic:</p>

            <div class="card">
                <div class="title">{{ Topic.name }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import store from "../../../../../../../../scripts/store/store";

export default {
    data() {
        return {
            Topic: null
        };
    },
    props: {
        TopicId: {
            required: true
        }
    },
    watch: {
        TopicId: {
            handler() {
                this.Topic = store.state.topic.topics[this.TopicId];
            },
            immediate: true
        }
    }
};
</script>

<style lang="scss" scoped>
.topicResultsCardComponent {
    display: flex;
    justify-content: center;

    .cardContainer {
        display: flex;
        align-items: center;

        .selectedTopicHeader {
            padding: 0 15px;
        }

        .card {
            flex-grow: 1;
        }

        .checkcircle {
            height: 30px;
            background-color: $colorPrimary;
        }
    }
}
</style>
