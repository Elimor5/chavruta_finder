<template>
    <div class="createTopicFormComponent">
        <form @submit.prevent="SubmitForm" novalidate>
            <v-ons-list class="formInputContainer">
                <cf-formgroup :validation="$v.Form.Name">
                    <template slot="icon">
                        <v-ons-icon
                            icon="fa-book-open"
                            class="list-item__icon"
                            size="30px, material:30px"
                        ></v-ons-icon>
                    </template>
                    <template slot="input">
                        <v-ons-input
                            class="inputField"
                            float="true"
                            placeholder="Topic Name "
                            v-model.trim="Form.Name"
                        ></v-ons-input>
                    </template>
                </cf-formgroup>

                <MDButton>Add</MDButton>
            </v-ons-list>
        </form>
    </div>
</template>

<script>
import CreateTopicForm from "../../../../../../../../scripts/forms/chavruta/CreateTopicForm";

import MDButton from "../../../../../../../shared/buttons/md-button/MDButton.vue";

export default {
    created() {
        this.Form.Name = this.Query;
    },
    components: {
        MDButton
    },
    data() {
        return {
            Form: CreateTopicForm.getDefaultData()
        };
    },
    props: {
        Query: {
            type: String
        }
    },
    methods: {
        async SubmitForm() {
            if (!this.$validate(this.$v)) return;

            this.$loader.show();

            try {
                const convertedForm = CreateTopicForm.convertFormData(
                    this.Form
                );

                const response = await CreateTopicForm.submit(convertedForm);

                this.$store.commit("topic/mergeTopics", response.data);

                this.$emit("topic-created", Object.keys(response.data)[0]);

                this.$ons.notification.toast(
                    `Topic has been added successfully`,
                    { timeout: 5000, animation: "ascend" }
                );
            } catch (e) {
                this.$toastr.toast(e);
            }

            this.$loader.hide();
        }
    },
    validations: CreateTopicForm.getValidations()
};
</script>

<style lang="scss" scoped>
.createTopicFormComponent {
    margin-top: 20px;

    .formInputContainer {
        display: flex;
        align-items: center;

        .formGroupComponent {
            flex-grow: 1;
        }

        .MDButtonComponent {
            margin-top: 0;
            margin: 0 15px;
            width: inherit;
        }
    }
}
</style>


