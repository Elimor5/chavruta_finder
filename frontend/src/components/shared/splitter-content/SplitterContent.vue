<template>
    <div class="splitterContentComponent">
        <v-ons-page>
            <h2 class="pageHeader">Chavruta Finder</h2>

            <template v-if="IsLoggedIn">
                <div class="avatarContainer">
                    <UserAvatar></UserAvatar>
                </div>

                <p class="name">{{UserFullName}}</p>

                <v-ons-list>
                    <v-ons-list-item modifier="longdivider" tappable>
                        <button @click="LogOutUser">
                            <div class="center">Log Out</div>
                        </button>
                    </v-ons-list-item>
                </v-ons-list>
            </template>
            <template v-else>
                <v-ons-list>
                    <router-link :to="{name:'Log In'}">
                        <v-ons-list-item modifier="longdivider" tappable>
                            <div class="center">Log In</div>
                        </v-ons-list-item>
                    </router-link>
                    <v-ons-list-item modifier="longdivider" tappable>
                        <div class="center">Sign Up</div>
                    </v-ons-list-item>
                </v-ons-list>
            </template>
        </v-ons-page>
    </div>
</template>

<script>
import UserAvatar from "../user-avatar/UserAvatar.vue";

export default {
    components: {
        UserAvatar
    },
    computed: {
        IsLoggedIn() {
            return this.$store.state.identity.isAuthenticated;
        },
        UserFullName() {
            return this.$store.state.identity.currentUser.userIdentity.name;
        }
    },
    methods: {
        LogOutUser() {
            return this.$store.dispatch("identity/logOutUser");
        }
    }
};
</script>

<style lang="scss" scoped>
.pageHeader {
    padding-left: 15px;
    margin-bottom: 0;
}

.avatarContainer {
    display: flex;
    justify-content: center;

    margin-top: 30px;
}
.name {
    text-align: center;
}
</style>
