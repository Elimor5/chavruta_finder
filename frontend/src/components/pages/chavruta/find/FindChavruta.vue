<template>
    <div class="findChavrutaComponent">
        <v-ons-page :infinite-scroll="loadMore">
            <CourseSearch ref="CourseSearch"></CourseSearch>

            <CourseResults></CourseResults>
        </v-ons-page>
    </div>
</template>

<script>
import Vue from "vue";
import CourseSearch from "../find/_partials/CourseSearch.vue";
import CourseCard from "../../../shared/course-card/CourseCard.vue";
import CourseResults from "../_partials/course-results/CourseResults";

export default {
    components: {
        CourseSearch,
        CourseCard,
        CourseResults
    },
    computed: {
        Limit: {
            get() {
                return this.$store.state.course.limit;
            },
            set(newLimit) {
                this.$store.commit("course/updateLimit", newLimit);
            }
        }
    },
    methods: {
        async loadMore(done) {
            this.Limit += 10;

            await this.$refs.CourseSearch.DebouncedTopicsCall();

            done();
        }
    }
};
</script>

<style lang="scss">
.findChavrutaComponent {
    .list {
        padding: 7.5px;
    }

    .courseCardComponent {
        .card {
            margin: 7.5px;
        }
    }
}
</style>