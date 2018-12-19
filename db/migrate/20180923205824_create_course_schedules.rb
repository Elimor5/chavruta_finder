class CreateCourseSchedules < ActiveRecord::Migration[5.2]
    def change
        create_table :course_schedules do |t|
            t.integer :course_id, null: false
            t.integer :availability_id, null: false

            t.timestamps
        end

        add_index(:course_schedules, :course_id)
        add_index(:course_schedules, :availability_id)
    end
end
