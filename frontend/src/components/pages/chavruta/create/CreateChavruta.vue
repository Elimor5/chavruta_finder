<template>
    <div class="createChavrutaComponent">
        <form @submit.prevent="SubmitForm" novalidate>
            <h3 class="sectionHeader">Step 1: Name Your Chavruta</h3>
            <cf-formgroup class="titleFormGroup" :validation="$v.Form.Title">
                <template slot="icon">
                    <v-ons-icon icon="fa-group" size="26px" class="list-item__icon"></v-ons-icon>
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

            <h3 class="sectionHeader">Step 2: Where are you planning to learn?</h3>
            <cf-formgroup class="titleFormGroup" :validation="$v.Form.Location">
                <template slot="icon">
                    <v-ons-icon icon="fa-school" size="26px" class="list-item__icon"></v-ons-icon>
                </template>
                <template slot="input">
                    <v-ons-input
                        class="inputField"
                        float="true"
                        placeholder="Beit Midrash"
                        type="text"
                        v-model.trim="Form.Location"
                    ></v-ons-input>
                </template>
            </cf-formgroup>

            <h3 class="sectionHeader">Step 3: Choose a topic</h3>
            <TopicSelector @selected="UpdateSelectedTopic"></TopicSelector>
            <FormErrors :validation="$v.Form.TopicId"></FormErrors>

            <template v-if="Form.TopicId">
                <SelectedTopicCard :TopicId="Form.TopicId"></SelectedTopicCard>
            </template>

            <h3 class="sectionHeader">Step 4: Select a Date Range</h3>
            <DateSelector @range-added="OnDateRangeAdded" :validations="$v.Form"></DateSelector>

            <h3 class="sectionHeader">Step 5. Select a Skill Level</h3>
            <LevelSelector v-model="Form.Level"></LevelSelector>

            <h3 class="sectionHeader">Step 6. Is this Chavruta for Men or Women?</h3>
            <GenderRestrictionsSelector v-model="Form.GenderRestriction"></GenderRestrictionsSelector>

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

            <h3 class="sectionHeader">Include a description (optional)</h3>
            <textarea
                class="summaryInput"
                float="true"
                maxlength="250"
                type="email"
                placeholder="Describe your Chavruta"
                v-model.trim="Form.Summary"
            ></textarea>

            <h3 class="sectionHeader">Final Step! When are you meeting?</h3>
            <div v-for="(courseSchedule, idx) in Form.CourseSchedules" :key="idx">
                <CourseScheduleForm :Form="courseSchedule"></CourseScheduleForm>
            </div>

            <SubmitButton>Create Course!</SubmitButton>
        </form>
    </div>
</template>

<script>
import CreateChavrutaForm from "../../../../scripts/forms/chavruta/CreateChavrutaForm";

import SelectedTopicCard from "./_partials/topic-selector/_partials/selected-topic-card/SelectedTopicCard.vue";
import TopicSelector from "./_partials/topic-selector/TopicSelector.vue";
import DateSelector from "./_partials/date-selector/DateSelector.vue";
import LevelSelector from "./_partials/level-selector/LevelSelector.vue";
import GenderRestrictionsSelector from "./_partials/gender-restrictions-selector/GenderRestrictionsSelector.vue";
import CourseScheduleForm from "./_partials/course-schedule-form/CourseScheduleForm.vue";
import SubmitButton from "../../../shared/buttons/submit-button/SubmitButton.vue";
import FormErrors from "../../../shared/forms/form-errors/FormErrors.vue";

export default {
    created() {
        window.scrollTo(0, 0);

        this.Form.CourseSchedules.push(
            CreateChavrutaForm.getDefaultCourseSchedule()
        );
    },
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
        LevelSelector,
        CourseScheduleForm,
        GenderRestrictionsSelector,
        SubmitButton,
        FormErrors
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
        },
        async SubmitForm() {
            if (!this.$validate(this.$v)) return;

            this.$loader.show();

            try {
                const convertedFormData = CreateChavrutaForm.convertFormData(
                    this.Form
                );
                if (this.IsEditMode) {
                } else {
                    await CreateChavrutaForm.submit(convertedFormData);

                    this.$ons.notification.toast(
                        "Course has been successfully created.",
                        { timeout: 5000, animation: "ascend" }
                    );
                }
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
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

    .summaryInput {
        width: 100%;
        height: 70px;
    }

    .submitButtonComponent {
        margin: 25px 0;
    }
}
</style>
