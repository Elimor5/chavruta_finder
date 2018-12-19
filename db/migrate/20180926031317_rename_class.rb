class RenameClass < ActiveRecord::Migration[5.2]
  def change
      rename_table :classes, :scheduled_classes

      rename_column :scheduled_classes, :course_id, :course_schedule_id

      change_column :scheduled_classes, :datetime, :datetime, null: false
      change_column :scheduled_classes, :length, :integer, null: false
  end
end
