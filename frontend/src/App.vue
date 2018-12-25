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

                        <div class="center">Chavruta Finder</div>
                    </v-ons-toolbar>

                    <div class="pageContent">
                        <router-view></router-view>
                    </div>
                </v-ons-page>
            </v-ons-splitter-content>
        </v-ons-splitter>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSideOpen: false
        };
    },
    methods: {
        ToggleSplitter() {
            this.isSideOpen = !this.isSideOpen;
        }
    }
};
</script>

<style lang="scss" scoped>
    .pageContent {
        height: 100%;

        div:first-child {
            height: 100%;
        }
    }
</style>

