# Lab3

## Requirements
* Improve and expand health business site developed in lab 4
* Learn JQuery to create a responsive site
* Use icons
* 2 new **functional requirements** (all previous reqs should still hold):
  * Now the site should allow the user to **choose both the service and the date/time, AND the expert of their choice** (ex:  the client wants an appointment for knee rehabilitation with physiotherapist Xu Tao)
  * To guarantee a service reservation, the user must **provide their credit card information**: must add a payment section to site

* Requirements related to **human cognition**:
  * **Attention**: To make sure users know where they are when they return to the site, it's useful to add a menu like Navbar at the top of the page
    * The tendency of users will be often to look at the top of the page == focus point and check for menu ==> navbar will only be a menu whose options bring the user to the right place on your page; don't create new pages, your new menu will contain pointers to sections on your page
  * **Memory**: short-term memory: avoid having long menus; organize the different services into subgroups
  * **Perception**: gestalt laws
    * Law of similarity: similar elements == same colors, icons that help to see a group
    * Law of figure and ground == clearly visible icons on various background colors
    * Law of focal point == elements that will attract the user's attentino like navbar
  * **visual communication tools** (icons):
    * Think critically about choice of icons: must add icons on page for:
      * services
      * experts/professionals
      * payment
      * 2 other elements (location + calendar + time?)
      * [https://icons8.com/icons](https://icons8.com/icons)
  * **Design principles requirements**
    * **Visibility and afforance**
      * Help user understand the information to enter:
        * use **tooltips**, help user to understand what they should provide as info and why; ex: asking for a CC may seem strange and thus they should be told that it is in the event of last minute cancellation or other reason
        * **Highlighting entries**
          * When users put their mouse on an entry box, change the color of the entry or emphasize this entry in another wayu
  * **Constraints**
    * I can only make acceptable choices and enter appropriate information
    * Ex: **validation** of inputs == when users enter information into input component of type "text" they can write anything
      * Need to use **regex to validate format of:**
        * Telephone: (xxx) xxx-xxxx
        * Cc. card number: xxxx xxxx xxxx xxxx
    * Hiding unavailable dates
      * When users choose a date for service, they should be presented with a calendar in which some dates must be unavailable:
        * **Weekends**
        * **Dates which don't correspond to availability of the chosen professional** ==> need to have a data table in code like Daniel, Tuesday-Wednesday-Thursday, Johanne, Tuesday-Wednesday which estables working days of each professional
        * So when user chooses Daniel, the only calendar days available should be Tuesday-Wednesday-Thursday
          * Suggestion: use datepicker component of JQuery UI
          * Challenge: hide certain days depending on choice of professional
    * **Feedback**:
      * What just happened? Did I mess up?
      * **Input errors**: when user enters info into a component of type "text", they can write anything ==> need to both validate AND give error messages
      * **Feedback** necessary to help user understand what happened (ex: booking)
    * **Consistency**
      * Choice of jQuery UI theme related to atmosphere of site: [https://jqueryui.com/themeroller/](https://jqueryui.com/themeroller/)
      * Choice of icons related to atmosphere of the site

## Inspiration
* [ryan's GH](https://github.com/RyanMatte/Lab5_Starter)
* [ryan's website](https://ryanmatte.ca/Lab5_Starter/)
* [icons](https://icons8.com/icons)
* [jquery themes](https://jqueryui.com/themeroller/)

## Peergrade questions


## References
* https://mdbootstrap.com/docs/standard/extended/credit-card/
* CC: https://icons8.com/icons/set/credit-card