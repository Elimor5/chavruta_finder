class AddAvailability < ActiveRecord::Migration[5.2]
    def change
        create_table :availabilities do |t|
             t.string :occurrence, null: false
             t.integer :week_day
             t.integer :length, null: false
             t.integer :month_day
             t.integer :user_id, null: false
             t.timestamps
         end

        add_index(:availabilities, :user_id)
        add_index(:courses, :instructor_id)
        add_index(:courses, :author_id)
        add_index(:courses, :topic_id)
    end
end
