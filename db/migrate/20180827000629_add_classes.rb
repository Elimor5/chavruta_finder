class AddClasses < ActiveRecord::Migration[5.2]
  def change
      create_table :classes do |t|
           t.datetime :datetime, null: false
           t.text :summary
           t.integer :course_id
           t.integer :length, null: false

           t.timestamps
       end

       add_index(:classes, :course_id)
  end
end
