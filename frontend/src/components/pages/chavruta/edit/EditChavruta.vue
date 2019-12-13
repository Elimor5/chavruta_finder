<template>
    <div class="editChavrutaComponent" v-if="Form">
        <CourseForm :Form="Form" @submit="SubmitForm">
            <template slot="buttonText">Update Course!</template>
        </CourseForm>
    </div>
</template>

<script>
import CourseForm from "../_partials/course-form/CourseForm.vue";
import EditChavrutaForm from "../../../../scripts/forms/chavruta/EditChavrutaForm";
import CourseService from "../../../../scripts/services/course/courseService";

export default {
    async created() {
        this.VerifyLoggedIn();

        this.$loader.show();

        try {
            const response = await CourseService.getCourse(
                this.$route.params.id
            );

            this.Form = EditChavrutaForm.populateFormFromCourse(response.data);
        } catch (e) {
            this.$toastr.toast(e);
        }

        this.$loader.hide();
    },
    data() {
        return {
            Form: null
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
                const convertedFormData = EditChavrutaForm.convertFormData(
                    formData
                );
                const response = await EditChavrutaForm.submit(
                    convertedFormData
                );

                this.$ons.notification.toast(
                    "Course has been successfully updated.",
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
