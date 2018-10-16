Rails.application.routes.draw do
  devise_for :users, controllers: {
    registration: 'users/registration',
    sessions: 'users/sessions'
  }
  resources :email_models
  resources :route_maps
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
