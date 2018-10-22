Rails.application.routes.draw do
  # get 'favorites/index'
  # get 'favorites/show'
  # get 'favorites/create'
  # get 'favorites/new'
  # get 'favorites/destroy'
  get 'midpoints/new'
  get 'locations/new'
  # get 'profiles/index'
  # get 'profiles/edit'
  # get 'profiles/update'
  resources :profiles
  devise_for :users, controllers: {
    registration: 'users/registration',
    sessions: 'users/sessions'
  }

  root to: 'static#splashpage'
  # get 'static/splashpage', to: 'static#splashpage'
  resources :email_models
  resources :route_maps

  resources :locations
  resources :midpoints
  resources :favorites



  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
