class AddNotNullConstraintsPreferences < ActiveRecord::Migration[5.2]
    def change
        change_column(:preferences, :user_id, :integer, null: false)
        change_column(:preferences, :topic_id, :integer, null: false)
    end
end
