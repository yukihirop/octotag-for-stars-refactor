"use strict"

import { constants } from "@/constants"
import * as util from "@/util"
import { default as EditButton } from "@/component/shared/EditButton"
import { default as EditHint } from "@/component/shared/EditHint"
import { default as EditInput } from "@/component/shared/EditInput"

/**
 * Choose and display only repositores which have all tags.
 * If param is empty, display all repos.
 *
 * @param {array} tagArray
 */
export default class RepoUl {
    constructor(tagData, tagArray) {
        this.$repoUl = jQuery(constants.selector.github.repo_ul)
        this.$repoAnchors = jQuery(constants.selector.github.repo_ul).find(constants.selector.github.reponame_anchor)
        this.$repoList = this.$repoUl.children("li")
        this.tagData = tagData
        this.tagArray = tagArray
        this.isShowAll = (this.tagArray.length == 0)
    }

    filterByTags(){
        this.$repoList.each((index, element) => {
            let $li = jQuery(element)
      
            if (this.isShowAll) {
                this.showAll($li)
            }

            var repoLi = new RepoLi(this.tagArray, $li)
            repoLi.filterByTags()
        })
    }

    appendRepoTags(){
        let reponameArray = this.getRepoNameList()
        let tagData = this.tagData
        reponameArray.forEach((reponame) => {
            this.appendOctoTag(reponame, tagData)
        })
    }

    getRepoNameList(){
        let reponameArray = []
        let $repoAnchors = this.$repoAnchors

        $repoAnchors.each((index, element) => {
            let $this = jQuery(element)
            reponameArray.push($this.attr("href"))
        })
        return reponameArray
    }

    //private
    showAll($li){
        util.removeHiddenClass($li)
    }

    //private
    appendOctoTag(reponame, tagData) {
        jQuery('a[href="' + reponame + '"]', this.$repoUl).parents("li").append(this.createOctoTag(reponame, tagData))
    }

    //private
    createOctoTag(reponame, tagData) {
        let editButton = new EditButton(reponame).create()
        let editHint = new EditHint().create()
        let editInput = new EditInput(reponame).create()
        
        var $octotagList = jQuery("<ul>", {
            class: constants.functional.taglist_ul_class,
        })
        let tagArray = tagData[reponame]
        if (tagArray !== void 0) {
            tagArray.forEach((tag) => {
                $octotagList.append(jQuery("<li>",{
                    text: tag
                }))
            })
        }

        editInput.setTag(tagArray.join(", "))

        return jQuery("<div>",{
            class: constants.selector.repo_tag_class,
        })
            .append(editButton.createSelector)
            .append(util.addHiddenClass(editHint.createSelector))
            .append(util.addHiddenClass(editInput.createSelector))
            .append($octotagList)
    }
}

//private
class RepoLi {
    constructor(tagArray, $li) {
        this.$li = $li
        this.$tags = $li.find(constants.selector.github.repoli_tag)
        this.$editHint = $li.prevAll(constants.selector.tag_edit.hint_id)
        this.$editButton = $li.prevAll(constants.selector.tag_edit.button_id)
        this.tagArray = tagArray
    }

    saveAfterEdit(){
        this.hidden()
        util.addHiddenClass(this.$editHint)
        util.removeHiddenClass(this.$editButton)
    }

    filterByTags() {
        if(this.judgeShowRepoLi()){
            this.shown()
        } else {
            this.hidden()
        }
    }

    //private
    shown(){
        util.removeHiddenClass(this.$li)
    }

    //private
    hidden(){
        util.addHiddenClass(this.$li)
    }

    //private
    judgeShowRepoLi(){
        let matchCount = 0
        let tagArray = this.tagArray
        let result = false

        this.$tags.each((index, element) => {
            if (tagArray.includes(jQuery(element).text())){
                matchCount++
            }
        })
        if (matchCount == tagArray.length){
            result = true
        }
        return result
    }
}