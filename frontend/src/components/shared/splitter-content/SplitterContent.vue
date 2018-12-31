<template>
    <div class="splitterContentComponent">
        <h3 class="pageHeader">Chavruta Finder</h3>

        <template v-if="IsLoggedIn">
            <div class="avatarContainer">
                <UserAvatar size="70"></UserAvatar>
            </div>

            <p class="name">{{UserFullName}}</p>
        </template>

        <div class="navItems">
            <SideNavItem Route="Home">
                <template slot="icon">
                    <v-ons-icon icon="fa-home" class="list-item__icon"></v-ons-icon>
                </template>
                <template slot="content">Home</template>
            </SideNavItem>
            <hr>
            <SideNavItem Route="Find Chavruta">
                <template slot="icon">
                    <v-ons-icon icon="fa-search" class="list-item__icon"></v-ons-icon>
                </template>
                <template slot="content">Find Chavruta</template>
            </SideNavItem>
            <hr>
            <template v-if="IsLoggedIn">
                <SideNavItem Route="New Chavruta">
                    <template slot="icon">
                        <v-ons-icon icon="fa-book-reader" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="content">New Chavruta</template>
                </SideNavItem>
                <hr>
                <SideNavItem Route="Edit Account">
                    <template slot="icon">
                        <v-ons-icon
                            style="padding-right: 0"
                            icon="fa-user-edit"
                            class="list-item__icon"
                        ></v-ons-icon>
                    </template>
                    <template slot="content">Edit Account</template>
                </SideNavItem>
                <hr>
                <SideNavItem @click="LogOutUser">
                    <template slot="icon">
                        <v-ons-icon
                            icon="fa-sign-out"
                            class="list-item__icon"
                            style="padding-left: 0"
                        ></v-ons-icon>
                    </template>
                    <template slot="content">Log out</template>
                </SideNavItem>
            </template>
            <template v-else>
                <SideNavItem Route="Log In">
                    <template slot="icon">
                        <v-ons-icon icon="fa-key" class="list-item__icon"></v-ons-icon>
                    </template>
                    <template slot="content">Log In</template>
                </SideNavItem>
                <hr>
                <SideNavItem Route="Sign Up">
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
            return this.$store.dispatch("identity/logOutUser", { vm: this });
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
        font-size: 20px;
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
