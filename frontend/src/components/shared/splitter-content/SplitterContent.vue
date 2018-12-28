<template>
    <div class="splitterContentComponent">
        <v-ons-page>
            <template v-if="IsLoggedIn">
                <div class="avatarContainer" >
                    <UserAvatar></UserAvatar>
                </div>

                <p class="name">{{UserFullName}}</p>
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
import UserAvatar from '../user-avatar/UserAvatar.vue';

export default {
    components: {
        UserAvatar
    },
    computed: {
        IsLoggedIn() {
            return this.$store.getters['identity/isAuthenticated'];
        }, 
        UserFullName() {
            return this.$store.state.identity.currentUser.userIdentity.name;
        }
    }
}
</script>

<style lang="scss" scoped>
    .avatarContainer {
        display: flex;
        justify-content: center;

        margin-top: 50px;
    }
    .name {
        text-align: center;
    }
</style>
