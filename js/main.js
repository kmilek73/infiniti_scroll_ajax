let preloading = false;


showPreolader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'block';

}
hidePreolader = () => {
    let preloader = document.getElementById('preloader');
    preloader.style.display = 'none';

}

const getData = () => {

    if (!preloading) {
        preloading = true;

        fetch(' https://akademia108.pl/api/ajax/get-users.php')
            .then(res => res.json())
            .then(data => {
                let body = document.body;
                let hr = document.createElement('hr')
                body.appendChild(hr);
                for (let user of data) {
                    let pId = document.createElement('p');
                    let pName = document.createElement('p');
                    let pWebSite = document.createElement('p');

                    pId.innerText = `User ID :${user.id}`;
                    pName.innerText = `User Name :${user.name}`;
                    pWebSite.innerHTML = `User URL  :${user.website}</br> *************`;


                    body.appendChild(pId);
                    body.appendChild(pName);
                    body.appendChild(pWebSite);

                }
                preloading = false;
                hidePreolader();
            })

            .catch(error => { console.error(error) })
    }

}

const scrollToEndOfPage = () => {
    let d = document.documentElement;
    let scrollHeight = d.scrollHeight; // całkowita wysokość
    let scrollTop = d.scrollTop; //wysokośc od góry
    let clientHeight = d.clientHeight; //wysokość boksa scrolowanego wszystko w pikselach
    let sumScrollTopClientHeight = Math.ceil(scrollTop + clientHeight);
    if (sumScrollTopClientHeight >= scrollHeight) {
        showPreolader();
        getData();

    }


}

window.addEventListener('scroll', scrollToEndOfPage);