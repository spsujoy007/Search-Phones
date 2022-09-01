
const getFunction = (phone, dataLimit) => {
    fetch(`https://openapi.programming-hero.com/api/phones?search=${phone}`)
        .then(Response => Response.json())
        .then(data => showPhones(data.data, dataLimit))
}

const showPhones = (phones, dataLimit) => {


    console.log(phones);
    const phoneField = document.getElementById('phone-container');
    phoneField.innerHTML = '';
    const showAllButton = document.getElementById('showall-btn');
    if (dataLimit && phones.length > 10) {
        phones = phones.slice(0, 9);
        showAllButton.classList.remove('d-none')
    }
    else {
        showAllButton.classList.add('d-none')
    }

    const noPhone = document.getElementById('no-phone-found');
    const footer = document.getElementById('footer');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
        footer.classList.add('d-none');
        // isFooter(false);
        showOrHide(false);
    }
    else {
        // isFooter(true);
        noPhone.classList.add('d-none');
        footer.classList.remove('d-none');
    }

    for (const phone of phones) {
        const newPost = document.createElement('div');
        newPost.classList.add('col');

        newPost.innerHTML = `
        <div class="card shadow border-0 rounded-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">${phone.phone_name}</h4>
            <h6>Brand: ${phone.brand}</h6>
            <p>Slug: ${phone.slug.slice(0, 26)}</p>
            </div>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Buy</button>
            </div>
            <!-- Button trigger modal -->

            <!-- Modal -->
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">${phone.phone_name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <!--Images-->
            <div class="d-flex justify-content-center mb-5">
                <img src="${phone.image}" class="w-50">
            </div>

            <!--Phone detail-->
            <h4 class="mt-4">Brand: ${phone.brand}</h4>
            <p class="mt-4">Slug: ${phone.slug}</p>
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Buy now</button>
        </div>
        </div>
        </div>
    </div>
            `
        phoneField.appendChild(newPost)

        showOrHide(false);
    }
}
// product limit
const proccesSearch = (dataLimit) => {
    showOrHide(true);
    const searhField = document.getElementById('search-field');
    const searchText = searhField.value;
    getFunction(searchText, dataLimit)
}

document.getElementById('search-btn').addEventListener('click', function () {
    proccesSearch(10);

})

const showOrHide = showOrHide => {
    const loading = document.getElementById('loading-section');
    if (showOrHide === true) {
        loading.classList.remove('d-none')
    }
    else {
        loading.classList.add('d-none')
    }
}


document.getElementById('button-showAll').addEventListener('click', function () {
    proccesSearch();
})




// getFunction('iphone')