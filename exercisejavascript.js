$(window).ready(function()
{
    var title = $(document).find("title").text();
    if (title == "" ||
        title != "My Manual")
    {
        $(document.body).text("Open this file (index.html) in a text editor and follow the instructions on lines 9-11.");
    }
    else if (title == "My Manual")
    {
        var heading = $( "<div id='heading'/>" );
        var headingContent = "<h1>My Manual</h1>";
        $(document.body).append(heading, headingContent);
    }
});
