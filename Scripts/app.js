/* 
Names: Cole Biglang-awa (100825831) & Nathan Mcquaid (100841457)
Date: 2023-04-16
*/

"use strict";
(function () {
    
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://nathanmcquaid1996:nQ2OOuabaSSvBYX8@webd6201.sipyiq7.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);

    function AuthGuard() {
        let protected_routes = [
            "contact-list"
        ];
        if (protected_routes.indexOf(router.ActiveLink) > -1) {
            if (!sessionStorage.getItem("user")) {
                router.ActiveLink = "login";
            }
        }
    }
    function LoadLink(link, data = "") {
        router.ActiveLink = link;
        AuthGuard();
        router.LinkData = data;
        history.pushState({}, "", router.ActiveLink);
        document.title = router.ActiveLink.substring(0, 1).toUpperCase() + router.ActiveLink.substring(1);
        $("ul>li>a").each(function () {
            $(this).removeClass("active");
        });
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
        LoadContent();
    }
    function AddNavigationEvents() {
        let NavLinks = $("ul>li>a");
        NavLinks.off("click");
        NavLinks.off("mouseover");
        NavLinks.on("click", function () {
            LoadLink($(this).attr("data"));
        });
        NavLinks.on("mouseover", function () {
            $(this).css("cursor", "pointer");
        });
    }
    function AddLinkEvents(link) {
        let linkQuery = $(`a.link[data=${link}]`);
        linkQuery.off("click");
        linkQuery.off("mouseover");
        linkQuery.off("mouseout");
        linkQuery.css("text-decoration", "underline");
        linkQuery.css("color", "blue");
        linkQuery.on("click", function () {
            LoadLink(`${link}`);
        });
        linkQuery.on("mouseover", function () {
            $(this).css('cursor', 'pointer');
            $(this).css('font-weight', 'bold');
        });
        linkQuery.on("mouseout", function () {
            $(this).css('font-weight', 'normal');
        });
    }
    function LoadHeader() {
        $.get("./Views/components/header.html", function (html_data) {
            $("header").html(html_data);
            AddNavigationEvents();
            CheckLogin();
        });
    }
    function LoadContent() {
        let page_name = router.ActiveLink;
        let callback = ActiveLinkCallBack();
        $.get(`./Views/content/${page_name}.html`, function (html_date) {
            $("main").html(html_date);
            callback();
        });
    }
    function LoadFooter() {
        $.get(`./Views/components/footer.html`, function (html_date) {
            $("footer").html(html_date);
        });
    }
    function DisplayHomePage() {
        console.log("Home Page");
        $("#AboutUsButton").on("click", () => {
            LoadLink("about");
        });
        $("main").append(`<p id="MainParagraph" class="mt-3">Mission Statement:</p>`);
        $("main").append(`<article>
        <p id="ArticleParagraph" class ="mt-3">At WEBD6201 Lab 4's Site, our mission is to provide clients with smooth navigation and ease of accessibility. We aim to do this by offering optimal interaction through a user-friendly and efficient platform. Our goal is to design websites, and we are committed to delivering exceptional service to our users every step of the way.</p>
        </article>`);
    }
    function DisplayProjectsPage() {
        console.log("Projects Page");
      
        // Create a container for the projects
        const projectsContainer = document.createElement("div");
        projectsContainer.classList.add("container");
      
        // Create a row for the projects
        const projectsRow = document.createElement("div");
        projectsRow.classList.add("row");
      
        // Create the first project column
        const projectOneColumn = document.createElement("div");
        projectOneColumn.classList.add("col-md-4");
      
        // Create the JavaFX BMI Calculator image
        const bmiImage = document.createElement("img");
        bmiImage.src = "./images/javafxbmicalculator.png";
        bmiImage.alt = "JavaFX BMI Calculator";
      
        // Create a paragraph for the JavaFX BMI Calculator description
        const bmiDescription = document.createElement("p");
        bmiDescription.textContent = "This is a JavaFX application that calculates the Body Mass Index (BMI) based on user input.";
      
        // Append the image and description to the first project column
        projectOneColumn.appendChild(bmiImage);
        projectOneColumn.appendChild(bmiDescription);
      
        // Create the second project column
        const projectTwoColumn = document.createElement("div");
        projectTwoColumn.classList.add("col-md-4");
      
        // Create the C++ Text Prompt Checker image
        const textPromptImage = document.createElement("img");
        textPromptImage.src = "./images/oopcardsc++.png";
        textPromptImage.alt = "C++ Text Prompt Checker";
      
        // Create a paragraph for the C++ OOP Deck of Cards description
        const textPromptDescription = document.createElement("p");
        textPromptDescription.textContent = "This is a C++ program that uses Object-Oriented Programming (OOP) principles to simulate a deck of cards.";
      
        // Append the image and description to the second project column
        projectTwoColumn.appendChild(textPromptImage);
        projectTwoColumn.appendChild(textPromptDescription);
      
        // Create the third project column
        const projectThreeColumn = document.createElement("div");
        projectThreeColumn.classList.add("col-md-4");
      
        // Create the C++ OOP Deck of Cards image
        const deckImage = document.createElement("img");
        deckImage.src = "./images/textcheckerc++.png";
        deckImage.alt = "C++ OOP Deck of Cards";
      
        // Create a paragraph for the C++ Text Prompt Checker description
        const deckDescription = document.createElement("p");
        deckDescription.textContent = "This is a C++ program that checks user input against a text prompt to test the user's accuracy.";
      
        // Append the image and description to the third project column
        projectThreeColumn.appendChild(deckImage);
        projectThreeColumn.appendChild(deckDescription);
      
        // Append the project columns to the project row
        projectsRow.appendChild(projectOneColumn);
        projectsRow.appendChild(projectTwoColumn);
        projectsRow.appendChild(projectThreeColumn);
      
        // Append the project row to the projects container
        projectsContainer.appendChild(projectsRow);
      
        // Append the projects container to the main content
        $("main").append(projectsContainer);
      }
      
    function DisplayServicesPage() {
        console.log("Services Page");

        $("main").append(`<p id="MainParagraph" class="mt-3">Services offered: Front end development, Back end development, ExpressJS</p>`);

        const image = document.createElement('img');
    image.src = 'images/webdevstock.webp';
    // Insert the image after the paragraph
    document.getElementById('MainParagraph').insertAdjacentHTML('afterend', image.outerHTML);
    }
    function DisplayAboutPage() {
        console.log("About Page");

    // Check if about page container already exists
    const aboutPageContainer = document.getElementById("about-page");
    if (aboutPageContainer) {
        console.log("About page already displayed");
        return;
    }

    // Create a container for the Spiderman image and description
    const spidermanContainer = document.createElement("div");
    spidermanContainer.classList.add("container");
    spidermanContainer.id = "about-page";

    // Create a row for the image and description
    const spidermanRow = document.createElement("div");
    spidermanRow.classList.add("row");

    // Create a column for the image
    const spidermanColumnImage = document.createElement("div");
    spidermanColumnImage.classList.add("col-md-4");

    // Create an img element for the Spiderman image
    const spidermanImage = document.createElement("img");
    spidermanImage.src = "./images/spiderman.jpg";
    spidermanImage.alt = "Spiderman";

    // Append the Spiderman image to the column
    spidermanColumnImage.appendChild(spidermanImage);

    // Create a column for the description
    const spidermanColumnDescription = document.createElement("div");
    spidermanColumnDescription.classList.add("col-md-8");

    // Create a paragraph for the Spiderman description
    const spidermanDescription = document.createElement("p");
    spidermanDescription.textContent =
        "Spiderman is a fictional superhero created by Marvel Comics. He was created by writer Stan Lee and artist Steve Ditko and first appeared in Amazing Fantasy #15 in 1962. Spiderman has since become one of Marvel's most popular and beloved characters, known for his witty quips, impressive agility, and web-slinging abilities.";

    // Append the Spiderman description to the column
    spidermanColumnDescription.appendChild(spidermanDescription);

    // Append the image and description columns to the row
    spidermanRow.appendChild(spidermanColumnImage);
    spidermanRow.appendChild(spidermanColumnDescription);

    // Append the row to the container
    spidermanContainer.appendChild(spidermanRow);

        // Append the container to the main content
        $("main").append(spidermanContainer);
    }

    function AddContact(fullName, contactNumber, emailAddress) {
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }
    function ValidateField(fieldID, regular_expression, error_message) {
        let messageArea = $("#messageArea").hide();
        $("#" + fieldID).on("blur", function () {
            let text_value = $(this).val();
            if (!regular_expression.test(text_value)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            }
            else {
                messageArea.removeAttr("class").hide();
            }
        });
    }
    function ContactFormValidation() {
        ValidateField("fullName", /^([A-Z][a-z]{1,3}.?\s)?([A-Z][a-z]{1,})((\s|,|-)([A-Z][a-z]{1,}))*(\s|,|-)([A-Z][a-z]{1,})$/, "Please enter a valid Full Name. This must include at least a Capitalized First Name and a Capitalized Last Name.");
        ValidateField("contactNumber", /^(\+\d{1,3}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "Please enter a valid Contact Number. Example: (416) 555-5555");
        ValidateField("emailAddress", /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$/, "Please enter a valid Email Address.");
    }
    function DisplayContactPage() {
        console.log("Contact Page");
        $("a[data='contact-list']").off("click");
        $("a[data='contact-list']").on("click", function () {
            LoadLink("contact-list");
        });
        ContactFormValidation();

        let spidermanContact = "<div class='card'><div class='card-body'><h5 class='card-title'>Spiderman</h5><p class='card-text'>Contact Number: 123-456-7890<br>Email Address: spiderman@avengers.com</p></div></div>";
        $("#messageArea").append(spidermanContact);

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click", function (event) {
            if (subscribeCheckbox.checked) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                let contact = new core.Contact(fullName, contactNumber, emailAddress);
                if (contact.serialize()) {
                    let key = contact.FullName.substring(0, 1) + Date.now();
                    localStorage.setItem(key, contact.serialize());
                }
            }
        });
    }
    function DisplayContactListPage() {
        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";
            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {
                let contactData = localStorage.getItem(key);
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `<tr>
                <th scope="row" class="text-center">${index}</th>
                <td>${contact.FullName}</td>
                <td>${contact.ContactNumber}</td>
                <td>${contact.EmailAddress}</td>
                <td class="text-center"><button value="${key}" class="btn btn-primary btn-sm edit"><i class="fas fa-edit fa-sm"></i> Edit</button></td>
                <td class="text-center"><button value="${key}" class="btn btn-danger btn-sm delete"><i class="fas fa-trash-alt fa-sm"></i> Delete</button></td>
                </tr>`;
                index++;
            }
            contactList.innerHTML = data;
            $("button.delete").on("click", function () {
                if (confirm("Are you sure?")) {
                    localStorage.removeItem($(this).val());
                }
                LoadLink("contact-list");
            });
            $("button.edit").on("click", function () {
                LoadLink("edit", $(this).val());
            });
        }
        $("#addButton").on("click", () => {
            LoadLink("edit", "add");
        });
    }
    function DisplayEditPage() {
        console.log("Edit Page");
        ContactFormValidation();
        let page = router.LinkData;
        switch (page) {
            case "add":
                {
                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-lg"></i> Add`);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        let fullName = document.forms[0].fullName.value;
                        let contactNumber = document.forms[0].contactNumber.value;
                        let emailAddress = document.forms[0].emailAddress.value;
                        AddContact(fullName, contactNumber, emailAddress);
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", () => {
                        LoadLink("contact-list");
                    });
                }
                break;
            default:
                {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        LoadLink("contact-list");
                    });
                    $("#cancelButton").on("click", () => {
                        LoadLink("contact-list");
                    });
                }
                break;
        }
    }
    function CheckLogin() {
        if (sessionStorage.getItem("user")) {
            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt"></i> Logout</a>`);
            $("#logout").on("click", function () {
                sessionStorage.clear();
                $("#login").html(`<a class="nav-link" data="login"><i class="fas fa-sign-in-alt"></i> Login</a>`);
                AddNavigationEvents();
                LoadLink("login");
            });
        }
    }
    function DisplayLoginPage() {
        console.log("Login Page");
        let messageArea = $("#messageArea");
        messageArea.hide();
        AddLinkEvents("register");
        $("#loginButton").on("click", function () {
            let success = false;
            let newUser = new core.User();
            $.get("./Data/users.json", function (data) {
                for (const user of data.users) {
                    let username = document.forms[0].username.value;
                    let password = document.forms[0].password.value;
                    if (username == user.Username && password == user.Password) {
                        newUser.fromJSON(user);
                        success = true;
                        break;
                    }
                }
                if (success) {
                    sessionStorage.setItem("user", newUser.serialize());
                    messageArea.removeAttr("class").hide();
                    LoadLink("contact-list");
                }
                else {
                    $("#username").trigger("focus").trigger("select");
                    messageArea.addClass("alert alert-danger").text("Error: Invalid Login Information").show();
                }
            });
        });
        $("#cancelButton").on("click", function () {
            document.forms[0].reset();
            LoadLink("home");
        });
    }
    function DisplayRegisterPage() {
        console.log("Register Page");
        AddLinkEvents("login");
    }
    function Display404Page() {
    }


    function ActiveLinkCallBack() {
        switch (router.ActiveLink) {
            case "home": return DisplayHomePage;
            case "about": return DisplayAboutPage;
            case "projects": return DisplayProjectsPage;
            case "services": return DisplayServicesPage;
            case "contact": return DisplayContactPage;
            case "contact-list": return DisplayContactListPage;
            case "edit": return DisplayEditPage;
            case "login": return DisplayLoginPage;
            case "register": return DisplayRegisterPage;
            case "404": return Display404Page;
            default:
                console.error("ERROR: callback does not exist: " + router.ActiveLink);
                return new Function();
        }
    }
    function Start() {
        console.log("App Started!");
        LoadHeader();
        LoadLink("home");
        LoadFooter();
        
    }
    window.addEventListener("load", Start);

    
})();
//# sourceMappingURL=app.js.map