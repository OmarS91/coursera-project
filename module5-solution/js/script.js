$(function () {
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });

  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowHomeHTML,
    true
  );
});

(function (global) {
  var dc = {};
  var homeHtmlUrl = "snippets/home-snippet.html";
  var allCategoriesUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/categories.json";
  var categoriesTitleHtml = "snippets/categories-title-snippet.html";
  var categoryHtml = "snippets/category-snippet.html";
  var menuItemsUrl = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/";
  var menuItemsTitleHtml = "snippets/menu-items-title.html";
  var menuItemHtml = "snippets/menu-item.html";

  document.addEventListener("DOMContentLoaded", function (event) {
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(
      homeHtmlUrl,
      function (homeHtml) {
        var chosenCategory = chooseRandomCategory(categories);
        var homeHtmlToInsertIntoMainPage = insertProperty(homeHtml, "randomCategoryShortName", chosenCategory.short_name);
        insertHtml("#main-content", homeHtmlToInsertIntoMainPage);
        $dc.loadMenuItems(chosenCategory.short_name);
      },
      false
    );
  });

  function chooseRandomCategory(categories) {
    var randomArrayIndex = Math.floor(Math.random() * categories.length);
    return categories[randomArrayIndex];
  }

  global.$dc = dc;
})(window);
