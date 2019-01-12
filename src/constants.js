"use strict"

/**
* Constants
*/

/* eslint-disable indent */
 export var constants = {

     /**
  * Selectors.
  */
     selector: {
         github: {
             header_ul: "header nav ul",
             repo_ul: "ul.repo-list",
             reponame_anchor: "h3 a",
             filter_div: "div.col-md-3.mb-6.mb-md-0",
             repoli_tag: "div.octotag-repo ul.octotag-taglist li",
         },
         repo_tag_class: "octotag-repo",
         filter_id: ".octotag-filter",
         tag_edit: {
             hint_id: ".octotag-edit-hint",
             button_id: ".octotag-edit-button",
             input_id: ".octotag-edit-input",
         },
         taglist_id: ".octotag-taglist",
     },

     /**
  * Selectors, especially have functions.
  */
     functional: {
         edit: {
             button_class: "octotag-edit-button",
             hint_class: "octotag-edit-hint",
             input_class: "octotag-edit-input"
         },
         taglist_ul_class: "octotag-taglist",
         filtertaglist_ul_class: "octotag-filtertaglist",
         filtertaglist_ul_id: ".octotag-filtertaglist",
         filtertaglist_input_id: ".octotag-taglist.octotag-filtertaglist input",
         filter_li_class: "#octotag-filter li",
         checkedtag_class: "checked",
         hidden_class: "octotag-hidden"
     },

     event: {
        edit_button: '.octotag-edit-button',
        edit_input: '.octotag-edit-input',
        filtertaglist_input: '.octotag-filtertaglist input'
     },

     /**
  * DOM which is added in page.
  */
     DOM: {
         stars_link_li: '<li><a class="js-selected-navigation-item HeaderNavlink px-lg-2 py-2 py-lg-0" href="/stars">&thinsp;Stars</a></li>',
         filterbytags_heading: '<hr><h3 class="h4 mb-2">Filter by tags</h3>',
     },

     /**
  *
  */
     storageKey: "octotagKeyRefactor",

 }
 /* eslint-enable indent */