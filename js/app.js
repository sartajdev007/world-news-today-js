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
        const li = document.createElement('li');
        li.innerHTML = `<a>${category.category_name}</a>`
        menuContainer.appendChild(li);
    }
}

loadMenu()


// display news script

const loadNews = () => {
    url = 'https://openapi.programming-hero.com/api/news/category/01';
    fetch(url)
        .then(res => res.json())
        .then(data => displayNews(data.data))
}

const displayNews = allNews => {
    const newsContainer = document.getElementById('news-container');
    for (let news of allNews) {
        console.log(news)
        const div = document.createElement('div');
        div.classList.add('card');
        div.classList.add('card-side');
        div.classList.add('bg-base-100');
        div.classList.add('shadow-xl');
        div.innerHTML = `
            <figure ><img class="w-max p-5" src="${news.thumbnail_url}" alt=""></figure>
            <div class="card-body w-50">
                <h2 class="card-title">${news.title}</h2>
                <p>${news.details}</p>
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
                    <div class="card-actions justify-end">
                        <button class="pt-5"><i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>
            </div>
        `
        newsContainer.appendChild(div);
    }
}

loadNews()