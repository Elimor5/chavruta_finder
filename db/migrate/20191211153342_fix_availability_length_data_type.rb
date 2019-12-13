class FixAvailabilityLengthDataType < ActiveRecord::Migration[5.2]
  def change
    change_column :availabilities, :length, :decimal, null: false
  end
end
