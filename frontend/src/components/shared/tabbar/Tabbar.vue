<template>
    <div class="tabbarComponent">
        <div class="tabbarContainer">
            <span
                class="tabOption"
                v-for="tabOption in TabOptions"
                :key="tabOption"
                :class="{'active': IsActive(tabOption)}"
                :style="{'width': TabWidth}"
                @click="SelectTab(tabOption)"
            >
                <h6>{{tabOption}}</h6>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        TabOptions: {
            required: true
        }
    },
    data() {
        return {
            ActiveOption: this.TabOptions[0]
        };
    },
    computed: {
        TabWidth() {
            return Math.round(100 / this.TabOptions.length) + "%";
        }
    },
    methods: {
        IsActive(tabOption) {
            return this.ActiveOption === tabOption;
        },
        SelectTab(tabOption) {
            this.ActiveOption = tabOption;

            this.$emit("update", tabOption);
        }
    }
};
</script>

<style lang="scss">
.tabbarComponent {
    position: sticky;
    top: 0;

    .tabbarContainer {
        display: flex;
        flex-wrap: nowrap;
        background: $colorPrimary;

        .tabOption {
            color: #9cb5de;
            padding: 0;
            box-shadow: 0 4px 2px -2px gray;
            transition: 0.5s background-color ease;

            h6 {
                text-align: center;
                height: 100%;
                width: 100%;
                padding: 13px 0px;
                font-weight: bold;
                margin: 0;
                font-size: 16px;
            }

            &.active {
                color: white;

                background: darken($colorPrimary, 10%);
            }
        }
    }
}
</style>    