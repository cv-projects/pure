const $ = document;
const categoriesList = $.getElementById("categoriesList");
const productscontainer = $.getElementById("productscontainer");
const sidebarSearch = $.querySelector(".sidebar--search");
const searchList = $.querySelector(".search--list");
const searchInputElm = $.querySelector(".sidebar--input");

const productCategoriesItems = productCategories.map((cat) => {
  return generateProductCategory(cat);
});

const productItems = products.map((product) => {
  return generateCard(product);
});

function generateCard(product) {
  return `
    <div class="col col-product mb-4">
    <div class="card h-100">
        <div class="card-img">
            <img src="${product.image}" alt="${product.title}" class="img-thumbnail"/>
        </div>
        <div class="card-body">

            <strong class="card-title">
                <a href="" class="card-link">
                ${product.title}
                </a>
            </strong>
        </div>
        <div class="card-footer">
            <button class="addToCart">
                add to cart
            </button>
        </div>

    </div>
</div>
    `;
}

function generateProductCategory(category) {
  return `<li class="category--item"> ${category.name}</li>`;
}

categoriesList.innerHTML = productCategoriesItems.join("");
productscontainer.innerHTML = productItems.join("");

// ---- searching

searchInputElm.addEventListener("keyup", function () {
  let searchValue = searchInputElm.value;

  if (searchValue) {
    sidebarSearch.classList.add("active");
    const filteredProducts = products.filter((product) => {
      return product.title.toLowerCase().includes(searchValue.toLowerCase());
    });

    // console.log(filteredProducts);

    searchList.innerHTML = generateSearchList(filteredProducts, searchValue);
    selectInputItem();
  } else {
    sidebarSearch.classList.remove("active");
  }
});

function generateSearchList(filterProducts, inputValue) {
  let searchList;

  //console.log("filterProducts ", filterProducts);

  searchList = filterProducts.map((prod) => {
    return `<li class="search--item">${prod.title}</li>`;
  });

  let resultList;
  if (!searchList.length) {
    resultList = `<li class="search--item">${inputValue}</li>`;
  } else {
    resultList = searchList;
  }

  return resultList.join("");
}

function selectInputItem() {
  let allListItem = searchList.querySelectorAll("li");
  allListItem.forEach(function (item) {
    item.addEventListener("click", function (event) {
      searchInputElm.value = event.target.textContent;
      sidebarSearch.classList.remove("active");
      searchList.innerHTML = "";
    });
  });
}
