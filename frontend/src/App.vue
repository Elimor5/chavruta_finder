<template>
    <div id="app">  
        <v-ons-splitter>
            <v-ons-splitter-side
                swipeable
                width="200px"
                collapse
                side="left"
                :open.sync="isSideOpen"
            >
                <v-ons-page>
                    <v-ons-list>
                        <v-ons-list-item tappable>
                            <div class="center">test</div>
                        </v-ons-list-item>
                    </v-ons-list>
                </v-ons-page>
            </v-ons-splitter-side>

            <v-ons-splitter-content>
                <v-ons-page>
                    <v-ons-toolbar>
                        <div class="left">
                            <v-ons-toolbar-button
                                icon="ion-navicon, material: md-menu"
                                @click="ToggleSplitter"
                            ></v-ons-toolbar-button>
                        </div>

                        <div class="center">{{$route.name}}</div>

                        <div class="right">
                            <v-ons-button modifier="quiet" @click="NavigateToLogin">Log in</v-ons-button>
                        </div>

                    </v-ons-toolbar>

                    <div class="pageContent" :class="{'loaderActive': ShowLoader}">
                        <router-view></router-view>
                        
                        <template v-if="ShowLoader">
                            <TrailLoader></TrailLoader>
                        </template>

                        <pre>{{ShowLoader}}</pre>
                    </div>
                </v-ons-page>
            </v-ons-splitter-content>
        </v-ons-splitter>
    </div>
</template>

<script>
import TrailLoader from './components/shared/loaders/TrailLoader.vue';

export default {
    components: {
        TrailLoader
    },
    data() {
        return {
            isSideOpen: false
        };
    },
    computed: {
        ShowLoader() {
            return this.$store.state.loader.isLoading;
        }
    },
    methods: {
        ToggleSplitter() {
            this.isSideOpen = !this.isSideOpen;
        },
        NavigateToLogin() {
            this.$router.push({name:"Log In"})
        }
    }
};
</script>

<style lang="scss" scoped>
    .pageContent {
        height: 100%;
        position: relative;
        transition: opacity .5s ease;
        opacity: 1;

        &.loaderActive {
            opacity: 0.55;
        }

        div:first-child {
            height: 100%;
        }
    }
</style>

