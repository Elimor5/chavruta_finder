<template>
    <div class="splitterContentComponent">
        <v-ons-page>
            <template v-if="IsLoggedIn">
                <UserAvatar></UserAvatar>
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
        }
    }
}
</script>
