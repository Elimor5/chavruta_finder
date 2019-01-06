# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_01_06_013739) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "availabilities", force: :cascade do |t|
    t.string "occurrence", null: false
    t.string "weekdays"
    t.integer "length", null: false
    t.integer "month_day"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.time "start_time", null: false
  end

  create_table "course_schedules", force: :cascade do |t|
    t.integer "course_id", null: false
    t.integer "availability_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["availability_id"], name: "index_course_schedules_on_availability_id"
    t.index ["course_id"], name: "index_course_schedules_on_course_id"
  end

  create_table "courses", force: :cascade do |t|
    t.integer "topic_id", null: false
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.string "level", null: false
    t.integer "instructor_id"
    t.text "summary"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "title", null: false
    t.integer "author_id", null: false
    t.string "gender_restriction", null: false
    t.index ["author_id"], name: "index_courses_on_author_id"
    t.index ["instructor_id"], name: "index_courses_on_instructor_id"
    t.index ["topic_id"], name: "index_courses_on_topic_id"
  end

  create_table "enrollments", force: :cascade do |t|
    t.integer "course_id"
    t.integer "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_id"], name: "index_enrollments_on_course_id"
    t.index ["user_id"], name: "index_enrollments_on_user_id"
  end

  create_table "preferences", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "topic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id"], name: "index_preferences_on_topic_id"
    t.index ["user_id"], name: "index_preferences_on_user_id"
  end

  create_table "rescheduled_classes", force: :cascade do |t|
    t.datetime "datetime", null: false
    t.text "summary"
    t.integer "course_schedule_id", null: false
    t.integer "length", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["course_schedule_id"], name: "index_rescheduled_classes_on_course_schedule_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "author_id"
    t.index ["name"], name: "index_topics_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "name", null: false
    t.string "username", null: false
    t.string "phone"
    t.string "level"
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "reset_digest"
    t.datetime "reset_sent_at"
    t.boolean "is_instructor", default: false, null: false
    t.boolean "is_male", default: true, null: false
    t.index ["username", "session_token"], name: "index_users_on_username_and_session_token", unique: true
  end

end
