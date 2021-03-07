var pullCraigslistApi = function() {
    var apiUrl = 'http://www.ksl.com/classifieds/api.php?cmd=ad&id=23027643';
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                console.log(data.type);
            })
        }
        
    })
}

pullCraigslistApi();