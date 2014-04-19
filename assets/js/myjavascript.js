$(document).ready(function()
{
    createNav();

    showWeather();
});

function createNav()
{
    var navCont     = $("<div />").css({position:"fixed",margin:"10px"});
    var navList     = $("<ul />").css({"list-style":"none","padding":"0"});
    var navListItem = $("<li />").css({"list-style":"none",color:"#fff"});

     $('h1').each(function(i, node)
    {
        var self = $(this);
        sanitiezedText = node.textContent.replace(/\W+/g, "");
        navListItem.clone().html('<a href="#'+sanitiezedText+'">'+node.textContent+'</a>').hover(function()
        {
            self.addClass("highlight");
        },function()
        {
            self.removeClass("highlight");
        }).appendTo(navList);

        self.html('<a name="'+sanitiezedText+'">'+node.textContent+'</a>');
    });

    navList.appendTo(navCont);
    $("#nav_column").append(navCont);
}

function showWeather()
{
    var url = "http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA";
    $.ajax({
        url: url,
        dataType: "json"
    }).success(function(data)
    {
        console.log(data);
        var weatherCont = $("<div />").css({position:"fixed",bottom:"0","color":"#fff",margin:"10px"});
        var tempC = (data.main.temp - 273.15).toFixed(2)+"C";
        var tempF = ((data.main.temp * (9/5)) - 459.67).toFixed(2)+"F";
        weatherCont.html("Current SF Temp:<br />"+tempC+"<br />"+tempF);

        $("#nav_column").append(weatherCont);
    });
}
