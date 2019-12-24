<template>
    <div class="showChavrutaComponent" v-if="Course">
        <CourseCard :key="Course.id" :Course="Course" :ShowAdminButtons="true">
            <ExpandedCourseDetails :Course="Course"></ExpandedCourseDetails>
        </CourseCard>
    </div>
</template>

<script>
import courseService from "../../../../scripts/services/course/courseService";
import CourseCard from "../../../shared/course-card/CourseCard.vue";
import ExpandedCourseDetails from "./_partials/expanded-course-details/ExpandedCourseDetails.vue";

export default {
    components: {
        CourseCard,
        ExpandedCourseDetails
    },
    async created() {
        this.$loader.show();

        try {
            const { id } = this.$route.params;
            await this.$store.dispatch("course/getCourse", id);
        } catch (e) {
            this.$toastr.toast(e);
            this.$router.push("/");
        }

        this.$loader.hide();
    },
    computed: {
        Course() {
            const courses = this.$store.state.course.courses;

            return courses.find(
                course => course.id.toString() === this.$route.params.id
            );
        }
    },
    methods: {}
};
</script>

<style lang="scss" scoped>
</style>
