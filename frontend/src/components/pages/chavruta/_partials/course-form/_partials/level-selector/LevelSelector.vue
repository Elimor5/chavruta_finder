<template>
    <div class="levelSelectorComponent">
        <v-ons-list>
            <v-ons-list-item v-for="(level, $index) in Levels" :key="level" tappable>
                <label class="left">
                    <v-ons-radio :input-id="'radio-' + $index" :value="$index" v-model="Level"></v-ons-radio>
                </label>
                <label :for="'radio-' + $index" class="center">{{ level }}</label>
            </v-ons-list-item>
        </v-ons-list>
    </div>
</template>

<script>
export default {
    created() {
        this.Level = this.value;
    },
    computed: {
        Levels() {
            return ["Beginner", "Intermediate", "Advanced", "Any"];
        }
    },
    props: {
        value: {
            type: String
        }
    },
    data() {
        return {
            Level: null
        };
    },
    watch: {
        Level(newVal) {
            this.$emit("input", newVal);
        }
    }
};
</script>

<style lang="scss" scoped>
.levelSelectorComponent {
    margin: 0 -15px;

    .header {
        padding: 15px;
    }
}
</style>
