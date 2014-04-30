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
    if (h1.length < 2 ||
        h1[1].textContent != "Paragraphs" ||
        (p.length === 0 ||
        p[0].textContent.length < 50))
    {
        return 'paragraph';
    }

    if (h1.length >= 3)
    {
        if ($(h1[2].nextElementSibling)[0].tagName.toLowerCase() == "a")
        {
            var a = $(h1[2].nextElementSibling);
        }
        else
        {
            var a = $(h1[2].nextElementSibling).find('a[href]');
        }
    }
    if (h1.length < 3 ||
        h1[2].textContent != "Links, Lists and Tables" ||
        a.length === 0 ||
        a[0].href.replace(/\W+/g, "") != "httpwwwhackbrightacademycom")
    {
        return 'links';
    }

    var td = a.parent().first().parent().parent();
    var tr = td.parent();
    var table = tr.parent();
    var ul = a.parent().parent();
    var ol = (a.parent().find('ol').length ? a.parent().find('ol') : table.find('ol'));
    if (a.parent()[0].nodeName.toLowerCase() != "li" ||
        ul[0].nodeName.toLowerCase() != "ul" ||
        ol.length === 0)
    {
        return 'lists';
    }

    if (td[0].tagName.toLowerCase() != "td" ||
        td.length === 0 ||
        tr.length === 0 ||
        table.length === 0)
    {
        return 'tables';
    }

    if (h1.length >= 4)
    {
        var form = $(h1[3].nextElementSibling);
        var inputs = form.find('input');
    }
    if (h1.length < 4 ||
        h1[3].textContent != "Forms" ||
        form.length === 0 ||
        form.attr('action') != "#" ||
        form.attr('method').toLowerCase() != 'post' ||
        inputs.length === 0 ||
        $(inputs[0]).attr('type') != "text" ||
        $(inputs[0]).attr('name') != 'name' ||
        $(inputs[0]).attr('id') != 'name')
    {
        return "forms";
    }

    var textarea = form.find('textarea');
    var select = form.find('select');
    var options = select.find('option');
    if ($(textarea[0]).attr('name') != "bio" ||
        $(textarea[0]).attr('id') != 'bio' ||
        $(select[0]).attr('name') != "month" ||
        $(select[0]).attr('id') != 'month' ||
        options.length !== 12)
    {
        return "forms2";
    }

    var radios = form.find('input[type="radio"]');
    var radiosLabelMale = form.find('label[for="male"]');
    var radiosLabelFemale = form.find('label[for="female"]');
    var checkbox = form.find('input[type="checkbox"]');
    var checkboxLabel = form.find('label[for="agree"]');
    if ($(radios[0]).attr('name') != "gender" ||
        $(radios[0]).attr('name') != $(radios[1]).attr('name') ||
        radios.length != 2 ||
        $(checkbox[0]).attr('name') != "agree" ||
        radiosLabelMale.length === 0 ||
        radiosLabelFemale.length === 0 ||
        checkboxLabel.length === 0)
    {
        return "forms3";
    }

    var submit = form.find('input[type="submit"]');
    if ($(submit[0]).attr('name') != "submit" ||
        $(submit[0]).attr('id') != "submit" ||
        $(submit[0]).attr('value') != "submit" ||
        $(submit[0]).attr('type') != "submit")
    {
        return "forms4";
    }

    return true;
}

function loadExercize(ex)
{
    console.log("Loading "+ex+".");
    $.ajax({
        url: "/exercise/lessons/"+ex+".html",
        context: document.body,
        cache: false
    }).done(function(msg) {
        $("#instruction").append(msg);
    });
}
