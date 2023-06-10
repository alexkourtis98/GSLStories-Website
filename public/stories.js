async function getarticles() {
    let params = "publicvideos";
    await getRequest(params);
}

const state = [];

async function getRequest(params) {
    try {
        const options = {
            headers: {
                'xapikey': localStorage.getItem('secret')
            }
        }
        const response = await fetch('https://gslstoriesbackendpython.onrender.com/' + params, options);
        const data = await response.json();
        state.videos = [];

        await data.data[0].forEach(video => {
            if (video) {
                state.videos.push(video);
            }
        });

        await addtothml(state.videos);
    } catch (error) {
        console.log(error);
    }
}

async function addtothml(payload) {
    await payload.forEach(video => {
        document.getElementsByClassName("cards")[0].innerHTML += "<a href='video.html?slug=" + video.slug + "'" +
            " <li class=\"cards_item\"  >\n" +
            "                            <div class=\"card\" style='height: 450px !important;'>\n" +
            "                                <div >" +
            "<img style='width: 100%; height: 300px; object-fit: cover; min-height: 300px;' src=" + video.imageuri + " alt=''></div>\n" +
            "                                <div style='width: auto; height: 100%; text-align: left !important; display: grid; justify-content: stretch'>\n" +
            "                                    <h3 style='text-decoration: none !important; margin: 5px; word-break: break-word; text-align: left !important;'>" + video.title + "</h3>" +
            "                                    <p style='text-decoration: none !important; margin: 5px; word-break: break-word; text-align: left !important;'>" + video.desc + "</p>" +
            "                                    <button class=\"btn card_btn\">Δείτε το</button>\n" +
            "                                </div>\n" +
            "                            </div>\n" +
            "                        </li></a>";
    })
}

async function init() {
    showLoading();
    await getarticles();
    hideLoading();
}

init();

function showLoading() {
    document.getElementById("myspinner").style.display = "block";
}

function hideLoading() {
    document.getElementById("myspinner").style.display = "none";
}


function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}
