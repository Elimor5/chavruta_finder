class ChangeStudentToUser < ActiveRecord::Migration[5.2]
  def change
      rename_column(:enrollments, :student_id, :user_id)
  end
end
