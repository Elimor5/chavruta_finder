<template>
    <div class="sideNavItemComponent">
        <template v-if="Route">
            <router-link :to="{name: Route}" class="sideNavItemButton">
                <slot name="icon"></slot>
                <div class="contentContainer">
                    <slot name="content"></slot>
                </div>
            </router-link>
        </template>
        <template v-else>
            <button class="sideNavItemButton" @click="HandleClick">
                <slot name="icon"></slot>
                <div class="contentContainer">
                    <slot name="content"></slot>
                </div>
            </button>
        </template>
    </div>
</template>

<script>
export default {
    methods: {
        HandleClick() {
            return this.$emit("click");
        }
    },
    props: {
        Route: {
            type: String
        }
    }
};
</script>

<style lang="scss" scoped>
.sideNavItemComponent {
    .sideNavItemButton {
        width: 97%;
        height: 30px;
        font-size: 15px;
        background-color: white;
        border: none;
        color: gray;

        text-align: left;
        text-decoration: none;

        display: flex;
        align-items: center;

        &:focus {
            border: 1px dotted gray;
        }

        &.router-link-exact-active {
            color: $colorPrimary;
        }

        .contentContainer {
            padding: 0 7.5px;
        }
    }
}
</style>

