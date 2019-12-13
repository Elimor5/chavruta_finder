<template>
    <div class="showChavrutaComponent" v-if="Course">
        <CourseCard :key="Course.id" :Course="Course">
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
            const response = await courseService.getCourse(id);

            this.Course = response.data;
            this.$route.meta.name = this.Course.title;
        } catch (e) {
            this.$toastr.toast(e);
            this.$router.push("/");
        }

        this.$loader.hide();
    },
    data() {
        return {
            Course: null
        };
    },
    computed: {},
    methods: {}
};
</script>

<style lang="scss" scoped>
</style>
