<template>
    <div class="splitterContentComponent">
        <h3 class="pageHeader">Chavruta Finder</h3>

        <template v-if="IsLoggedIn">
            <div class="avatarContainer">
                <UserAvatar></UserAvatar>
            </div>

            <p class="name">{{UserFullName}}</p>
        </template>

        <div class="navItems">
            <SideNavItem @click="NavigateHome">
                <template slot="icon">
                    <v-ons-icon icon="fa-home" class="list-item__icon"></v-ons-icon>
                </template>
                <template slot="content">Home</template>
            </SideNavItem>
            <hr>
            <template v-if="IsLoggedIn">
                <SideNavItem @click="LogOutUser">
                    <template slot="icon">
                        <v-ons-icon icon="fa-sign-out" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="content">Log out</template>
                </SideNavItem>
            </template>
            <template v-else>
                <SideNavItem @click="NavigateToLogin">
                    <template slot="icon">
                        <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="content">Log In</template>
                </SideNavItem>
                <hr>
                <SideNavItem @click="NavigateToSignUp">
                    <template slot="icon">
                        <v-ons-icon icon="fa-pen" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="content">Sign Up</template>
                </SideNavItem>
            </template>
        </div>
    </div>
</template>

<script>
import UserAvatar from "../user-avatar/UserAvatar.vue";
import SideNavItem from "./_partials/side-nav-item/SideNavItem.vue";

export default {
    components: {
        UserAvatar,
        SideNavItem
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
            return this.$store.dispatch("identity/logOutUser", {vm: this});
        },
        NavigateHome() {
            this.$router.push("/");
        },
        NavigateToLogin() {
            const returnUrl = this.$route.query.returnUrl || this.$route.fullPath;

            this.$router.push({
                name: "Log In",
                query: { returnUrl }
            });
        },
        NavigateToSignUp() {
            const returnUrl = this.$route.query.returnUrl || this.$route.fullPath;

            this.$router.push({
                name: "Sign Up",
                query: { returnUrl }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.splitterContentComponent {
    background-color: #efeff4;
    height: 100%;

    .pageHeader {
        text-align: center;
        padding: 15px;
        margin: 0;
    }

    .avatarContainer {
        display: flex;
        justify-content: center;

        margin-top: 10px;
    }
    .name {
        text-align: center;
    }

    .navItems {
        width: 100%;
        background: white;
        padding: 7.5px 0;
    }
}
</style>
