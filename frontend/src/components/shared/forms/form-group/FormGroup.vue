<template>
    <div class="formGroupComponent">
        <div class="focusNavbarOffset" :class="{'inputError': IsErrorState}"></div>

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

                <template v-if="ErrorMessage">
                    <p class="error">{{ErrorMessage}}</p>
                </template>
            </label>
        </v-ons-list-item>
    </div>
</template>

<script>
export default {
    props: ["validation"],
    computed: {
        ErrorMessage() {
            const { validation } = this;
            const errors = [];

            if (!validation || !validation.$error) return null;

            if (validation.hasOwnProperty("required") && !validation.required) {
                errors.push("this field is required");
            } else if (
                validation.hasOwnProperty("email") &&
                !validation.email
            ) {
                errors.push("please enter a valid email address");
            } else if (
                validation.hasOwnProperty("minLength") &&
                !validation.minLength
            ) {
                errors.push(
                    `minimum length must be at least ${
                        validation.$params.minLength.min
                    } characters`
                );
            } else if (
                validation.hasOwnProperty("maxLength") &&
                !validation.maxLength
            ) {
                errors.push(
                    `max length must be at least ${
                        validation.$params.maxLength.max
                    } characters`
                );
            }

            return errors[0];
        },
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

    .focusNavbarOffset {
        position: absolute;
        top: -100px;
        visibility: hidden;
    }

    .formGroupContainer {
        height: 75px;

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
            margin: 0 0 3px 0;
            font-size: 12px;
            color: red;
        }
    }
}
</style>
