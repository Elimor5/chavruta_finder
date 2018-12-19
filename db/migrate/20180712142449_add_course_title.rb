class AddCourseTitle < ActiveRecord::Migration[5.2]
  def change
      add_column :courses, :title, :text, null: false
  end
end
