Rails.application.routes.draw do
    # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
    namespace :api, defaults: {format: :json} do
        resources :users, only: [:index, :show, :create, :update]
        resource :session, only: [:show, :create, :destroy]
        resource :reset, only: [:create]

        resources :topics, only: [:index, :create, :destroy]
        resources :courses, only: [:index, :create, :show, :update, :destroy]
        resources :preferences, only: [:create, :update, :destroy]
        resources :availabilities, only: [:create, :update, :destroy]
        resources :enrollments, only: [:create, :destroy]
    end

    root to: "static_pages#root"
end
