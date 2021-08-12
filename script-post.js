(() => {
  document.addEventListener('DOMContentLoaded', () => {

    const url = window.location;
    const position = url.search.lastIndexOf('=');
    const id = url.search.substr(position + 1, url.search.length - position); // -1 если нет search

    const mainBody = document.body;
    const container = makeElement ('div', 'container', mainBody, '', 'container');
    const back = makeElement('a', '', container, '← Назад', 'link');
    const post = makeElement('div', '', container, '', 'post');
    const comments = makeElement('div', '', container, '', 'comments');

    // кнопка назад
    back.addEventListener('click', (e) => {
      window.history.back();
    })

    // получение статьи
    async function loadArticle(id) {
      const responseArticle = await fetch(`https://gorest.co.in/public-api/posts?id=${id}`);
      const dataArticle = await responseArticle.json();
      return dataArticle;
    }

    // получение комментариев
    async function loadComments(id) {
        const responseComments = await fetch(`https://gorest.co.in/public-api/comments?post_id=${id}`);
        const dataComments = await responseComments.json();
        return dataComments;
      }

    // создание дом: добавление  комментариев в дерево
    loadComments(id).then(comment => {
      for(let i = 0; i < comment.data.length; i++) {
        makeElement('div', '', comments, commentAva(), 'comment-ava');
        const commentText = makeElement('div', '', comments, '', 'comment-text');
        const userDescription = makeElement('div', '', commentText, '', 'user-desrciption');
        makeElement('span', '', userDescription, comment.data[i].name, 'user-id');
        const a = new Date (comment.data[i].created_at);
        makeElement('div', '', commentText, comment.data[i].email, 'comments-email');
        makeElement('p', '', commentText, comment.data[i].body, 'preview');
        // makeElement('span', '', userDescription, `Дата публикации: ${(a.getDate() < 10) ? `0${a.getDate()}`: a.getDate()}.${(a.getMonth()+1 < 10) ? `0${a.getMonth()+1}` : a.getMonth()+1}.${a.getFullYear()}, ${a.getHours() < 10 ? `0${a.getHours()}` : a.getHours() }:${a.getMinutes() < 10 ? `0${a.getMinutes()}`: a.getMinutes()}`, 'date-created');
      }
    });


    // создание дом дерева - запись
    loadArticle(id).then(article => {
      document.title = article.data[0].title;
      makeElement('h1', '', post, article.data[0].title, 'h1');
      const a = new Date (article.data[0].created_at);
      const userDescription = makeElement('div', '', post, '', 'user-desrciption');
      makeElement('span', '', userDescription, '🙂', 'avatar');
      makeElement('span', '', userDescription, `user${article.data[0].user_id}`, 'user-id');
      // makeElement('span', '', userDescription, `Дата публикации: ${(a.getDate() < 10) ? `0${a.getDate()}`: a.getDate()}.${(a.getMonth()+1 < 10) ? `0${a.getMonth()+1}` : a.getMonth()+1}.${a.getFullYear()}, ${a.getHours() < 10 ? `0${a.getHours()}` : a.getHours() }:${a.getMinutes() < 10 ? `0${a.getMinutes()}`: a.getMinutes()}`, 'date-created');
      makeElement('p', '', post, article.data[0].body, 'preview');
    });


    function commentAva() {
      const avatars = [
        '😀', '😁', '😂', '😃', '😄', '🤣', '😅', '😆', '😇', '😉',
        '😊', '🙂', '🙃', '😋', '😌', '😍', '🥰', '😘', '😗', '😙',
        '😚', '🤪', '😜', '😝', '😛', '🤑', '😎', '🤓', '🧐', '🤠',
        '🥳', '🤗', '🤡', '😏', '😶', '😐', '😒', '🙄', '🤨', '😠',
        '😡', '🤬', '😱', '😤', '🥶', '🤩', '😵', '🤯', '😲', '🥴'
      ];
      return avatars[Math.trunc(Math.random()*50)];
    }

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
