<template>
    <div class="toastrComponent" :class="{'shown': ToastrToggled}">
        <div class="toastrContainer">
            <div class="iconContainer">
                <v-ons-icon icon="fa-warning" class="list-item__icon"></v-ons-icon>
            </div>
            <div class="messageContainer">
                <span>{{ToasterMessage}}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        ToasterMessage() {
            return this.$store.state.toastr.message;
        },
        ToastrToggled() {
            return this.$store.state.toastr.isVisible;
        }
    }
}
</script>

<style lang="scss" scoped>
.toastrComponent {
    position: absolute;
    top: -57px;
    z-index: 1;

    &.shown {
        top: 0;
    }

    height: 57px;
    width: 100%;
    background-color: red;
    color: white;
    font-size: 18px;

    border-radius: 3px;

    transition: top 0.5s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;

    .toastrContainer {
        display: flex;
        align-items: center;

        .iconContainer {
            margin: 0 15px;
        }

        .messageContainer {
            flex-grow: 1;
        }
    }
}
</style>

