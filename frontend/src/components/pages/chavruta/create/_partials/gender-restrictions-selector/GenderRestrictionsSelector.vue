<template>
    <div class="genderResstrictionsSelectorComponent">
        <v-ons-list>
            <v-ons-list-item v-for="(preference, $index) in Preferences" :key="preference" tappable>
                <label class="left">
                    <v-ons-radio
                        :input-id="'radio-' + preference"
                        :value="$index"
                        v-model="Preference"
                    ></v-ons-radio>
                </label>
                <label :for="'radio-' + preference" class="center">{{ preference }}</label>
            </v-ons-list-item>
        </v-ons-list>
    </div>
</template>

<script>
export default {
    created() {
        this.Preference = this.value;
    },
    computed: {
        Preferences() {
            return ["Men", "Women", "Any"];
        }
    },
    props: {
        value: {
            type: String
        }
    },
    data() {
        return {
            Preference: null
        };
    },
    watch: {
        Preference(newVal) {
            this.$emit("input", newVal);
        }
    }
};
</script>

<style lang="scss" scoped>
.genderResstrictionsSelectorComponent {
    margin: 0 -15px;

    .header {
        padding: 15px;
    }
}
</style>
