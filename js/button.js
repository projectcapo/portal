

$("#transition").on("click", function(e) {
    $("#transition").attr('disabled', 'disabled');
    setTimeout(function() {
        $("#transition").removeAttr('disabled');
    }, 1200);
});