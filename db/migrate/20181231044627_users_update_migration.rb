class UsersUpdateMigration < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :is_instructor, :boolean, null: false, default: false
    add_column :users, :is_male, :boolean, null: false, default: true
  end
end
