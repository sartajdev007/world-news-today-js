// menu script
const loadMenu = () => {
    url = 'https://openapi.programming-hero.com/api/news/categories';
    fetch(url)
        .then(res => res.json())
        .then(data => displayMenu(data.data.news_category))
}

const displayMenu = (categories) => {
    const menuContainer = document.getElementById('menu-container');
    for (const category of categories) {
        const id = category.category_id;
        const li = document.createElement('li');
        li.innerHTML = `<a id="category-btn" class="hover:bg-violet-700 hover:text-white" onclick="loadCategory(${id})">${category.category_name}</a>`
        menuContainer.appendChild(li);
    }
}


const loadCategory = (id) => {
    let categoryId = 1;
    if (id) {
        categoryId = id;
    }
    url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}


loadCategory()
loadMenu()


// display news script


const displayNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';
    if (allNews.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class="font-bold text-center text-3xl text-red-500">No news today</h2>       
        `
        newsContainer.appendChild(div)
        return;
    }

    for (let news of allNews) {
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
}

const loadDetails = id => {
    url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displaydetails(data.data))
}

const displaydetails = news => {
    console.log(news)
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
