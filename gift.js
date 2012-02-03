myBO.Gifts = {
  gifts : null,
  myDiv : null,
  doList : [],
  doServer : 0,
  accepting : false,
  cont : null,
  init : function (){
    var t = myBO.Gifts;
    t.cont = document.createElement('div');

  },
  getContent : function (){
    var t = myBO.Gifts;
    return t.cont;
  },
  show : function (){
  var t = myBO.Gifts;
      t.cont.innerHTML = '<TABLE cellpadding=0 cellspacing=0  width=100%><TR><TR><TD width=10 align=left><a href=https://apps.facebook.com/kingdomsofcamelot/?page=choosegift title="SendGifts" target="_blank">Envoyez des KDO</a></td><TD width=200></td><TD align=center><INPUT id="pasubGifts" type=submit value="Cadeaux en attente" \></td><TD width=200 align=right></td></tr></table><HR>\
          <DIV id=giftDiv style="width:100%; min-height:300px; height:100%">';
      ById('pasubGifts').addEventListener ('click', t.e_clickedGifts, false);
      if (!Options.giftDomains.valid)
      Options.giftDomains.list[getServerId()] = unsafeWindow.domainName;
  },
  hide : function (){
  },
  e_clickedGifts : function  (){
    var t = myBO.Gifts;
    if (t.accepting){
      ById('pasubGifts').value = 'Recherche les cadeaux en attente';
      ById('giftDiv').innerHTML+= '<BR><SPAN class=boldRed>Annulee.</span>';
      t.accepting = false;
      return;
    }
    ById('giftDiv').innerHTML = 'R&eacute;cup&eacute;ration des cadeaux Facebook en cours ...<br><br>Attention votre navigateur va se bloquer, c\'est normal...<br><br>Si votre navigateur vous alerte : - Le script ne reponds pas - appuyez sur Continuer. Merci';

    t.fetchGiftsPage (gotGiftsPage);
    function gotGiftsPage(rslt){
      if (rslt.errMsg){
        ById('giftDiv').innerHTML += rslt.errMsg;
        return;
      }
      t.gifts = rslt;
      if (!Options.giftDomains.valid && t.gifts.length>0){
        t.ajaxGetGiftData (t.gifts[0], listGifts, function (){});
        return;
      }
      listGifts();
    }

    function listGifts (){

      var m = '<DIV class=boStat><CENTER>CADEAUX EN ATTENTE ('+ t.gifts.length +' trouv&eacute;)</center></div>';
      if (t.gifts.length<1){
        ById('giftDiv').innerHTML = m + '<BR><BR><CENTER>Aucun cadeau disponible !</center>';
        return;
      }
      m += '<TABLE class=pbTab align=center><TR><TD align=right>Serveur : </td><TD>'
        + htmlSelector (Options.giftDomains.list, getServerId(), 'id=pbGiftServers') +'</td></tr>\
          <TR><TD align=right>Suppression :</td><TD>'
        + htmlSelector ({y:'Toujours', e:'Seulement si erreur', n:'Jamais'}, Options.giftDelete, 'id=pbGiftDel')
        + '</td></tr><TR><TD>&nbsp</td><TD width=250><INPUT type=submit id=pbGiftDo value="Accepter">\
        &nbsp; <SPAN id=pbGiftNone class=boldRed></span></td></tr></table><HR><TABLE class=pbTab><TR valign=top><TD>\
        <INPUT id=pbGiftButAll type=submit value="Tous" style="width:100%; margin-bottom:5px"><BR><INPUT id=pbGiftButNone type=submit value="Aucun"></td>\
        <TD width=10></td><TD><TABLE align=center cellpadding=0 cellspacing=0 class=pbTabLined width=80%>\
        <TBODY id=pbGiftTbody style="height:250px; overflow:auto; display:block;">\
        <TR style="font-weight:bold; background:white"><TD>Cadeau</td><TD>Date</td><TD>Depuis (server)</td><TD width=20></td></tr>';
      t.gifts.sort (function (a,b){
          var x = a.gift.localeCompare (b.gift);
          if (x != 0)
            return x;
          return a.args.da.localeCompare(b.args.da);
          });
      for (var i=0; i<t.gifts.length; i++){
        var giftName = t.gifts[i].gift;
        if (t.gifts[i].args.si == 9)
          giftName += ' (Daily)';
        var date = t.gifts[i].args.da.substr(0,4) +'-'+ t.gifts[i].args.da.substr(4,2) +'-'+ t.gifts[i].args.da.substr(6,2);
        m += '<TR><TD><INPUT type=checkbox id=pbgchk_'+ i +'> &nbsp;'+ giftName +'</td><TD>'+ date +'</td>\
              <TD>'+ t.gifts[i].giver +' ('+ t.gifts[i].args.exs +')</td></tr>';
      }
      ById('giftDiv').innerHTML = m + '</tbody></table></td></tr></table>';
      ById('pbGiftDo').addEventListener ('click', t.getErDone, false);
      ById('pbGiftButAll').addEventListener ('click', t.e_butAll, false);
      ById('pbGiftButNone').addEventListener ('click', t.e_butNone, false);
    }
  },

  e_butAll : function (){
    var t = myBO.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      ById('pbgchk_'+i).checked = true;
  },

  e_butNone : function (){
    var t = myBO.Gifts;
    for (var i=0; i<t.gifts.length; i++)
      ById('pbgchk_'+i).checked = false;
  },

  getErDone : function (){
    var t = myBO.Gifts;
    t.doList = [];
    ById('pbGiftNone').innerHTML = '';
    Options.giftDelete = ById('pbGiftDel').value;
    for (var i=0; i<t.gifts.length; i++){
      if (ById('pbgchk_'+i).checked)
        t.doList.push (t.gifts[i]);
    }
    if (t.doList.length==0){
      ById('pbGiftNone').innerHTML = 'None Selected!';
      return;
    }
    t.doServer = ById('pbGiftServers').value;
    t.accepting = true;
    ById('pasubGifts').value = 'Stopper';
    ById('giftDiv').innerHTML = '<DIV id=acpDiv style="height:400px; max-height:400px; overflow-y:auto"><B>Acceptation de '+ t.doList.length +' cadeaux:</b><BR></div>';
    t.acceptNext ();
  },


  allDone : function (msg){
    var t = myBO.Gifts;
    ById('acpDiv').innerHTML += '<BR><BR>' + msg;
    ById('pasubGifts').value = 'Recherche les cadeaux en attente';
    t.accepting = false;
  },


  acceptNext : function (){
    var t = myBO.Gifts;
    var gift = t.doList.shift();
    if (gift == null){
      t.allDone ('Acceptation des cadeaux termin&eacute;e.');
      return;
    }
    var acpDiv = ById('acpDiv');
    var curDiv = document.createElement ('div');
    acpDiv.appendChild (curDiv);
    curDiv.innerHTML = '<B>'+ gift.gift +'</b> depuis '+ gift.giver +' du '+ gift.args.da.substr(0,4) +'-'+ gift.args.da.substr(4,2) +'-'+ gift.args.da.substr(6,2) +': ';
    var statSpan = document.createElement ('span');
    curDiv.appendChild (statSpan);
    statSpan.innerHTML = ' Lecture ';
    t.ajaxGetGiftData (gift, gotGiftData, progress);

    function progress (m){
      if (t.accepting)
        statSpan.innerHTML += ' '+m;
    }

    function gotGiftData (rslt){
      if (!t.accepting)
        return;
      if (rslt.ok){
        statSpan.innerHTML += ' &nbsp; Accept&eacute;.';
        t.ajaxAcceptGift (gift, t.doServer, doneAccepting);
        return;
      }

      if (rslt.feedback)
        msg = '<B>'+ rslt.feedback + '</b>';
      else
        msg = '<SPAN class=boldRed>ERROR: '+ rslt.ajaxErr +'</span>';
      if (rslt.del && Options.giftDelete!='n'){
        t.deleteGift (gift);
        msg += ' Supprim&eacute;.';
      }
      curDiv.removeChild (statSpan);
      curDiv = document.createElement ('div');
      curDiv.className = 'indent25';
      acpDiv.appendChild (curDiv);
      curDiv.innerHTML = msg;
      t.acceptNext ();
    }

    function doneAccepting (rslt){
      if (!t.accepting)
        return;
      var msg = '<font color=#0b0>OK</font>.';
      if (!rslt.ok)
        msg = '<SPAN class=boldRed>'+ rslt.msg +'</span>';
      statSpan.innerHTML = msg;
      if (Options.giftDelete=='y'){
        statSpan.innerHTML += ' &nbsp; supprim&eacute;.';
        t.deleteGift (gift);
      }
      t.acceptNext ();
    }
  },
  ajaxAcceptGift : function (gift, serverId, notify){
    var url;
    var pargs = {};
    if (gift.dat.ver == 1){
      url = gift.dat.url;
      pargs.giftId = gift.dat.giftId;
      pargs.hasExistingServer = 1;
      pargs.serverid = serverId;
      pargs.go = 'Next';
      GM_AjaxPost (url, pargs, ver1GotPost, 'Accept');
    } else {
      var i = gift.dat.url.indexOf('src/');
      url = gift.dat.url.substr(0,i) +'src/ajax/claimgift.php?wcfbuid='+ gift.dat.wcfbuid;
      pargs = unsafeWindow.Object.clone(unsafeWindow.g_ajaxparams);
      pargs.fb_sig_ext_perms = unescape(pargs.fb_sig_ext_perms);
      pargs.ver = '2';
      pargs.selectedS = serverId;
      pargs.giftinviteid = gift.dat.giftId;
      GM_AjaxPost (url, pargs, ver2GotPost, 'Accept');
     }
    function ver1GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      var m = /<div class=\'nm\'>(.*?)<\/div/im.exec(rslt);
      if (m)
        notify ({ok:false, msg: 'Got '+ m[1]});
      else
        notify ({ok:true, msg:'OK'});
    }
    function ver2GotPost (rslt){
      if (rslt == null){
        notify ({ok:false, msg:"AJAX Error"});
        return;
      }
      rslt = eval ('('+ rslt +')');
      if (rslt.ok)
        rslt.msg = 'OK';
      notify (rslt);
    }
  },
  deleteGift : function (gift){
    var pargs = {};
    for (var i=0; i<gift.inputs.length; i++){
        pargs[gift.inputs[i].name] = gift.inputs[i].value;
    }
    GM_AjaxPost (window.location.protocol+'//www.facebook.com/ajax/reqs.php?__a=1', pargs, gotAjaxPost, 'Delete');
    function gotAjaxPost (p){
    }
  },
 ajaxGetGiftData : function (gift, notify, progress, DELETE){
     var t = Tabs.Gifts;
     gift.dat = {};
     GM_AjaxGet (gift.submit, null, got1, 'Page 1');

     function got1 (page){
        if (page == null)
         notify ({ajaxErr:'COMM Error - page 1'});
       progress ('1');
 	  page = page.htmlSpecialCharsDecode();
       var m = page.match (/form action="(.*?)"/im);
       if (m == null)
         notify ({ajaxErr:'PARSE Error - page 1'});
 	  var url = m[1].htmlSpecialCharsDecode();
 	    url = unescape(url);
         url = url.replace ('\\/', '/', 'g');
 		url = url.replace (/\\u00253A/g, ':');
 		url = url.replace (/\\u00257C/g, '|');
 	  var signed_request = /signed_request" value="(.*?)"/im.exec (page);
 	  var opts = [];
 	  opts.signed_request = signed_request[1];
       GM_AjaxPost (url, opts, got2, 'Page 2');
     }
    function got2 (page){
       if (page == null)
         notify ({ajaxErr:'COMM Error - page 2'});
       progress ('2');
       var m = /top.location.href = \"(.*?)\"/im.exec (page);
       if (m == null)
        m = /top.location.replace\(\"(.*?)\"\)/im.exec (page);
       if (m==null)
         notify ({ajaxErr:'PARSE Error - page 2'});
       var url = m[1].htmlSpecialCharsDecode();
       GM_AjaxGet (url, '', got3, 'Page 3');
     }
   function got3 (page){
       if (page == null)
         notify ({ajaxErr:'COMM Error - page 3'});
       progress ('3');
 	  page = page.htmlSpecialCharsDecode();
 	  var m = page.match (/form action="(.*?)"/im);
       if (m == null)
         notify ({ajaxErr:'PARSE Error - page 3'});
       var url = m[1].htmlSpecialCharsDecode();
 	  url = unescape(url);
 	  url = url.replace ('\\/', '/', 'g');
 	  var signed_request = /signed_request" value="(.*?)"/im.exec (page);
 	  var opts = [];
 	  opts.signed_request = signed_request[1];
       GM_AjaxPost (url, opts, got4, 'Page 4');
     }
     function got4 (page){
       if (page == null)
         notify ({ajaxErr:'COMM Error - page 4'});
       progress ('4');
 	  page = page.htmlSpecialCharsDecode();

      var m = page.match (/src='(.*?)'/im);
       if (m == null) m = page.match (/form action="(.*?)"/im);
       if (m == null) notify ({ajaxErr:'PARSE Error - page 4'});
       var url = m[1].htmlSpecialCharsDecode();
       url = url.replace (/lang=.*?&/, 'lang=en&');
 	  url = url.replace ('\\/', '/', 'g');
 	  url = url.replace ('&amp;', '&', 'g');
 	  url = url.replace ('" + (new Date()).getTime() + "', (new Date()).getTime());
       gift.dat.url = url;
       var signed_request = /signed_request" value="(.*?)"/im.exec (page);
        var opts = [];
        opts.signed_request = signed_request[1];
        GM_AjaxPost (url, opts, got5, 'Page 5');
     }
     function got5 (page){
       if (page == null)
         notify ({ajaxErr:'COMM Error - page 5'});
       progress ('5');
 	  page = page.htmlSpecialCharsDecode();
       var m = /<div class=\'giftreturned\'>(.*?)<\/div/im.exec(page);
       if (m != null){
         notify ({feedback:m[1], del:true});
         return;
       }
       var m = /(We were unable to find your gift.*?)</im.exec(page);
       if (m != null){
         notify ({feedback:m[1], del:true});
         return;
       }
       var m = /(Unable to get the list of your friends.*?)</im.exec(page);
       if (m != null){
         notify ({feedback:m[1]});
         return;
       }
       var m = /(Facebook says you are not friends.*?)</im.exec(page);
       if (m != null){
         notify ({feedback:m[1], del:true});
         return;
       }

       var regexp = /<option value='(.*?)'.*?>(.*?)</img ;
       var m;
       while ( (m = regexp.exec (page)) != null){
         if (m[1] != 'noserver')
           Options.giftDomains.list[m[1]] = m[2];
       }
       Options.giftDomains.valid = true;
       if (page.indexOf('ver:2') >= 0){
         m = /giftinviteid:(.*?),/im.exec(page);
         if (m == null)
           notify ({ajaxErr:'PARSE Error (ver:2, giftinviteid not found) - page 5'});
         gift.dat.giftId = m[1];
         gift.dat.ver = 2;
       } else {
         m = /name='giftId' value='(.*?)'/im.exec(page);
         if (m == null){
           notify ({ajaxErr:'PARSE Error (ver:1, giftId not found) - page 5'});
           return;
         }
         gift.dat.giftId = m[1];
         gift.dat.ver = 1;
       }
       notify ({ok:true});
     }
  },
  fetchGiftsPage : function (notify){
      var gifts = [];
      GM_AjaxGet (window.location.protocol+'//www.facebook.com/games', '', parseGiftsPage, 'FB Gifts Page');

      function parseGiftsPage  (p){
        if (p == null)
          notify ({errMsg:'Ajax Comm Error'});
        p = p.htmlSpecialCharsDecode();


        var t = myBO.Gifts;
        var gifts = [];

        try {
          var m = p.split ('<form');

          for (var i=0; i<m.length; i++){
              if ( m[i].indexOf('Kingdoms of Camelot')<0)
              continue
            var mm = m[i].match( /facebook.com\/.*\">(.*?)<\/a><\/span>.*?(?:voudrait t'offrir un (.*?) dans)/im );
            //if (mm==null)
            //  mm = m[i].match( /facebook.com\/.*\">(.*?)<\/span><\/span><\/a>.*?(?:voudrait t'offrir un (.*?) dans)/im );
            if (mm==null)
               mm = m[i].match( /facebook.com\/.*\">(.*?)<\/a><\/span>.*?(?:would like to give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
	     /*if (mm==null)
              mm = m[i].match( /facebook.com\/.*\">(.*?)<\/span><\/span><\/a>.*?(?:would like to give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
             if (mm==null)
              mm = m[i].match( /facebook.com\/.*\">(.*?)<\/span><\/span><\/a>.*?(?:would like to give you a (?:gift of|)(.*?) in |Here is a(.*?)you can use)/im );
             if (mm==null)
              mm = m[i].match( /facebook.com\/.*\">(.*?)<\/a><\/span>.*?(?:in (.*?). Hurry and claim your Gift before it expires!)/im );
            if (mm==null)
              mm = m[i].match( /facebook.com\/.*\">(.*?)<\/a><\/span>.*?(?:in (.*?). Hurry and claim)/im );

  	    if (mm==null)
             mm = m[i].match( /appRequestBodyNewA\">(.*) sent an you an invitation to use Kingdoms of Camelot/im );
            if (mm==null)
  	      mm = m[i].match( /appRequestBodyNewA\">(.*) utiliser Kingdoms of Camelot/im );
  	    if (mm==null)
  	      mm = m[i].match( /appRequestBodyNewA\">(.*) Hurry and claim/im );
	    if (mm==null)
		mm = m[i].match( /appRequestBodyNewA\">(.*) Hurry and claim/im );
		*/
if (mm==null)
  mm = m[i].match( /appRequestBodyNewA.*<strong>(.*?)<\/strong>.*would like to give you a gift of (.*?) in/im);

 if (mm==null)
    continue;


          var giver = mm[1];
	  if (mm[2])
            var gift = mm[2].trim();

            // get all inputs ...  (name, value, type)
 	  var inps = [];
          var args = {};
          var inpsub = null;

          var ins = m[i].match (/<input.*?>/igm);
          for (var ii=0; ii<ins.length; ii++){
            var it = {};
            mm = /value=\"(.*?)\"/im.exec(ins[ii]);
			if (mm==null)
				continue;
            it.value = mm[1];
            mm = /name=\"(.*?)\"/im.exec(ins[ii]);
            if (mm==null)
				continue;
            it.name = mm[1];
            mm = /type=\"(.*?)\"/im.exec(ins[ii]);
            if (mm==null)
				continue;
            it.type = mm[1];
            if (it.type=='submit' && it.name!='actions[reject]'){
              it.name = eval ('"'+ it.name +'"');
              mm = /actions\[(.*?)\]/im.exec(it.name);
              inpsub = mm[1].replace('\\/', '/', 'g');
              inpsub = inpsub.replace('&amp;', '&', 'g');
              var a = inpsub.split ('&');
              for (var iii=0; iii<a.length; iii++){
                var aa = a[iii].split ('=');
                if (aa[0]=='da' || aa[0]=='si'){
                  args[aa[0]] = unescape(aa[1]);
                } else if (aa[0] == 'ex') {
                  var s = unescape(aa[1]).split ('|');
                  for (var iiii=0; iiii<s.length; iiii++){
                    var ss = s[iiii].split(':');
                    if (ss[0] == 's')
                      args.exs = ss[1];
					else
					  args[ss[0]] = ss[1];
                  }
                }
              }
	     if(args.gid) gift = unsafeWindow.itemlist['i'+args.gid].name;
            } else {
              inps.push (it);
            }
          }

          if (args.da)
            gifts.push ({giver:giver, gift:gift, args:args, submit:inpsub, inputs:inps});
        }
        notify (gifts);
      } catch (e) {
        notify ({errMsg:"Error parsing Facebook gift page "+ e});
      }
    }
  },
}
