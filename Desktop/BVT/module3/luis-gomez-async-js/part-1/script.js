document.addEventListener("DOMContentLoaded", function () {
    // selects .event-log from the DOM & creates the log variable
    const log = document.querySelector(".event-log");

    // references the button with an id of "xhr" & adds an event listener
    // that will change the textContent of log 
    document.querySelector("#xhr").addEventListener("click", () => {
        log.textContent = "";

        // This line creates a new instance of the XMLHttpRequest object 
        // which you can then use to configure and send HTTP requests.
        const xhr = new XMLHttpRequest();

        // adds event listener for loadend event to xhr variable we created above
        // then sets a function to replace the log.textContent with the new status of xhr(new XMLHttpRequest)
        xhr.addEventListener("loadend", () => {
            log.textContent = `${log.textContent}Finished with status: ${xhr.status}`;
        });

        // we use the open method to initialize an HTTP request and set it's parameters the open
        // method is inherently asynchronus
        xhr.open(
            "GET",
            "https://raw.githubusercontent.com/mdn/content/main/files/en-us/_wikihistory.json", false
        );
        // we use the send method to execute that request
        xhr.send();
        // this updates the log element to indicate the XHR request was sent 
        log.textContent = `${log.textContent}Started XHR request\n`;
    });

    // adds an event listener to the reload button & adds a function to that button 
    // that clears the log text and reloads the page.
    document.querySelector("#reload").addEventListener("click", () => {
        log.textContent = "";
        document.location.reload();
    });
});
