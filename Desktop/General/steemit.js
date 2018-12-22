
//Retrieval functions

function get_global() {
    var url = "https://api.steemit.com/"
    var tosend = '{"jsonrpc":"2.0","method":"condenser_api.get_dynamic_global_properties", "params":[], "id":1}'

        var http = new XMLHttpRequest()
        gc()
        var pagedata = ""


}


function get_blog(account) {
    var url = "https://api.steemit.com/"
    var tosend = '{"jsonrpc":"2.0", "method":"follow_api.get_blog", "params":{"account":"'
            + account.split("@")[1] + '","start_entry_id":0,"limit":3}, "id":1}'

    var http = new XMLHttpRequest()
    gc()
    var pagedata = ""

    steemitposts.clear()

    http.onreadystatechange = function () {

        if (http.readyState === XMLHttpRequest.DONE) {

                pagedata = http.responseText

                var contents = pagedata.split('{"comment":')

               // banner = "../img/steemit-vector-icon.png"
                var num = 1
                while (num < contents.length) {
                    var permlink = contents[num].split('"permlink":"')[1].split(
                                '","category":"')[0]
                    var parent = contents[num].split(
                                '"parent_permlink":"')[1].split(
                                '","title":"')[0]

                    steemitposts.append({
                                            posttitle: contents[num].split(
                                                '"title":"')[1].split(
                                                '","body":"')[0],
                                            post: contents[num].split(
                                                '"body":"')[1].slice(
                                                0, 2000) + "...",
                                            thelink: "https://steemit.com/" + parent
                                                     + "/@" + account.split(
                                                         "@")[1] + "/" + permlink
                                        })

                    num = num + 1
                }
        }
    }
    http.open('POST', url.trim(), true)
    http.setRequestHeader("Content-type", "application/json")
    http.send(tosend)
}

function get_follow(account) {
    var url = "https://api.steemit.com/"
    var tosend = '{"jsonrpc":"2.0", "method":"follow_api.get_follow_count", "params":{"account":"'
            + account.split("@")[1] + '"}, "id":1}'

    var http = new XMLHttpRequest()
    gc()
    var pagedata = ""

    http.onreadystatechange = function () {

        if (http.readyState === XMLHttpRequest.DONE) {


                pagedata = http.responseText

                profileAbout = pagedata.split(",")
            }
    }
    http.open('POST', url.trim(), true)
    http.setRequestHeader("Content-type", "application/json")
    http.send(tosend)
}

function get_info(account) {
    var url = "https://api.steemit.com/"
    var tosend = '{"jsonrpc":"2.0", "method":"condenser_api.get_accounts", "params":[[ \
"' + account.split("@")[1] + '"]], "id":1}'

    var http = new XMLHttpRequest()
    gc()
    var pagedata = ""

    http.onreadystatechange = function () {

        if (http.readyState === XMLHttpRequest.DONE) {

                pagedata = http.responseText
               // console.log(pagedata)
                var profile = pagedata.split('{\\"profile\\":{')[1].split(
                            '\\"}}"')[0]
                yourProfile.steemProfileInfo = profile.replace(/\\/g, "").split(",")

                var alldata = pagedata.split('"}}"')[1].split(",")

                for(var pnum = 0;alldata.length > pnum;pnum = pnum + 1) {
                   // console.log(alldata[pnum])
                switch(alldata[pnum].split(":")[0]) {
                case '"post_count"' : console.log("post count: "+alldata[pnum].split(":")[1])
                                    break
                case '"voting_manabar"': console.log("mana: "+parseInt(alldata[pnum].split(":")[2].replace(/"/g,"")))
                                    break
                case '"balance"' : console.log(alldata[pnum].split(":")[1].replace(/"/g,""))
                                    break

                }

                }
            }
    }
    http.open('POST', url.trim(), true)
    http.setRequestHeader("Content-type", "application/json")
    http.send(tosend)
}

function get_comments(account) {
    var url = "https://api.steemit.com/"
    var tosend = '{"jsonrpc":"2.0", "method":"condenser_api.get_accounts", "params":[[ \
"' + account.split("@")[1] + '"]], "id":1}'

    var http = new XMLHttpRequest()
    gc()
    var pagedata = ""

    http.onreadystatechange = function () {

        if (http.readyState === XMLHttpRequest.DONE) {

                pagedata = http.responseText

                var profile = pagedata.split('{\\"profile\\":{')[1].split(
                            '\\"}}"')[0]

                steemProfileInfo = profile.replace(/\\/g, "").split(",")
                //console.log(steemProfileInfo[4])
        }
    }
    http.open('POST', url.trim(), true)
    http.setRequestHeader("Content-type", "application/json")
    http.send(tosend)
}

//Sending functions


