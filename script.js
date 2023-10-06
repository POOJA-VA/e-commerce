let intialproducts = [
  {
    id: 1,
    title: "American-Eskimo",
    description: "Lives in island",
    price: 5999,
    thumbnail:
      "https://images.unsplash.com/photo-1611003228941-98852ba62227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFieSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80",
  },

  {
    id: 2,
    title: "Basset-Hound",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },

  {
    id: 3,
    title: "German Shephead",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },

  {
    id: 4,
    title: "Huskey",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },

  {
    id: 5,
    title: "Labrador",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },

  {
    id: 6,
    title: "Shih Tuz",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },

  {
    id: 7,
    title: "Papillon",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },

  {
    id: 8,
    title: "Chow Chow",
    description: "Long ears like beagle",
    price: 6500,
    thumbnail:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/07200501/Basset-Hound-standing-in-the-garden.jpg",
  },
];

let customers = [
  { id: 1, email: "pooja@admin.com", password: "hello" },
  { id: 2, email: "poojav@1230.com", password: "hello@123" },
  { id: 3, email: "revathipie@1224.com", password: "gaint" },
];

window.addEventListener("load", () => {
  // loading products
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }

  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(initialUsers));
  }

  if (location.pathname === "/admin/admin.html") {
    loadAdminHomePage();
  }

  if (location.pathname === "/index.html") {
    loadHomePage();
  }

  if (location.pathname === "/cart.html") {
    loadCartPage();
  }

  console.log(location.path);

  if (location.pathname === "/orders.html") {
    orderPage();
  }

  if (location.pathname === "/admin/order.html") {
    loadAdminOrderPage();
  }

  if (
    location.pathname === "/index.html" ||
    location.pathname === "/orders.html" ||
    location.pathname === "/cart.html"
  ) {
    updateCartCount();
  }

  console.log(location.pathname);

  if (location.pathname === "/admin/add_product.html") {
    let params = new URL(document.location).searchParams;
    let productId = params.get("id");
    if (productId) {
      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(
        (product) => product.id === parseInt(productId)
      );
      populateProduct(product);
    }
  }
});

// random number
const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const signInHandler = () => {
  const emailRef = document.getElementById("email");
  const passwordRef = document.getElementById("password");
  const errorRef = document.getElementById("errorSignin");

  if (emailRef.value.length > 0 && passwordRef.value.length > 0) {
    let users = JSON.parse(localStorage.getItem("users"));
    const loggedInUser = users.find(
      (user) =>
        user.email === emailRef.value && user.password === passwordRef.value
    );

    if (!loggedInUser) {
      errorRef.innerText = "Invalid Credentials";
    } else {
      sessionStorage.setItem("userId", loggedInUser.id);
      if (emailRef.value === "pooja@admin.com")
        location.replace("admin/admin.html");
      else location.replace("index.html");
    }
  } else {
    errorRef.innerText = "Email or password is empty";
  }
};

// sign Up
const signUpHandler = () => {
  const nameRef = document.getElementById("regname");
  const emailRef = document.getElementById("regemail");
  const passwordRef = document.getElementById("regpassword");
  const confirmPasswordRef = document.getElementById("confirmPassword");
  const errorRef = document.getElementById("error");

  if (
    emailRef.value.length > 0 &&
    passwordRef.value.length > 0 &&
    nameRef.value.length > 0 &&
    confirmPasswordRef.value.length > 0
  ) {
    if (passwordRef.value === confirmPasswordRef.value) {
      let users = JSON.parse(localStorage.getItem("users"));

      users.push({
        id: getRandomId(),
        email: emailRef.value,
        password: passwordRef.value,
      });

      localStorage.setItem("users", JSON.stringify(users));
      location.href = "/signin.html";
    } else {
      errorRef.innerText = "Password mismatch!!!";
    }
  } else {
    errorRef.innerText = "Fields are empty";
  }
};

// user singout handler
const adminSignOutHandler = () => {
  location.replace("../../signin.html");
};
const userSignOutHandler = () => {
  location.replace("signin.html");
};

