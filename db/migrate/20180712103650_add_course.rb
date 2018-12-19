class AddCourse < ActiveRecord::Migration[5.2]
    def change
        create_table :courses do |t|
            t.integer :topic_id, null: false
            t.date :start_date, null: false
            t.date :end_date, null: false
            t.string :level, null: false
            t.integer :instructor_id
            t.text :summary

            t.timestamps
        end
    end
end
