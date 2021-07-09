$(document).ready(function () {
    $("a").on('click', function (event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function () {
                window.location.hash = hash;
            });
        }
    });
});

jQuery(document).ready(function($) {
    tab = $('.tabs h3 a');
  
    tab.on('click', function(event) {
      event.preventDefault();
      tab.removeClass('active');
      $(this).addClass('active');
  
      tab_content = $(this).attr('href');
      $('div[id$="tab-content"]').removeClass('active');
      $(tab_content).addClass('active');
    });
  });

//   toggle sidenav
$(document).ready(function() {
    $(".hamburguer").click(function() {
        $(".links").toggleClass("active")
        $(this).toggleClass("active")
    })
})

$(document).ready(function() {
    var elem = $(".tasks-overflow");
    if(elem){
        if (elem.text().length > 10)
                elem.text(elem.text().substr(0,10))
    }
});