class AddAuthorToCourse < ActiveRecord::Migration[5.2]
  def change
      add_column :courses, :author_id, :integer, null: false
  end
end
