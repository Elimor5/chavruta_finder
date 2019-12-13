<template>
    <div class="MDButtonComponent">
        <button :class="{'inverted': inverted}" @click.stop.prevent="HandleClick">
            <slot></slot>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        inverted: {
            default: false
        }
    },
    methods: {
        HandleClick() {
            this.$emit("click");
        }
    }
};
</script>

<style lang="scss">
.MDButtonComponent {
    text-align: center;

    button {
        margin: 15px;
        width: 90%;
        height: 35px;
        background: $colorPrimary;
        color: white;
        font-size: 17px;
        font-weight: bold;
        border-radius: 5%;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19),
            0 6px 6px rgba(0, 0, 0, 0.23);

        &.inverted {
            box-shadow: none;
            background: transparent;
            border: none;
            color: $colorPrimary;
            text-transform: uppercase;
            width: initial;
            font-size: 13px;
            margin: 0;
        }
    }
}
</style>

