(() => {
  document.addEventListener('DOMContentLoaded', () => {

    const url = window.location;
    const position = url.search.lastIndexOf('=');
    const page = url.search.substr(position + 1, url.search.length - position); // -1 если нет search
    const fetchHref = `https://gorest.co.in/public-api/posts?page=${ page <= 1 ? 1 : page}`;
    const mainBody = document.body;
    const container = makeElement ('div', 'container', mainBody, '', 'container');
    const h1 = makeElement('h1', '', container, 'Лента публикаций', 'h1');

    // получение данных
    async function loadBlogItems() {
      const responsePosts = await fetch(fetchHref);
      const posts = await responsePosts.json();
      return posts;
    }

    // создание дом дерева
    loadBlogItems().then(posts => {
      for(let i = 0; i < posts.data.length; i++) {
        const a = new Date (posts.data[i].created_at);
        const post = makeElement('div', '', container, '', 'post');
        const userDescription = makeElement('div', '', post, '', 'user-desrciption');
        makeElement('span', '', userDescription, '🙂', 'avatar');
        makeElement('span', '', userDescription, `user${posts.data[i].user_id}`, 'user-id');
        // makeElement('span', '', userDescription, `Дата публикации: ${(a.getDate() < 10) ? `0${a.getDate()}`: a.getDate()}.${(a.getMonth()+1 < 10) ? `0${a.getMonth()+1}` : a.getMonth()+1}.${a.getFullYear()}, ${a.getHours() < 10 ? `0${a.getHours()}` : a.getHours() }:${a.getMinutes() < 10 ? `0${a.getMinutes()}`: a.getMinutes()}`, 'date-created');
        const titleLink = makeElement('a', '', post, '', 'link');
        const itemFetch = `https://gorest.co.in/public-api/posts?id=${posts.data[i].id}`;   
        titleLink.href = `post.html?id=${posts.data[i].id}`;
        makeElement('h2', '', titleLink, posts.data[i].title, 'h2');
        makeElement('p', '', post, posts.data[i].body, 'preview');
      }

      // навигация
      const totalPages = posts.meta.pagination.pages;
      const navlinks = makeElement('div', '', container, '', 'nav');

      prevLink = makeElement('a', '', navlinks, 'Previous 20', 'link');
      if (page <= 1) {
        prevLink.href = `index.html`;
        prevLink.textContent = '';
      } if (page == 2) prevLink.href = `index.html`;
      else prevLink.href = `index.html?page=${page - 1}`;

      nextLink = makeElement('a', '', navlinks, 'Next 20', 'link');
      if (page >= totalPages) {
        nextLink.href = `index.html?page=${totalPages}`;
        nextLink.textContent = '';
      } else nextLink.href = `index.html?page=${Number(page) == 0 ? Number(page) + 2 : Number(page) + 1}`;
    });

    // создание HTML элемента и его добавление куда-нибудь
    function makeElement (type, id = '', place = mainBody, text = '', cls = '') {
      const elem = document.createElement(type);
      elem.textContent = text;
      elem.id = id;
      if (cls) elem.classList.add(cls);
      place.append(elem);
      return elem;
    }

  });
})();
