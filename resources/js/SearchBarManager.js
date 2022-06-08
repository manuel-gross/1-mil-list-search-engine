function addSearchInput(indexCount){
    let el = document.createElement("div");
    el.innerHTML = `<li>
    <input type="text" id="searchInput${indexCount}" class="searchControls" placeholder="Search ...">
    <select name="searchFor" id="searchFor${indexCount}">
        <option value="id">ID</option>
        <option value="content">Content</option>
        <option value="title">Title</option>
        <option value="media-type">Media Type</option>
        <option value="source">Source</option>
        <option value="published">Published</option>
    </select>`;
    $("#searchCondition").prepend(el);
}

export {addSearchInput};