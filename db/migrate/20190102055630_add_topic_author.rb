class AddTopicAuthor < ActiveRecord::Migration[5.2]
  def change
    add_column :topics, :author_id, :integer
  end
end
