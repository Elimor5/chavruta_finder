<template>
    <div class="formGroupComponent">
        <v-ons-list-item
            class="formGroupContainer"
            :class="{'success': IsSuccessState, 'error': IsErrorState}"
            modifier="nodivider"
        >
            <div class="left">
                <slot name="icon"></slot>
            </div>
            <label class="center">
                <slot name="input"></slot>

                <FormErrors :validation="validation"></FormErrors>
            </label>
        </v-ons-list-item>
    </div>
</template>

<script>
import FormErrors from "../form-errors/FormErrors.vue";

export default {
    props: ["validation"],
    components: {
        FormErrors
    },
    computed: {
        IsErrorState() {
            if (!this.validation) return false;

            const { $invalid, $error } = this.validation;

            return $invalid && $error;
        },
        IsSuccessState() {
            if (!this.validation) return false;

            const { $invalid, $error } = this.validation;

            return !$invalid && !$error;
        }
    }
};
</script>

<style lang="scss">
.formGroupComponent {
    position: relative;

    .formGroupContainer {
        height: 75px;

        .left {
            padding-bottom: 36px;
        }

        .inputField {
            width: 100%;
            padding-right: 20px;
        }

        &.success {
            .text-input--material {
                &:focus {
                    background-image: linear-gradient(green, green),
                        linear-gradient(to top, transparent 1px, #afafaf 1px);
                }
            }
        }

        &.error {
            .text-input--material {
                &:focus {
                    background-image: linear-gradient(red, red),
                        linear-gradient(to top, transparent 1px, #afafaf 1px);
                }
            }
        }

        .error {
            margin-top: 3px;
        }
    }
}
</style>
