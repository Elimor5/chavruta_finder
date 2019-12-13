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
export default {
    data() {
        return {
            Topic: null
        };
    },
    props: {
        TopicId: {
            required: true
        },
        TopicName: {}
    },
    watch: {
        TopicId: {
            handler() {
                this.Topic = this.$store.state.topic.topics[this.TopicId] || {
                    name: this.TopicName
                };
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
