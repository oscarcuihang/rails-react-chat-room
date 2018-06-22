$(document) on 'turbolinks:load', ->
  $('#new_message') on 'keypress', (e) ->
    if e && e.keyCode == 13
      $(this).submit()