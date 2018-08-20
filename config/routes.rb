Rails.application.routes.draw do
  get 'static_pages/home'
  get 'static_pages/sign_up'
  resources :commits, param: :sha
  root 'static_pages#home'

  get '/signup', to: 'static_pages#sign_up' 

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
