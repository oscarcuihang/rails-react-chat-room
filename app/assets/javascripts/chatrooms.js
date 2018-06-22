
$(document).ready(function() {
  document.getElementById('new_message').addEventListener('keypress', function(e) {
    if (e.keyCode == 13) {
        e.preventDefault();
        e.currentTarget.submit();
    }
  });
});
