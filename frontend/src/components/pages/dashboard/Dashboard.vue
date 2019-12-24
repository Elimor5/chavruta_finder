<template>
    <div class="dashboardComponent">
        <Tabbar :TabOptions="TabOptions" @update="SelectTab"></Tabbar>

        <CourseResults></CourseResults>
    </div>
</template>    
<script>
import CourseResults from "../../shared/course-results/CourseResults.vue";
import Tabbar from "../../shared/tabbar/Tabbar.vue";

export default {
    components: {
        CourseResults,
        Tabbar
    },
    async created() {
        await this.GetCourseData();
    },
    data() {
        return {
            TabOptions: ["Created Courses", "Enrolled Courses"],
            SelectedTab: "Created Courses"
        };
    },
    methods: {
        async SelectTab(tabOption) {
            this.SelectedTab = tabOption;

            await this.GetCourseData();
        },
        async GetCourseData() {
            const param =
                this.SelectedTab === "Created Courses" ? "created" : "enrolled";

            this.$loader.show();

            try {
                await this.$store.dispatch("course/getAllCourses", {
                    course: {
                        [param]: true
                    }
                });
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
        }
    }
};
</script>

<style lang="scss">
.dashboardComponent {
    // required for sticky header to work
    height: auto !important;
}
</style>