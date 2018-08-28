$(".home").on("click", function(e) {
    $(".home").attr('disabled', 'disabled');
    setTimeout(function() {
        $(".home").removeAttr('disabled');
    }, 600);
});