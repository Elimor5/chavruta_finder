<template>
    <div class="createChavrutaComponent">
        <h3 class="sectionHeader">Step 1: Choose a topic</h3>
        <TopicSelector @selected="UpdateSelectedTopic"></TopicSelector>

        <template v-if="Form.TopicId">
            <SelectedTopicCard :TopicId="Form.TopicId"></SelectedTopicCard>
        </template>

        <h3 class="sectionHeader">Step 2: Select a Date Range</h3>
        <DateSelector @range-added="OnDateRangeAdded"></DateSelector>

        <h3 class="sectionHeader">Step 3. Select a Skill Level</h3>

        <LevelSelector v-model="Form.Level"></LevelSelector>

        <template v-if="IsInstructor">Step</template>
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
    computed: {
        IsInstructor() {
            return this.$store.state.identity.currentUser.userIdentity
                .isInstructor;
        }
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

<style lang="scss" scoped>
.createChavrutaComponent {
    padding: 0 15px;

    .sectionHeader {
        margin: 40px 0 15px 0;
    }
}
</style>

