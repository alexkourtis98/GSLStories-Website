async function getarticle() {
    const urlParams = new URLSearchParams(window.location.search);
    const slug = urlParams.get('slug');
    let params = "video/slug/" + slug;
    await getRequest(params);
}

async function getRequest(params) {
    try {
        const options = {
            headers: {
                'xapikey': localStorage.getItem('secret')
            }
        }
        const response = await fetch('https://gslstoriesbackendpython.onrender.com/' + params, options);
        const data = await response.json();

        document.title = data.title;
        document.getElementById("videohere").innerHTML = "<video controlsList=\"nodownload muted noremoteplayback\" onload='this.play()' muted  style='object-fit: cover; width: 100%; height: 100%' controls Autoplay=autoplay>\n" +
            "  <source src=" + data.url + " type='video/mp4'>\n" +
            "</video>";
        document.getElementById("titlehere").innerText = data.title;
        document.getElementById("content").innerText = data.transcript;
    } catch (error) {
        console.log(error);
    }
}

async function init() {
    await getarticle();
}

init();
