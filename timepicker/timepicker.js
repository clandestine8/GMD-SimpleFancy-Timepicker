/**
 * Created by clandestine8 on 10/7/2015.
 */
if ( $( ".time-picker" ).length ) {
    $("#body").append('<div class=time style=line-height:1.2;width:100%;height:100%;padding:0;margin:0;background-color:rgba(0,0,0,.5);position:fixed;top:0;left:0;z-index:99800;display:none;><div class=timepicker><div class=time_digits><div class=hours></div><div class=div>:</div><div class=mins></div></div><div class=time_face><div class=face><div class=circle><div class="hours active"><div class="nums twelve hour">12</div><div class="nums one hour">1</div><div class="nums two hour">2</div><div class="nums three hour">3</div><div class="nums four hour">4</div><div class="nums five hour">5</div><div class="nums six hour">6</div><div class="nums seven hour">7</div><div class="nums eight hour">8</div><div class="nums nine hour">9</div><div class="nums ten hour">10</div><div class="nums eleven hour">11</div></div><div class=minutes><div class="nums twelve mins">00</div><div class="nums one mins">05</div><div class="nums two mins">10</div><div class="nums three mins">15</div><div class="nums four mins">20</div><div class="nums five mins">25</div><div class="nums six mins">30</div><div class="nums seven mins">35</div><div class="nums eight mins">40</div><div class="nums nine mins">45</div><div class="nums ten mins">50</div><div class="nums eleven mins">55</div></div><div style="width:20px;height:20px;position:absolute;top:calc(50% - 10px);left:calc(50% - 10px);border-radius:50%;background-color:#444;padding:0;margin:0;z-index:99904"></div></div></div><div class=values><div class=am>AM</div><div class=pm>PM</div><div class=hour><div class=grab></div></div><div class=minute><div class=grab></div></div></div></div><div class=buttons><div class=now>Now</div><div class=middle></div><div class=set>OK</div></div></div></div>');
}

$('.time-picker').click(TPActive);
function TPActive (event) {
    $(".time").show();
    Timepicker(event);
}
function Set (event, time){
    var AMPM;
    if (time.ampm === 'a') { AMPM = "AM"} else {  AMPM = "PM" }
    console.log(event);
    $(event.target).val(pad(time.hour)+":"+pad(time.min)+":00"+AMPM);
    id_name = $(event.target).attr("id");
    $('*[for="' + id_name + '"]').addClass("active");

    console.log (" Time Set  " + pad(time.hour)+":"+pad(time.min)+":00"+AMPM)
    $(".time").hide();
}


function Timepicker (event) {
    var time = {min: 0, hour: 0, ampm: 'a'};
    if ($(event.target).val() === "") {
        var date = new Date();
    } else {
        var date = new Date.parse($(event.target).val());
    }
    Now(date);
    function Now(date) {

        var hours = date.getHours();
        time.min = date.getMinutes();
        console.log(hours);
        if (hours === 0 || hours === 12) {
            if (hours === 0) {
                time.hour = 12;
                time.ampm = 'a';
            }
            if (hours === 12) {
                time.hour = 12;
                time.ampm = 'p';
            }
        } else if (hours < 12) {
            time.hour = hours;
            time.ampm = 'a';
        } else if (hours > 12) {
            time.hour = hours - 12;
            time.ampm = 'p';
        }
        console.log(time.ampm);
        $('.values .minute').css({
            'transform': 'translate(123.5px, 40px) rotate(' + (time.min * 6) + 'deg)',
            'transform-origin': 'center bottom 0'
        }).removeClass("active");
        $('.values .hour').css({
            'transform': 'translate(122.5px, 55px) rotate(' + (time.hour * 30) + 'deg)',
            'transform-origin': 'center bottom 0'
        }).addClass("active");
        $(".time_face .minutes").removeClass("active");
        $(".time_face .hours").addClass("active");
        if (time.ampm === 'a') {
            $('.values .am').addClass('select');
            $('.values .pm').removeClass('select');
        } else if (time.ampm === 'p') {
            $('.values .pm').addClass('select');
            $('.values .am').removeClass('select');
        }
        $(".time_digits .hours").text(pad(time.hour)).addClass("active");
        $(".time_digits .mins").text(pad(time.min)).removeClass("active");

    }

    $(".time_face .nums.mins").mouseenter(function (e) {
        $(this).addClass("active");
    }).mouseleave(function (e) {
        $(this).removeClass("active");
    }).click(function () {
        var value = $(this).text();
        console.log('VALUE: ' + value);
        var trans = (value / 5) * 30;
        console.log('TRANSFORM: ' + trans);
        $('.values .minute').css({
            'transform': 'translate(123.5px, 40px) rotate(' + trans + 'deg)',
            'transform-origin': 'center bottom 0'
        }).removeClass("active");
        time.min = value;
        console.log('Time Set (min): ' + time.min);
        $(".time_face .minutes").removeClass("active");
        $(".time_face .hours").addClass("active");

        $(".time_digits .hours").text(pad(time.hour)).addClass("active");
        $(".time_digits .mins").text(pad(time.min)).removeClass("active");
        $('.values .hour').addClass("active");
    });

    $(".time_face .nums.hour").mouseenter(function (e) {
        $(this).addClass("active");
    }).mouseleave(function (e) {
        $(this).removeClass("active");
    }).click(function () {
        var value = $(this).text();
        console.log('VALUE: ' + value);
        var trans = (value) * 30;
        console.log('TRANSFORM: ' + trans);
        $('.values .hour').css({
            'transform': 'translate(122.5px, 55px) rotate(' + trans + 'deg)',
            'transform-origin': 'center bottom 0'
        }).removeClass("active");
        time.hour = value;
        console.log('Time Set (hour): ' + time.hour);
        $(".time_face .hours").removeClass("active");
        $(".time_face .minutes").addClass("active");
        $(".time_digits .hours").text(pad(time.hour)).removeClass("active");
        $(".time_digits .mins").text(pad(time.min)).addClass("active");
        $(".values .minute").addClass("active");
    });

    $('.values .am').click(function () {
        $('.values .am').addClass('select');
        $('.values .pm').removeClass('select');
        time.ampm = 'a';
    });
    $('.values .pm').click(function () {
        $('.values .pm').addClass('select');
        $('.values .am').removeClass('select');
        time.ampm = 'p';
    });
    $('.buttons .now').click(function () {
        Now(new Date());
    });
    $('.set').click(function () {
        Set(event, time);
    });






}
function pad(d) {
    var e = +d;
    return (e < 10) ? '0' + e.toString() : e.toString();

}