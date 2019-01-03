<template>
    <div class="createChavrutaComponent">
        <TopicSelector @selected="UpdateSelectedTopic"></TopicSelector>

        <template v-if="Form.TopicId">
            <SelectedTopicCard :TopicId="Form.TopicId"></SelectedTopicCard>
        </template>

        <DateSelector @range-added="OnDateRangeAdded"></DateSelector>

        <LevelSelector v-model="Form.Level"></LevelSelector>
    </div>
</template>

<script>
import CreateChavrutaForm from "../../../../scripts/forms/chavruta/CreateChavrutaForm";

import SelectedTopicCard from "./_partials/topic-selector/_partials/selected-topic-card/SelectedTopicCard.vue";
import TopicSelector from "./_partials/topic-selector/TopicSelector.vue";
import DateSelector from "./_partials/date-selector/DateSelector.vue";
import LevelSelector from "./_partials/level-selector/LevelSelector.vue";

export default {
    data() {
        return {
            Form: CreateChavrutaForm.getDefaultData()
        };
    },
    components: {
        TopicSelector,
        SelectedTopicCard,
        DateSelector,
        LevelSelector
    },
    methods: {
        UpdateSelectedTopic(topicId) {
            this.Form.TopicId = topicId;
        },
        OnDateRangeAdded(dateRange) {
            this.Form.StartDate = dateRange.StartDate;
            this.Form.EndDate = dateRange.EndDate;
        }
    }
};
</script>


