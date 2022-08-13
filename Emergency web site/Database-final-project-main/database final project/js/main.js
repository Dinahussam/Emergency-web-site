(function($, window, document, undefined) {

    $.fn.slider = function() {

        return this.each(function(options) {

            var that = $(this);

            var defaults = {
                start_timeout: 1500,
                slide_animation : 3000,
                speed_of_effects : 1.3,
                delay_of_effects : 0.2
            };

            var options = $.extend(defaults, options);

            var obj = {
                slides : $(that).find('li'),
                start : false,
                clips_number : 8,
                first_slide : function() {
                    return this.slides.eq(0);
                },
                start_clip_slide : function() {
                    return this.slides.eq(1);
                },
                loop : function loop(next_slide) {

                        for (var i = 0; i < obj.clips_number; i++) {

                            if(obj.start == false) {
                                obj.start_clip_slide().css({
                                    'zIndex': 1,
                                    'display': 'block'
                                });
                            }

                            var canvas_element = $('<canvas>').attr({
                                id: 'canvasID_' + ( i + 1 ),
                                class: 'canvasClass'
                            }).attr({
                                width: 100,
                                height: 500
                            }).css('left', 100 * i);

                            if(obj.start == false) {
                                canvas_element.appendTo(obj.start_clip_slide());
                            } else {
                                canvas_element.appendTo(next_slide);
                            }

                            var canvas = $('#canvasID_' + (i + 1))[0];

                            var ctx = canvas.getContext('2d');
                            ctx.mozImageSmoothingEnabled = false;
                            ctx.webkitImageSmoothingEnabled = false;
                            ctx.msImageSmoothingEnabled = false;
                            ctx.imageSmoothingEnabled = false;

                            var img = document.createElement('img');

                            if(obj.start == false) {
                                img_src = obj.start_clip_slide().find('img').attr('src');
                            } else {
                                img_src = next_slide.find('img').attr('src');
                            }

                            img.src = img_src;

                            ctx.drawImage(img, 100 * i, 0, 100, 500, 0, 0, 100, 500);

                        }

                },
                animation :  function animation() {

                    if(obj.start == false) {
                        obj.loop();
                    }
                    obj.start = true;

                    var tl = new TimelineMax();

                    tl.add( TweenMax.set('.canvasClass', {top: -500}) );
                    tl.add( TweenMax.staggerTo(".canvasClass", options.speed_of_effects, {top: 0}, options.delay_of_effects, myCompleteAll ) );

                    function myCompleteAll() {
                        setTimeout(obj.all_done, options.slide_animation);
                    }

                },
                change_slide : function change_slide(next_slide) {

                    $('canvas').remove();

                    var next_slide = next_slide;

                    obj.loop(next_slide);

                    obj.animation();

                },
                all_done : function all_done() {

                    obj.slides.css({
                        'zIndex': 1,
                        'display': 'block'
                    });

                    var current_slide = $(that).find('li.active');

                    if (current_slide.length == 0) {
                        current_slide = obj.start_clip_slide();
                    }

                    current_slide.css({
                        'zIndex': 2,
                        'display': 'block'
                    }).find('img').css('visibility','visible');

                    var next_slide = current_slide.next();

                    if (next_slide.length == 0) {

                        current_slide.css({
                            'zIndex': 2,
                            'display': 'block'
                        }).find('img').css('visibility','visible');

                        next_slide = obj.first_slide();
                    }

                    obj.slides.removeClass('active');
                    next_slide.addClass('active');

                    next_slide.css({
                        'zIndex': 3,
                        'display': 'block'
                    }).find('img').css('visibility','hidden');

                    obj.change_slide(next_slide);

                },
                init : function () {

                    obj.first_slide().css({
                        'zIndex': 1,
                        'display': 'block'
                    }).find('img').css('visibility','visible');

                    obj.start_clip_slide().find('img').css('visibility','hidden');

                    setTimeout(obj.animation, defaults.start_timeout);
                }
            };

            obj.init();

        });

    };

    $(document).ready(function() {
        $('#banner').slider();
    });



})(jQuery, window, document);

function searchToggle(obj, evt){
var container = $(obj).closest('.search-wrapper');
    if(!container.hasClass('active')){
        container.addClass('active');
        evt.preventDefault();
    }
    else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
        container.removeClass('active');
        // clear input
        container.find('.search-input').val('');
    }
}


// calendar
const date = new Date();

const renderCalendar = () => {
  date.setDate(1);

  const monthDays = document.querySelector(".days");

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();

  const prevLastDay = new Date(
    date.getFullYear(),
    date.getMonth(),
    0
  ).getDate();

  const firstDayIndex = date.getDay();

  const lastDayIndex = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDay();

  const nextDays = 7 - lastDayIndex - 1;

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  document.querySelector(".date h1").innerHTML = months[date.getMonth()];

  document.querySelector(".date p").innerHTML = new Date().toDateString();

  let days = "";

  for (let x = firstDayIndex; x > 0; x--) {
    days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
  }

  for (let i = 1; i <= lastDay; i++) {
    if (
      i === new Date().getDate() &&
      date.getMonth() === new Date().getMonth()
    ) {
      days += `<div class="today">${i}</div>`;
    } else {
      days += `<div>${i}</div>`;
    }
  }

  for (let j = 1; j <= nextDays; j++) {
    days += `<div class="next-date">${j}</div>`;
    monthDays.innerHTML = days;
  }
};

document.querySelector(".prev").addEventListener("click", () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
});

document.querySelector(".next").addEventListener("click", () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
});

renderCalendar();
