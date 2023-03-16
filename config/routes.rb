Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  post "/login", to: "sessions#login"
  post "/signup", to: "sessions#signup"

  resources :todos

  get '/users', to: 'users#index'
  get '/users/:id', to: 'users#show'
  post '/users', to: 'users#create'
  delete '/users/:id', to: 'users#destroy'
  patch '/users/:id', to: 'users#update'

  get '/posts', to: 'posts#index'
  get '/posts/:id', to: 'posts#show'
  post '/posts', to: 'posts#create'
  delete '/posts/:id', to: 'posts#destroy'
  get '/postsU/:id', to: 'posts#findposts'
  patch '/posts/:id', to: 'posts#update'

  get '/comments', to: 'comments#index'
  get '/comments/:id', to: 'comments#show'
  post '/comments', to: 'comments#create'
  delete '/comments/:id', to: 'comments#destroy'
  get '/commentsP/:id', to: 'comments#findpost'

  get '/messages', to: 'messages#index'
  post '/messages', to: 'messages#create'
  delete '/messages/:id', to: 'messages#destroy'
    
end
