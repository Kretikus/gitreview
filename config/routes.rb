Rails.application.routes.draw do
  resources :commits, param: :sha
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
