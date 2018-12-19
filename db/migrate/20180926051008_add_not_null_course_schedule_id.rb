class AddNotNullCourseScheduleId < ActiveRecord::Migration[5.2]
  def change
      change_column :scheduled_classes, :course_schedule_id, :integer, null: false
  end
end
