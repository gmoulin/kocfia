//marchTimeCalculator
        /*var throne67 = cm.ThroneController.effectBonus(67);
        var throne68, throne69, throne70, throne71, throne72;
        throne68 = throne69 = throne70 = throne71 = throne72 = 0;
        if (attack_selected) {
            throne68 = cm.ThroneController.effectBonus(68)
        } else {
            if ($("#modal_attack_tab_3").hasClass("selected")) {
                throne72 = cm.ThroneController.effectBonus(72)
            } else {
                if ($("#modal_attack_tab_2").hasClass("selected")) {
                    throne69 = cm.ThroneController.effectBonus(69)
                } else {
                    if ($("#modal_attack_tab_5").hasClass("selected")) {
                        throne71 = cm.ThroneController.effectBonus(71)
                    } else {
                        if ($("#modal_attack_tab_1").hasClass("selected")) {
                            throne70 = cm.ThroneController.effectBonus(70)
                        }
                    }
                }
            }
        }
        var throneBoost = throne67 + throne68 + throne69 + throne70 + throne71 + throne72;
        if (!barbarian_raid) {
            speed = speed * (1 + (throneBoost * 0.01))
        }*/

//max units per march
        var rallyLevel = getBuildingLevel(12),
            troopAmountBonus = 1;
        if (rallyLevel === 11) {
            troopAmount = (Math.round(150000 * troopAmountBonus))
        } else {
            if (rallyLevel === 12) {
                troopAmount = (Math.round(200000 * troopAmountBonus))
            } else {
                troopAmount = (Math.round((rallyLevel * 10000) * troopAmountBonus))
            }
        }
        $("#modal_attack_maxunt").html(Math.round(troopAmount));

//load capacity
        var techLoadBoost = parseInt(seed.tech.tch10) * 0.1;
        var loadEffectBoost = 0;
        if (seed.playerEffects.loadExpire > unixtime()) {
            loadEffectBoost = 0.25
        }
        var loadBoostBase = (cm.ThroneController.effectBonus(6) * 0.01) + loadEffectBoost + techLoadBoost;

		//then per unit
                var loadBoost = loadBoostBase;
                if (cm.unitFrontendType[untid] == "siege") {
                    loadBoost += (cm.ThroneController.effectBonus(59) * 0.01)
                } else {
                    if (cm.unitFrontendType[untid] == "horsed") {
                        loadBoost += (cm.ThroneController.effectBonus(48) * 0.01)
                    }
                }
                load += unit_number * parseInt(unitstats["unt" + untid][5]) * (1 + loadBoost)

//train time
    j.ultimate = j.workshop + j.stable + j.tech;
    d = d + (0.1 * j.ultimate);
    b = Math.max(1, Math.ceil(b / d)); //b = unitcost[7] * qty
    var h = cm.ThroneController.effectBonus(77);
    b = b / (1 + (h / 100));

//build
            var C = cm.ThroneController.effectBonus(78);
            ai = parseInt(ai / (1 + 0.005 * t + 0.1 * parseInt(seed.tech.tch16)));
            ai = Math.round(ai / (1 + (C / 100)));
            var at = Math.max(600, parseInt(ai * 0.1));

//bonus production
    var k = seed.throne.slotEquip[seed.throne.activeSlot],
        u, d, j, o;
    for (var q = 1; q < 5; q++) {
        l.push("<td>");
        o = 0;
        jQuery.each(k, function(i, y) {
            u = kocThroneItems[y];
            jQuery.each(u.effects, function(A, z) {
                d = +(cm.thronestats.tiers[z.id][z.tier].base);
                j = +(cm.thronestats.tiers[z.id][z.tier].growth);
                if (z.id === 82) {
                    o += d + (u.level * j)
                }
                if (z.id === 83 && q === 1) {
                    o += d + (u.level * j)
                }
                if (z.id === 84 && q === 2) {
                    o += d + (u.level * j)
                }
                if (z.id === 85 && q === 3) {
                    o += d + (u.level * j)
                }
                if (z.id === 86 && q === 4) {
                    o += d + (u.level * j)
                }
            })
        });
        g[q] = g[q] + (o / 100) * r[q];
        l.push((o / 100) * r[q]);
        l.push("</td>")
    }

//post to profile
	function postToProfile(feedType, data, actionlink, tgt, confunc, arr, postTo) {
		var optionalmsg = "";
		if (document.getElementById("optionalmsg")) {
			optionalmsg = $("optionalmsg").value
		}
		var str = Object.toJSON(data);
		for (var i in arr) {
			str = str.replace(eval("/" + i + "/g"), arr[i])
		}
		if (typeof(g_jsarr) != "undefined") {
			for (var i in g_jsarr) {
				str = str.replace(eval("/" + i + "/g"), g_jsarr[i])
			}
		}
		var data = str.evalJSON();
		var params = Object.clone(g_ajaxparams);
		params.action = "feedOpened";
		params.situation = feedType;
		new Ajax.Request(g_ajaxpath + "ajax/trackSending.php" + g_ajaxsuffix, {
			method: "post",
			parameters: params,
			onSuccess: function(transport) {},
			onFailure: function() {}
		});
		kraken.network.publishStory({
			to: postTo,
			title: data.name,
			body: data.caption,
			image: data.img1,
			facebook__frictionless: false,
			link: actionlink[0].href,
			link_text: actionlink[0].text
		}, confunc)
	}

//resource tooltip
    var b = cm.guardianBonusView.get(l);
    var e = seed.resources["city" + currentcityid][l];
    var o = cm.ThroneController.effectBonus(79);
    resourceIncrease = Math.round(e[3]) + Math.round(b);
    if (o > 0) {
        resourceIncrease = Math.round(resourceIncrease * (1 + o / 100))
    }
    var c = "<div>" + d + "</div>";
    if (l == "rec5") {
        var j = +(cm.WorldSettings.getSetting("DARK_FOREST_AETHERSTONE_CAP")) || 0;
        var k = cm.ThroneController.effectBonus(88);
        j = j + (j * (k / 100));
        c += "<div>" + g_js_strings.commonstr.youown + ": " + addCommas(Math.round(e[0])) + "</div>";
        c += "<div>" + g_js_strings.commonstr.max + ": " + addCommas(Math.round(j)) + "</div>";
        showTooltip(c, g, m, h);
        return

//hapiness
    var a = cm.ThroneController.effectBonus(90);
    c = Math.floor(c + (c * (a / 100)));
    if (c > 100) {
        c = 100
    }

//update seed use throne room bonus 0o ?!

//tech cost use throne room bonus

//build time
        var n = cm.ThroneController.effectBonus(78);
        d = d - (d * (n / 100));

