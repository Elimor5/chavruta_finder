<template>
    <div class="courseSearchComponent">
        <div class="searchContainer">
            <v-ons-search-input
                ref="searchInput"
                class="courseInput"
                placeholder="Search by Course, Topic or Beit Midrash"
                v-model="Query"
            ></v-ons-search-input>

            <template v-if="ShowLoader">
                <div class="trailLoaderContainer">
                    <v-ons-progress-circular class="trailLoader" indeterminate="true"></v-ons-progress-circular>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
    data() {
        return {
            Query: null,
            DebouncedTopicsCall: debounce(this.GetCoursesByQuery, 500),
            ShowLoader: false,
            ShouldFetchMoreCourses: true
        };
    },
    async created() {
        const savedQuery = this.$route.query.search;

        if (savedQuery) {
            this.Query = savedQuery;
            await this.GetCoursesByQuery();
        } else {
            this.$store.commit("course/updateCourses", []);
        }
    },
    computed: {
        Limit: {
            get() {
                return this.$store.state.course.limit;
            },
            set(newLimit) {
                this.$store.commit("course/updateLimit", newLimit);
            }
        },
        Courses() {
            return this.$store.state.course.courses;
        }
    },
    methods: {
        async GetCoursesByQuery() {
            if (!this.ShouldFetchMoreCourses) return;

            this.ShowLoader = true;

            const courseLengthBefore = this.Courses.length;

            await this.$store.dispatch("course/getAllCourses", {
                course: {
                    search: this.Query,
                    limit: this.Limit
                }
            });

            if (courseLengthBefore === this.Courses.length && this.Limit > 40) {
                this.ShouldFetchMoreCourses = false;
            }

            this.ShowLoader = false;
        }
    },
    watch: {
        async Query(newVal) {
            if (newVal.length !== 0 && newVal.length < 3) return;

            this.Limit = 20;
            this.ShouldFetchMoreCourses = true;

            await this.DebouncedTopicsCall();
            this.$router.push({ query: { search: this.Query } });
        }
    }
};
</script>

<style lang="scss" scoped>
.courseSearchComponent {
    position: sticky;
    top: 0;
    .trailLoaderContainer {
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }

    .searchContainer {
        position: relative;

        .courseInput {
            width: 100%;
        }
    }
}
</style>
