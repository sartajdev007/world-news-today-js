// menu script
const loadMenu = () => {
    url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayMenu(data.data.news_category))
    // .catch(error => console.log(error));
}
const toggleLoader = isLoading => {
    const loader = document.getElementById('spinner');
    if (isLoading) {
        loader.classList.remove('hidden');
    }
    else {
        loader.classList.add('hidden');
    }
}

let newestId = "01";
const addActiveClass = (id) => {
    if (newestId) {
        const loader = document.getElementById(newestId);
        loader.classList.remove("text-blue-500");
    }
    const uid = "0" + id;
    const loader = document.getElementById(uid);
    loader.classList.add("text-blue-500");
    newestId = uid;
};

const displayMenu = (categories) => {
    const menuContainer = document.getElementById("menu-container");
    for (const category of categories) {
        const id = category.category_id;
        const li = document.createElement("li");
        li.innerHTML = `<a id=${id} class="hover:bg-blue-700 hover:text-white" onclick="loadCategory(${id}); addActiveClass(${id})">${category.category_name}</a>`;
        menuContainer.appendChild(li);
    }
    document.getElementById("01").classList.add("text-blue-500");
};


const loadCategory = (id) => {
    toggleLoader(true);
    let categoryId = 1;
    if (id) {
        categoryId = id;
    }
    url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
    // .catch(error => console.log(error));
}


loadCategory()
loadMenu()


// display news script


const displayNews = (allNews = []) => {
    // sorting from largest view
    const sortedNews = allNews?.sort((a, b) =>
        a.total_view < b.total_view ? 1 : -1
    );

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    if (allNews?.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class="font-bold text-center text-3xl text-red-500">No news today</h2>       
        `
        newsContainer.appendChild(div);
        const numberPosts = document.getElementById('numberPosts');
        numberPosts.innerHTML = `
        <h2 class="text-lg font-bold">${allNews?.length} posts in this section</h2>
        `;
    }
    else {
        const numberPosts = document.getElementById('numberPosts');
        numberPosts.innerHTML = `
        <h2 class="text-lg font-bold">${allNews?.length} posts in this section</h2>
        `;
    }
    for (let news of sortedNews) {
        // console.log(news)
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('lg:card-side');
        div.classList.add('card-side');
        div.classList.add('bg-base-100');
        div.classList.add('shadow-xl');
        div.innerHTML = `
            <figure ><img class="w-max p-5" src="${news.thumbnail_url}" alt=""></figure>
            <div class="card-body w-50">
                <h2 class="card-title">${news.title}</h2>
                <p>${news.details.length > 200 ? news.details.slice(0, 200) + '...' : news.details}</p>
                <div class="grid grid-cols-3 gap-4 justify-items-center align-items-center">
                    <div class="grid grid-cols-2 gap-1">
                        <div>
                        <img class="w-1/2 rounded-lg" src="${news.author.img ? news.author.img : 'No Image'}">
                        </div>
                        <div>
                        <p>${news.author.name}</p>
                        <p>${news.author.published_date}</p>
                        </div>
                    </div>
                    <div class="p-6 pl-8"><i class="fa-solid fa-eye"></i><span class="pl-2">${news.total_view}</span></div>
                    <div>
                    <a href="#my-modal-2" class="btn" onclick="loadDetails('${news._id}')"><i class="fa-solid fa-arrow-right"></i></a>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(div);
    }
    toggleLoader(false);
}

// dynamic data for modals
const loadDetails = id => {
    url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaydetails(data.data))
    // .catch(error => console.log(error));
}

const displaydetails = news => {
    const modalBody = document.getElementById('modalBody');
    for (let details of news) {
        modalBody.innerHTML = `
        <h3 class="font-bold text-lg">${details.title}</h3>
        <p class="py-4">${details.details}</p>
        <img src="${details.image_url ? details.image_url : 'No Image'}">
    `
    }
}



displayNews()
