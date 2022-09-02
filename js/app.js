const loadMenu = () => {
    url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayMenu(data.data.news_category))
}

const displayMenu = (categories) => {
    const menuContainer = document.getElementById('menu-container');
    for (const category of categories) {
        console.log(category);
        const li = document.createElement('li');
        li.innerHTML = `<a>${category.category_name}</a>`
        menuContainer.appendChild(li);
    }
}

loadMenu()