$(document).ready(function()
{
    //jQuery.fn.exists = function(){return this.length>0;}

    $.get("exercise/assets/css/exercisestyle.css", function(css)
    {
       $('<style type="text/css"></style>')
          .html(css)
          .appendTo("head");
    });

    var title = $(document).find("title").text();
    if (title == "" ||
        title != "My Manual")
    {
        $(document.body).text("Open this file (index.html) in a text editor and follow the instructions on lines 9-11.");
    }
    else if (title == "My Manual")
    {
        // Load lesson and check for lesson number
        $.ajax({
            url: "/exercise/header.html",
            context: document.body
        }).done(function(msg) {
            $(document.body).prepend(msg);
            checkLessonProgression();
        });
    }

    $(document).on("click", ".fadeOut", function(e)
    {
        e.preventDefault();
        $(this).parent().fadeOut(1000);
    });
});

function checkLessonProgression()
{
    var lcheck = lessoncheck();
    if (lcheck !== true)
    {
        loadExercize(lcheck);
    }
    else
    {
        loadExercize("headersdone");
    }
}

function lessoncheck()
{
    var h1 = $('h1');
    //check if the item exists.
    if (h1.length === 0 ||
        h1[0].textContent != "My First Header")
    {
        return 'headers';
    }
    var p = $('p');
    if (h1[1].textContent != "Paragraphs" ||
        (p.length === 0 ||
        p[0].textContent.length < 50))
    {
        return 'paragraph';
    }

    var a = $('a[href]');
    if (h1[2].textContent != "Links, Lists and Tables" ||
        a.length === 0 ||
        a[0].href.replace(/\W+/g, "") != "httpwwwhackbrightacademycom")
    {
        return 'links';
    }

    if (a.parent()+"".toLowerCase() != "li")
    {
        return 'lists';
    }

    return true;
}

function loadExercize(ex)
{
    console.log("Loading "+ex+".");
    $.ajax({
       url: "/exercise/lessons/"+ex+".html",
        context: document.body
    }).done(function(msg) {
        $("#instruction").append(msg);
    });
}
