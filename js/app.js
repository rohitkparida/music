// (function localFileVideoPlayer() {
//     'use strict'
//     var URL = window.URL || window.webkitURL
//     var displayMessage = function(message, isError) {
//         var element = document.querySelector('#message')
//         element.innerHTML = message
//         element.className = isError ? 'error' : 'info'
//     }
//     var playSelectedFile = function(event) {
//         var file = this.files[0]
//         var type = file.type
//         var videoNode = document.querySelector('audio')
//         var canPlay = videoNode.canPlayType(type)
//         if (canPlay === '') canPlay = 'no'
//         var message = 'Can play type "' + type + '": ' + canPlay
//         var isError = canPlay === 'no'
//         displayMessage(message, isError)
//
//         if (isError) {
//             return
//         }
//
//         var fileURL = URL.createObjectURL(file)
//         videoNode.src = fileURL
//         a.src = fileURL
//     }
//     var inputNode = document.querySelector('.receiver')
//     inputNode.addEventListener('change', playSelectedFile, false)
// })()



var $audio = $('#element');
$('.receiver').on('change', function(e) {
    var target = e.currentTarget;
    var file = target.files[0];
    var reader = new FileReader();

    console.log($audio[0]);
    if (target.files && file) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $audio.attr('src', e.target.result);
            $audio.play();
        }
        reader.readAsDataURL(file);
    }
});




$(document).ready(function() {
    init();

    function init() {
        var current = 0;
        var audio = $('#element');
        var playlist = $('#playlist');
        var tracks = playlist.find('li a');
        var len = tracks.length - 1;
        audio[0].volume = .10;
        audio[0].play();
        playlist.on('click', 'a', function(e) {
            e.preventDefault();
            link = $(this);
            current = link.parent().index();
            run(link, audio[0]);
        });
        audio[0].addEventListener('ended', function(e) {
            current++;
            if (current == len) {
                current = 0;
                link = playlist.find('a')[0];
            } else {
                link = playlist.find('a')[current];
            }
            run($(link), audio[0]);
        });
    }

    function run(link, player) {
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        player.load();
        player.play();
    }
});







// Disable_sendBtn-----------------------------
function success() {
    if (document.getElementById("newURL").value === "") {
        document.getElementById('send').disabled = true;
    } else {
        document.getElementById('send').disabled = false;
    }
}

// ___________DEFAULT_VOLUME
// $("video").prop("volume", 0.6);


//URL______________________________
function changeURL() {
    var newURL = document.getElementById("newURL").value;
    document.getElementById("element").src = newURL;
}


// Registering ServiceWorker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').then(function(registration) {
        // Registration was successful
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }).catch(function(err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

$(".send").click(function() {
    var newURL = document.getElementById("newURL").value;
    var filename = newURL.replace(/^.*[\\\/]/, '')
    $("ul").append("<li><a href='" + fileURL + "'>" + filename + "</a></li>");
});



var myAudio = document.getElementById("element");

function togglePlay() {
    return myAudio.paused ? myAudio.play() : myAudio.pause();
};

$(document).ready(function() {
    var play = $('.play');
    var playic = $('.playic');
    var pauseic = $('.pauseic');
    play.click(function() {
        playic.toggleClass('hidden');
        pauseic.toggleClass('hidden');
        return false;
    });
});
//
// $(document).ready(function() {
//     $('input[type="file"]').change(function() {
//         $("img").clone().appendTo(".video-container");
//     });
// });

var vid = document.getElementById("element");
vid.ontimeupdate = function() {
    var percentage = (vid.currentTime / vid.duration) * 100;
    $("#custom-seekbar #progress").css("width", percentage + "%");
};

$("#custom-seekbar").on("click", function(e) {
    var offset = $(this).offset();
    var left = (e.pageX - offset.left);
    var totalWidth = $("#custom-seekbar").width();
    var percentage = (left / totalWidth);
    var vidTime = vid.duration * percentage;
    vid.currentTime = vidTime;
}); //click()









/**
 * Loading the tags using XHR.
 */
//sample.mp3 sits on your domain
ID3.loadTags("sample.mp3", function() {
    showTags("sample.mp3");
}, {
    tags: ["title", "artist", "album", "picture"]
});

/**
 * Loading the tags using the FileAPI.
 */
function loadFile(input) {
    var file = input.files[0],
        url = file.urn || file.name;

    ID3.loadTags(url, function() {
        showTags(url);
    }, {
        tags: ["title", "artist", "album", "picture"],
        dataReader: ID3.FileAPIReader(file)
    });
}

/**
 * Generic function to get the tags after they have been loaded.
 */
function showTags(url) {
    var tags = ID3.getAllTags(url);
    console.log(tags);
    document.getElementById('title').textContent = tags.title || "";
    document.getElementById('artist').textContent = tags.artist || "";
    document.getElementById('album').textContent = tags.album || "";
    var image = tags.picture;
    if (image) {
        var base64String = "";
        for (var i = 0; i < image.data.length; i++) {
            base64String += String.fromCharCode(image.data[i]);
        }
        var base64 = "data:" + image.format + ";base64," +
            window.btoa(base64String);
        document.getElementById('picture').setAttribute('src', base64);
        document.getElementById('picturebg').setAttribute('src', base64);
    } else {
        document.getElementById('picture').style.display = "none";
    }
}