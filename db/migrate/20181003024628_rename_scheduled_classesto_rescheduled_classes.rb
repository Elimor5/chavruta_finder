class RenameScheduledClassestoRescheduledClasses < ActiveRecord::Migration[5.2]
  def change
      rename_table :scheduled_classes, :rescheduled_classes
  end
end