// save or update products
const saveOrUpdateHandler = () => {
  const nameRef = document.getElementById("name");
  const idRef = document.getElementById("id");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("desc");
  const imageRef = document.getElementById("image");
  const toastRef = document.getElementById("toast");
  const toastMessageRef = document.getElementById("toastMessage");

  let products = JSON.parse(localStorage.getItem("products"));

  let id = idRef.value;
  if (id) {
    const product = products.find((product) => product.id === parseInt(id));

    products = products.filter((product) => product.id !== parseInt(id));
    products.push({
      ...product,
      title: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    });

    toastMessageRef.innerText = "Product added updatedfully!!!";
  } else {
    products.push({
      id: getRandomId("products"),
      title: nameRef.value,
      description: descriptionRef.value,
      price: priceRef.value,
      thumbnail: imageRef.value,
    });

    toastMessageRef.innerText = "Product added successfully!!!";
  }
  toastRef.classList.add("fade", "show");

  setTimeout(() => {
    toastRef.classList.remove("fade", "show");
  }, 2000);

  localStorage.setItem("products", JSON.stringify(products));
  location.href = "/admin/index.html";
};

// loading products in admin page
const loadAdminHomePage = () => {
  const productsRef = document.getElementById("adminproductsbody");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  console.log(products);
  for (let product of products) {
    body += `<tr>
    <td><img src="${product.thumbnail}" alt="image" class="img-fluid img-thumbnail" style="width:100px;height:"50px;"/></td>
    <td>${product.title}</td>
    <td>${product.description}...</td>
    <td> ₹ ${product.price}</td>
    <td class="d-flex justify-content-center">
      <button class="btn btn-primary me-2" onClick="editProduct(${product.id})">Edit</button>
      <button class="btn btn-danger" onClick="deleteProduct(${product.id})">Delete</button>
    </td>
  </tr>`;
  }

  productsRef.innerHTML = body;
};

// delete product - admin page
const deleteProduct = (id) => {
  const products = JSON.parse(localStorage.getItem("products"));
  const filteredProducts = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filteredProducts));
  loadAdminHomePage();
};

// edit product - admin page
const editProduct = (id) => {
  location.href = `/admin/add_product.html?id=${id}`;
};

// populating products
const populateProduct = (product) => {
  const nameRef = document.getElementById("name");
  const priceRef = document.getElementById("price");
  const descriptionRef = document.getElementById("desc");
  const imageRef = document.getElementById("image");
  const idRef = document.getElementById("id");
  const titleRef = document.getElementById("title");
  const btnRef = document.getElementById("btn");

  idRef.value = product.id;
  nameRef.value = product.title;
  priceRef.value = product.price;
  descriptionRef.value = product.description;
  imageRef.value = product.thumbnail;
  titleRef.innerText = "Edit Product";
  btnRef.innerText = "Update Product";
};

// loading products in home page
const loadHomePage = () => {
  const productsRef = document.getElementById("productsRow");
  const products = JSON.parse(localStorage.getItem("products"));

  let body = "";
  for (let product of products) {
    body += `<div class="col-3 mt-4">
    <div
      class="border rounded p-2 bg-primary-subtle border-primary-subtle w-100 d-flex flex-column"
    >
      <img src="${product.thumbnail}" alt="image" style="min-width:200px;height:200px" />
      <p class="fs-5 my-1 mt-2 text-center">${product.title}</p>
      <p class="fs-4 my-1 mb-2 text-center">₹ ${product.price}</p>
      <button class="btn btn-success" onClick="addToCartHandler(${product.id})">Add to Cart</button>
    </div>
  </div>`;
  }

  productsRef.innerHTML = body;
};

// Add to cart
const addToCartHandler = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const product = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("userId")) {
    location.href = "/login.html";
  } else {
    let userId = parseInt(sessionStorage.getItem("userId"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartProduct = cart.find(
      (c) => c.userId === parseInt(userId) && c.id === parseInt(id)
    );
    if (cartProduct) {
      cart = cart.map((c) => {
        if (c.id === parseInt(id) && c.userId === parseInt(userId)) {
          return { ...c, count: c.count + 1 };
        } else {
          return c;
        }
      });
    } else {
      cart.push({ userId: parseInt(userId), count: 1, ...product });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }
};

// updating cart
const updateCartCount = () => {
  const cartCountRef = document.getElementById("cartCount");
  if (sessionStorage.getItem("userId")) {
    const userId = parseInt(sessionStorage.getItem("userId"));
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        const cartCount = userCart.reduce((acc, curr) => {
          acc += curr.count;
          return acc;
        }, 0);
        cartCountRef.innerText = `Cart - ${cartCount}`;
      } else cartCountRef.innerText = `Cart`;
    }
  } else location.href = "/login.html";
};

