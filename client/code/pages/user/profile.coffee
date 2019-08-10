#page module?
app=require '/app'
util=require '/util'

name_length_max=20
mypage_view = null

exports.start=(user)->
    dialog = JinrouFront.loadDialog()

    pi18n = app.getI18n()
    papp = JinrouFront.loadMyPage()

    Promise.all([pi18n, papp]).then(([i18n, japp])->
        japp.place {
            i18n: i18n
            node: $("#mypage-app").get 0
            profile:
                userid: user.userid
                name: user.name
                comment: user.comment
                mail: user.mail
                icon: user.icon
            mailConfirmSecurity: user.mailconfirmsecurity
            onProfileSave:(q)->
                new Promise (resolve)->
                    pf = ()=>
                        ss.rpc "user.changeProfile", q,(result)->
                            if result.error?
                                dialog.then((d)-> d.showErrorDialog {
                                    modal: true
                                    message: String result.error
                                })
                                resolve false
                            else
                                resolve true
                    if q.mail?
                        ss.rpc "user.sendConfirmMail", q,(result)->
                            if result.error?
                                dialog.then((d)-> d.showErrorDialog {
                                    modal: true
                                    message: String result.error
                                })
                                resolve false
                            else
                                pf()
                            if result.info?
                                dialog.then((d)-> d.showMessageDialog {
                                    modal: true
                                    title: "通知"
                                    message: result.info
                                    ok: "OK"
                                })
                    else
                        pf()
            onMailConfirmSecurityChange:(value)->
                new Promise (resolve)->
                    ss.rpc "user.changeMailconfirmsecurity", {
                        mailconfirmsecurity: value
                    }, (result)->
                        if result?.error?
                            dialog.then (dialog)->
                                dialog.showErrorDialog {
                                    modal: true
                                    message: String result.error
                                }
                            resolve false
                        else
                            dialog.then (dialog)->
                                dialog.showMessageDialog {
                                    modal: true
                                    title: "通知"
                                    message: result.info
                                    ok: "OK"
                                }
                            resolve true
            onChangePassword:(query)->
                new Promise (resolve)->
                    ss.rpc "user.changePassword", {
                        newpass: query.newPassword
                        newpass2: query.newPassword2
                        password: query.currentPassword
                    }, (result)->
                        if result?.error?
                            dialog.then (dialog)->
                                dialog.showErrorDialog {
                                    modal: true
                                    message: String result.error
                                }
                            resolve false
                        else
                            dialog.then (dialog)->
                                dialog.showMessageDialog {
                                    modal: true
                                    title: "通知"
                                    message: "パスワードを変更しました。"
                                    ok: "OK"
                                }
                            resolve true
        }
    ).then (v)->
        mypage_view = v

    # 称号
    if user.prizeNumber > 0
        $("#prizenumber").text user.prizeNumber
    if user.nowprizeData
        nowprizeb = $("<b />").text user.nowprizeData
        $("#current-prize").text("現在の肩書き：").append nowprizeb
    else
        $("#current-prize").text "まだ肩書きは設定されていません。"

    Index.game.rooms.start({
        noLinks: true
    })    # ルーム一覧を表示してもらう
    # お知らせ一覧を取得する
    ss.rpc "user.getNews",(docs)->
        if docs.error?
            # ?
            console.error docs.error
            return
        table=$("#newslist").get 0
        unless table?
            # page may already have gone.
            return
        docs.forEach (doc)->
            r=table.insertRow -1
            cell=r.insertCell 0
            d=new Date doc.time
            cell.textContent="#{d.getFullYear()}-#{d.getMonth()+1}-#{d.getDate()}"
            cell=r.insertCell 1
            cell.textContent=doc.message
        if docs[0]
            # ひとつでもあればここまで見たことにする
            localStorage.latestNews=docs[0].time
            # みたのでお知らせを除去
            $("#newNewsNotice").remove()

exports.end=->
    mypage_view?.unmount()
    Index.game.rooms.end()
