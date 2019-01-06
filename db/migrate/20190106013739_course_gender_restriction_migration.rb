class CourseGenderRestrictionMigration < ActiveRecord::Migration[5.2]
  def change
    add_column :courses, :gender_restriction, :integer, null: false
  end
end
