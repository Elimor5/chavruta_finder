<template>
    <div class="createChavrutaComponent">
        <h3 class="sectionHeader">Step 1: Name Your Chavruta</h3>
        <cf-formgroup class="titleFormGroup" :validation="$v.Form.Title">
            <template slot="icon">
                <v-ons-icon icon="fa-group" size="30px" class="list-item__icon"></v-ons-icon>
            </template>
            <template slot="input">
                <v-ons-input
                    class="inputField"
                    float="true"
                    placeholder="Chavruta Title"
                    type="text"
                    v-model.trim="Form.Title"
                ></v-ons-input>
            </template>
        </cf-formgroup>

        <h3 class="sectionHeader">Step 2: Choose a topic</h3>
        <TopicSelector @selected="UpdateSelectedTopic"></TopicSelector>

        <template v-if="Form.TopicId">
            <SelectedTopicCard :TopicId="Form.TopicId"></SelectedTopicCard>
        </template>

        <h3 class="sectionHeader">Step 3: Select a Date Range</h3>
        <DateSelector @range-added="OnDateRangeAdded"></DateSelector>

        <h3 class="sectionHeader">Step 4. Select a Skill Level</h3>

        <LevelSelector v-model="Form.Level"></LevelSelector>

        <template v-if="IsInstructor">
            <h3 class="sectionHeader">Are you teaching?</h3>

            <v-ons-list class="listContainer instructorContainer">
                <v-ons-list-item tappable>
                    <label class="left">
                        <v-ons-checkbox input-id="checkbox-instructor" v-model="IsTeaching"></v-ons-checkbox>
                    </label>
                    <label for="checkbox-instructor" class="center">I am teaching this Chavruta</label>
                </v-ons-list-item>
            </v-ons-list>
        </template>
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
            IsTeaching: false,
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
    },
    validations() {
        return CreateChavrutaForm.getValidations();
    },
    watch: {
        IsTeaching(newVal) {
            if (newVal) {
                this.Form.InstructorId = this.$store.state.identity.currentUser.userIdentity.id;
            } else {
                this.Form.InstructorId = null;
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.createChavrutaComponent {
    padding: 0 15px;

    .titleFormGroup,
    .instructorContainer {
        margin: 0 -15px;
    }
    .sectionHeader {
        margin: 40px 0 15px 0;
    }
}
</style>

