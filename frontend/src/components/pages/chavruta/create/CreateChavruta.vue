<template>
    <div class="createChavrutaComponent">
        <CourseForm :Form="Form" @submit="SubmitForm"></CourseForm>
    </div>
</template>

<script>
import CreateChavrutaForm from "../../../../scripts/forms/chavruta/CreateChavrutaForm";

import CourseForm from "../_partials/course-form/CourseForm.vue";
import courseService from "../../../../scripts/services/course/courseService";

export default {
    created() {
        this.VerifyLoggedIn();

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
        CourseForm
    },
    computed: {
        IsLoggedIn() {
            return this.$store.state.identity.isAuthenticated;
        }
    },
    methods: {
        VerifyLoggedIn() {
            if (!this.IsLoggedIn) {
                this.$router.push({
                    name: "Log In",
                    query: { returnUrl: this.$route.path }
                });
            }
        },
        async SubmitForm(formData) {
            this.$loader.show();

            try {
                const convertedFormData = CreateChavrutaForm.convertFormData(
                    formData
                );
                const response = await CreateChavrutaForm.submit(
                    convertedFormData
                );

                await courseService.enroll(response.data);

                this.$ons.notification.toast(
                    "Course has been successfully created.",
                    { timeout: 5000, animation: "ascend" }
                );

                this.$router.push(`/chavruta/${response.data.id}`);
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
        }
    }
};
</script>