Rails.application.routes.draw do
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
 

  resources :email_models
  resources :route_maps

  resources :locations
  resources :midpoints


  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
