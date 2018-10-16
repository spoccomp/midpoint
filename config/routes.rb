Rails.application.routes.draw do
  # get 'profiles/index'
  # get 'profiles/edit'
  # get 'profiles/update'
  resources :profiles
  devise_for :users, controllers: {
    registration: 'users/registration',
    sessions: 'users/sessions'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
