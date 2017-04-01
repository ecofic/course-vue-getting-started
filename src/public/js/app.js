window.onload = function() {
    var visits = 0;

    var visitsCookie = getCookieValue('visits');
    if (visitsCookie) {
        var converted = parseInt(visitsCookie);
        if (!isNaN(converted)) {
            visits = converted;
        }
    }

    showAppMessage(visits);
    setCookieValue('visits', (visits+1));
};

function getCookieValue(id) {
    var name = id + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    
    var kvps = decodedCookie.split(';');
    for(var i = 0; i <kvps.length; i++) {
        var v = kvps[i];
        while (v.charAt(0) == ' ') {
            v = v.substring(1);
        }

        if (v.indexOf(id) == 0) {
            var result = v.substring((id.length+1), v.length); 
            return result;
        }
    }
    return '';
}

function setCookieValue(id, v) {
    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));

    var expires = 'expires=' +  d.toUTCString();
    var cookieValue = id + "=" + v + ";" + expires + ";path=/";
    console.log('cookieValue: ' + cookieValue);
    document.cookie = cookieValue;
}

function showAppMessage(visits) {
    if (visits >= 5) {
        var result = visits % 4;
        if (result !== 0) {
            return;
        }

        var alertState = 'alert-info';
        var alertHeading = 'Well done!';
        var alertBody = '<p>some text</p>';

        var options = 4;
        var random = Math.floor((Math.random() * options) + 1);

        result = random % options;
        if (result === 0) {
            alertState = 'alert-info';  
            alertHeading = 'Enjoying this Content?';
            alertBody = "<p>Would you help me out and use the Facebook Like and Google Plus buttons on <a href=\"https://www.ecofic.com/courses/vue-getting-started/\" class=\"alert-link\" target=\"_blank\">the course page</a>? This will let me know that you're enjoying this course and encourage me to make more.</p>";
        } else if (result === 1) {
            alertState = 'alert-success';
            alertHeading = 'Share Your Thoughts About this Course!';
            alertBody = '<p>I would love to hear your thoughts about this course. Please feel free to share your opinions about this course with me on <a href="https://twitter.com/chadcampbell" class="alert-link" target="_blank">Twitter</p>';
        } else if (result === 2) {
            alertState = 'alert-danger';
            alertHeading = 'Want More Video Content?';
            alertBody = '<p>Be sure to check out:<ul><li><a href="https://www.ecofic.com/courses/" class="alert-link" target="_blank">My other courses</a></li><li><a href="https://www.youtube.com/c/ecofic" class="alert-link" target="_blank">My YouTube channel</a></li></ul></p>';            
        } else if (result === 3) {
            alertState = 'alert-warning';
            alertHeading = "Want to Know About New Content?";
            alertBody = '<p>Make sure to sign up for my <a href="https://www.ecofic.com/subscribe/" class="alert-link" target="_blank">newsletter</a>. By doing so, you\'ll be one of the first to learn about the latest, quality content.</p>';
        }

        if (alertBody) {
            var message = '<div class="alert ' + alertState + '" role="alert">';
            message += '<h3 class="alert-heading">' + alertHeading + '</h3>'; 
            message += alertBody;
            message += '</div>';

            var appMessage = document.getElementById('appMessage');
            if (appMessage) {
                appMessage.innerHTML = message;
            }
        }
    }
}