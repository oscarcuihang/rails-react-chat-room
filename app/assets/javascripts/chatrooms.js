// document.getElementById('message_content').addEventListener("keydown", function(e) {
//     if (!e) { var e = window.event; }
//     e.preventDefault();
//     if (e.keyCode == 13) { submitFunction(); }
// }, false);


$('#message_content').keydown(function (e) {
    var keypressed = e.keyCode || e.which;
    if (keypressed === 13) {
        $(this).closest('form').submit();
    }
});