// loadCartPage
const loadCartPage = () => {
  const cartTableRef = document.getElementById("cartTableBody");
  const totalRef = document.getElementById("total");
  const emptyCartRef = document.getElementById("emptyCart");
  const tableRef = document.getElementById("table");

  if (localStorage.getItem("cart")) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    if (sessionStorage.getItem("userId")) {
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      if (userCart.length > 0) {
        tableRef.classList.remove("visually-hidden");
        emptyCartRef.classList.add("visually-hidden");
      } else {
        emptyCartRef.classList.remove("visually-hidden");
        tableRef.classList.add("visually-hidden");
      }

      let body = "";
      let total = 0;
      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.count) * parseInt(cartItem.price);
        const count = cartItem.count * cartItem.price;
        body += `<tr>
                  <td>${cartItem.title}</td>
                  <td>${cartItem.count}</td>
                  <td>${cartItem.price}</td>
                </tr>`;
      }
      cartTableRef.innerHTML = body;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/login.html";
    }
  }
};

// checkOutHandler
const checkOutHandler = () => {
  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userCart = cart.filter((c) => c.userId === userId);

      let orders = [];
      if (localStorage.getItem("orders")) {
        orders = JSON.parse(localStorage.getItem("orders"));
      }
      orders.push({
        timestamp: Date.now(),
        userId: userId,
        status: "Pending",
        products: userCart,
      });

      const otherUserCart = cart.filter((c) => c.userId !== userId);
      localStorage.setItem("cart", JSON.stringify(otherUserCart));
      localStorage.setItem("orders", JSON.stringify(orders));
      updateCartCount();
      location.href = "/orders.html";
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/signin.html";
  }
};

// loading order in user Page
const orderPage = () => {
  const tableRef = document.getElementById("ordertable");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));
      const userId = parseInt(sessionStorage.getItem("userId"));
      const userOrder = orders.filter((order) => order.userId === userId);

      let body = "";
      for (let order of userOrder) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        console.log(userId);
        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>${order.status}</td>
          </tr>`;
      }

      tableRef.innerHTML = body;
    } else {
      location.href = "index.html";
    }
  } else {
    location.href = "signin.html";
  }
};

// loading orders in admin page
const loadAdminOrderPage = () => {
  const tableRef = document.getElementById("table");

  if (sessionStorage.getItem("userId")) {
    if (localStorage.getItem("orders")) {
      const orders = JSON.parse(localStorage.getItem("orders"));

      let body = "";
      for (let order of orders) {
        let product = "";
        let total = 0;
        for (let prod of order.products) {
          product += `<p>${prod.count} * ${prod.title}</p>`;
          total += prod.count * prod.price;
        }

        const date = new Date(order.timestamp);
        const formattedDate =
          date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();

        const users = JSON.parse(localStorage.getItem("users"));
        const orderedUser = users.find(
          (user) => user.id === parseInt(order.userId)
        );

        body += `<tr>
            <td>${order.timestamp}</td>
            <td>${formattedDate}</td>
            <td>${orderedUser.email}</td>
            <td>${product}</td>
            <td>₹ ${total}</td>
            <td>
              <select class="form-select" id="status-${order.timestamp}">
                <option value="Pending">Pending</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </td>
          </tr>`;
      }
      console.log(body);
      tableRef.innerHTML = body;

      for (let order of orders) {
        const statusRef = document.getElementById(`status-${order.timestamp}`);
        statusRef.value = order.status;
        statusRef.addEventListener("change", () => {
          const lastUpdatedOrders = JSON.parse(localStorage.getItem("orders"));
          const updatedOrders = lastUpdatedOrders.map((o) => {
            if (o.timestamp === order.timestamp) {
              return { ...o, status: statusRef.value };
            } else return o;
          });
          localStorage.setItem("orders", JSON.stringify(updatedOrders));
        });
      }
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/signin.html";
  }
};
