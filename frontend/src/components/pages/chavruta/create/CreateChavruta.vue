<template>
    <div class="createChavrutaComponent">
        <TopicSelector @selected="UpdateSelectedTopic"></TopicSelector>

        <template v-if="Form.TopicId">
            <SelectedTopicCard :TopicId="Form.TopicId"></SelectedTopicCard>
        </template>
    </div>
</template>

<script>
import CreateChavrutaForm from "../../../../scripts/forms/chavruta/CreateChavrutaForm";

import SelectedTopicCard from "./_partials/topic-selector/_partials/selected-topic-card/SelectedTopicCard.vue";
import TopicSelector from "./_partials/topic-selector/TopicSelector.vue";

export default {
    data() {
        return {
            Form: CreateChavrutaForm.getDefaultData()
        };
    },
    components: {
        TopicSelector,
        SelectedTopicCard
    },
    methods: {
        UpdateSelectedTopic(topicId) {
            this.Form.TopicId = topicId;
        }
    }
};
</script>
