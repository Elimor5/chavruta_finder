<template>
    <div id="app" :class="{'loaderActive': ShowLoader}">
        <Toastr></Toastr>

        <template v-if="ShowLoader">
            <TrailLoader></TrailLoader>
        </template>

        <template v-if="IsStatusCallMade">
            <v-ons-splitter>
                <v-ons-splitter-side
                    swipeable
                    width="200px"
                    collapse
                    side="left"
                    :open.sync="isSideOpen"
                    swipe-target-width="25px"
                >
                    <SplitterContent></SplitterContent>
                </v-ons-splitter-side>

                <v-ons-splitter-content>
                    <v-ons-page>
                        <v-ons-toolbar>
                            <div class="left">
                                <v-ons-toolbar-button icon="md-menu" @click="ToggleSplitter"></v-ons-toolbar-button>
                            </div>

                            <div class="center">{{RouteName}}</div>
                            <template v-if="!IsLoggedIn">
                                <div class="right">
                                    <v-ons-button modifier="quiet" @click="NavigateToLogin">Log in</v-ons-button>
                                </div>
                            </template>
                        </v-ons-toolbar>

                        <div class="pageContent">
                            <router-view></router-view>
                        </div>
                    </v-ons-page>
                </v-ons-splitter-content>
            </v-ons-splitter>
        </template>
    </div>
</template>

<script>
import TrailLoader from "./components/shared/loaders/TrailLoader.vue";
import Toastr from "./components/shared/toasters/Toastr.vue";
import SplitterContent from "./components/shared/splitter-content/SplitterContent.vue";
import PullHook from "./components/shared/pull-hook/PullHook.vue";

export default {
    components: {
        TrailLoader,
        Toastr,
        SplitterContent,
        PullHook
    },
    data() {
        return {
            isSideOpen: false
        };
    },
    computed: {
        ShowLoader() {
            return this.$store.state.loader.isLoading;
        },
        IsLoggedIn() {
            return this.$store.state.identity.isAuthenticated;
        },
        IsStatusCallMade() {
            return this.$store.state.identity.isStatusCallMade;
        },
        RouteName() {
            return this.$route.name || "";
        }
    },
    methods: {
        ToggleSplitter() {
            this.isSideOpen = !this.isSideOpen;
        },
        NavigateToLogin() {
            this.$router.push({ name: "Log In" });
        }
    },
    watch: {
        $route(to, from) {
            this.isSideOpen = false;
        },
        IsLoggedIn(newVal) {
            this.isSideOpen = false;
        }
    }
};
</script>

<style lang="scss" scoped>
#app {
    transition: opacity 0.5s ease;
    opacity: 1;

    &.loaderActive {
        opacity: 0.55;
    }

    .pageContent {
        height: 100%;
        position: relative;

        div:first-child {
            height: 100%;
        }
    }
}
</style>

