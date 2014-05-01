/**
 * This only gets run after jQuery has determined that the entire document has
 * been loaded.
 */
$(document).ready(function ()
{
    // Run the navigation creator function
    //createNav();

    // Run the show weather function
    //showWeather();
});

/**
 * The createNav() function takes all the "H1" HTML tags from index.html and
 * creates navigation links to be placed into the left-side navigation bar.
 * @return null
 */
function createNav()
{
    // Setting up the navigation container.
    var navCont     = $("<div />").css({position:"fixed",margin:"10px"});

    // Setting up the navigation list.
    var navList     = $("<ul />").css({"list-style":"none","padding":"0"});

    // Setting up the navigation list item node.
    var navListItem = $("<li />").css({"list-style":"none",color:"#fff"});

    // Finding all of the H1 tags in the content_column DOM node.
    $('#content_column h1').each(function(i, node)
    {
        // Setting self to $(this) for use later in callbacks.
        var self = $(this);

        // Sanitizing H1 text to remove all non-alpha-numeric characters.
        sanitiezedText = node.textContent.replace(/\W+/g, "");

        // Cloning list item node and appending, with hover handlers, to list.
        navListItem.clone().html('<a href="#'+sanitiezedText+'">'+node.textContent+'</a>').hover(function()
        {
            // Adding highlist class when being hovered on.
            self.addClass("highlight");
        },function()
        {
            // Removing highlist class when being hovered off.
            self.removeClass("highlight");
        }).appendTo(navList);

        // Adding anchors to H1 tags.
        self.html('<a name="'+sanitiezedText+'">'+node.textContent+'</a>');
    });

    // Append the nav list to the navigation container.
    navList.appendTo(navCont);

    // Append the navigation container to the nav column.
    $("#nav_column").append(navCont);
}

/**
 * The showWeather() function demonstrates:
 * 1) Building onto the DOM via jQuery
 * 2) Adding inline CSS to created DOM nodes
 * 3) Preforming AJAX calls (to get weather data)
 * 4) Callbacks via AJAX and $.fadeIn/Out
 * @return null
 */
function showWeather()
{
    // Creating the weather container DOM node and adding some CSS.
    var weatherCont = $("<div />").attr({"id":"weatherCont"}).css({
        position: "fixed",
        bottom: "0",
        "color": "#fff",
        margin: "10px"
    });
    // Putting a the loader gif in place while the AJAX runs.
    weatherCont.html('<img src="/assets/images/loader.gif" class="loader" />');
    // Adding the weather container to the DOM (navigation column).
    $("#nav_column").append(weatherCont);

    // Setting up the AJAX call.
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=San%20Francisco,%20CA",
        // Specifying the JSON data type.
        dataType: "json"
    }).success(function(data) {
        // The temp data coming from the API call is in Kelvin.
        // Convert from K to C (T(C) = K - 273.15), round to 2 decimal places.
        var tempC = (data.main.temp - 273.15).toFixed(2) + "C";

        // Convert from K to F (T(F) = (K * (9/5)) - 459.67).
        var tempF = ((data.main.temp * (9 / 5)) - 459.67).toFixed(2) + "F";

        // Fading out the weather container to remove the loading gif.
        weatherCont.fadeOut('fast',function() {
            // Set content of the weather container to weather data.
            weatherCont.html("Current SF Temp:<br />"+tempC+"<br />"+tempF);

            // Create refresh button node and add handler.
            var rButton = $('<input />').attr({"type":"button", "value":"Refresh"}).css({"color":"#000"}).click(function()
                {
                    // Fade out the current weather container
                    weatherCont.fadeOut('fast',function()
                    {
                        // Remove the weather container from the DOM.
                        $(this).remove();

                        // Call showWeather() to start this whole thing over.
                        showWeather();
                    });
                });

            // Append refresh button to weather container
            weatherCont.append('<br />',rButton);

            // Fade in the weather container.
            $(this).fadeIn();
        });
    });
}
