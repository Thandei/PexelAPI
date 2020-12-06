document.querySelector(".search-click").addEventListener("click", function() {

    var keyword_array = [
        "Mountains",
        "house",
        "Cat",
        "coffee",
        "Laptop"
    ]


    var inputValue = document.querySelector(".keyword-search").value;

    var formdataObject = {
        "keys": {
            "key1": "keyword",
            "key2": "per_page"
        },
        "values": {
            "value1": inputValue,
            "value2": "2" // you can also make here dynamic
        }
    }

    var formdata = new FormData();
    formdata.append(formdataObject.keys.key1, formdataObject.values.value1);
    formdata.append("per_page", "2");

    postData("https://test.slideo.co.il/api/call/Pexels/find_images", formdata)



    document.querySelector("#keywords_container").innerHTML += `<div class="search-keyword" data-keyword=${inputValue}>
    <span class="keyword-text text-dark">${inputValue}</span>&emsp;
    <span class="text-dark keyword-dismiss m-auto"><i class="fas fa-times"></i></span>
    </div>`




});


$(".keywords-list").on("click", "span.keyword-dismiss", function() {
    var data_keyword = this.parentElement.getAttribute("data-keyword")


    var images = document.querySelectorAll(`[data-keyword= ${data_keyword}]`)

    for (var i = 0; i < images.length; i++) {
        images[i].parentNode.removeChild(images[i])
    }
});


async function postData(url = "", data) {

    const response = await fetch(url, {
            method: "POST",
            body: data,
            headers: new Headers(),
            redirect: "follow"
        })
        .then(response => response.json())
        .then(data => {

            console.log(data);
            for (var i = 0; i < parseInt(data.request.per_page); i++) {
                let htmlString = `
                <img id="img-requested" class="image-item w-50" src="${data[i].url}" data-keyword=${data.request.keyword} >`;

                let imageElement = html_to_element(htmlString);

                document.querySelector("#images_container").appendChild(imageElement);

            }

        })
        .catch((error) => {
            console.error("Error", error);
        });

};



function html_to_element(html_string) {
    let template = document.createElement('template');
    template.innerHTML = html_string.trim();
    return template.content.firstChild;
}