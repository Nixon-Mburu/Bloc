The following document details some of the changes I want us to make to this application:

(a) On the homepage, add a new section it fills like its hanging, have like 5 different divs
(b) We need to fix the customer login function, it gives the error: "[vite] server connection lost. Polling for restart...
api/auth/customers/signup:1  Failed to load resource: net::ERR_CONNECTION_REFUSED"

when I press "Sign Up"

Therefore its really not calling the backend correctly

(c) Then we have more or less the same error in the merchants sign up:

"[vite] server connection lost. Polling for restart...
api/auth/merchants/signup:1  Failed to load resource: net::ERR_CONNECTION_REFUSED"

(d) On the page customer-homepage, the search bar does not work properly or at all cause I cannot type or search for 

Basically the page is not wired between the UI and the backend models
