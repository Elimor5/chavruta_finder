class ChangeAvailabilityLengthToTimeRange < ActiveRecord::Migration[5.2]
  def change
      add_column(:availabilities, :start_time, :time, null: false)
  end
end
