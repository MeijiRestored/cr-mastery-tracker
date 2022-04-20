$(document).ready(function () {
  document.getElementById("tag").value = localStorage.getItem("tag");
});

function start() {
  var tag = document.getElementById("tag").value;
  if (!tag.startsWith("#")) {
    tag = `%23${tag}`;
  } else {
    tag = tag.replace("#", "%23");
  }

  fetch(`https://proxy.royaleapi.dev/v1/players/${tag}`, {
    method: "GET",
    cache: "default",
    headers: {
      Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImEyZGVmYTdkLTdmY2QtNDk1NS1hMGNiLTA5YmJmNmY3YTA5NiIsImlhdCI6MTY1MDI4Njc5MSwic3ViIjoiZGV2ZWxvcGVyL2NkYTdhMWQ2LTY1ZWYtMWE5Zi1lZjIxLTBjNjk4NTU4ZDBmMyIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyI5My43LjIyOC4xMCIsIjQ1Ljc5LjIxOC43OSJdLCJ0eXBlIjoiY2xpZW50In1dfQ.yXUfRCraYr9EydYC3WXtHSXYJqg7ZnSCdexwY0oVI3hvOUmVVFNgLIR9Yx5IizWvkk6v8IQJX9hyK4rkmtLZsA`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
    .then(function (response) {
      switch (response.status) {
        case 200:
          res = response.json().then((data) => {
            $("#outputSection").html("<h3>Stats loaded!</h3>");
            localStorage.setItem("tag", document.getElementById("tag").value);
            loadStats(data);
          });
          break;
        case 204:
          res = response.json().then((data) => {
            $("#outputSection").html("<h3>Stats loaded!</h3>");
            localStorage.setItem("tag", document.getElementById("tag").value);
            loadStats(data);
          });
          break;
        case 400:
          $("#outputSection").html(
            "<div id='error'>An error occured. Please check that your player tag is correct. (400)</div>"
          );
        case 403:
          $("#outputSection").html(
            "<div id='error'>An error occured. Please fill an issue on the <a href='https://github.com/32Vache/cr-mastery-tracker/issues'>Github repo</a> with the following code. (403)</div>"
          );
        case 404:
          $("#outputSection").html(
            "<div id='error'>An error occured. Please check that your player tag is correct. (404)</div>"
          );
        case 429:
          $("#outputSection").html(
            "<div id='error'>An error occured. The server is currently overloaded, try again in a few minutes. (429)</div>"
          );
        case 500:
          $("#outputSection").html(
            "<div id='error'>An error occured. Please try again in a few minutes. (500)</div>"
          );
        case 503:
          $("#outputSection").html(
            "<div id='error'>An error occured. Supercell's servers are currently in maintenance, try again later. (503)</div>"
          );
      }
    })
    .catch(function () {
      console.log("error lol");
      $("#outputSection").html(
        "<div id='error'>An unknown error occured.</div>"
      );
    });
}

function loadStats(data) {
  var mastery = [];
  for (let i in data["badges"]) {
    if (data["badges"][i]["name"].startsWith("Mastery")) {
      mastery.push(data["badges"][i]);
    }
  }
  console.log(mastery);

  var totalTiers = 107 * 7; // Current number of cards * Current amount of mastery tiers; There are 10 tiers but only 7 are currently in the game, the 3 others are coming soom.
  var completedTiers = 0;
  var unlockedMasteries = mastery.length;

  var TC = [0, 0, 0, 0, 0, 0, 0, 0];
  var loot = {
    gems: 0,
    gold: 0,
    common: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    champion: 0,
    cWC: 0,
    rWC: 0,
    eWC: 0,
    lWC: 0,
  };

  for (let i in mastery) {
    var level = mastery[i]["level"];
    completedTiers += level;
    TC[level] += 1;

    var card = mastery[i]["name"];

    if (
      card === "MasteryMightyMiner" ||
      card === "MasteryArcherQueen" ||
      card === "MasteryGoldenKnight" ||
      card === "MasterySkeletonKing"
    ) {
      if (level >= 1) {
        loot["gold"] += 1000;
      }
      if (level >= 2) {
        loot["champion"] += 1;
      }
      if (level >= 3) {
        loot["gold"] += 15000;
      }
      if (level >= 4) {
        loot["gold"] += 10000;
      }
      if (level >= 5) {
        loot["gems"] += 150;
      }
      if (level >= 6) {
        loot["gems"] += 300;
      }
      if (level >= 7) {
        loot["gems"] += 450;
      }
    } else if (
      card === "MasteryIceWizard" ||
      card === "MasteryGraveyard" ||
      card === "MasteryLavaHound" ||
      card === "MasteryMiner" ||
      card === "MasteryInfernoDragon" ||
      card === "MasteryLog" ||
      card === "MasteryPrincess" ||
      card === "MasteryAssassin" ||
      card === "MasteryGhost" ||
      card === "MasteryRamRider" ||
      card === "MasteryMegaKnight" ||
      card === "MasteryDarkWitch" ||
      card === "MasteryZapMachine" ||
      card === "MasteryFisherman" ||
      card === "MasteryEliteArcher" ||
      card === "MasteryElectroWizard" ||
      card === "MasteryRageBarbarian" ||
      card === "MasteryWitchMother"
    ) {
      if (level >= 1) {
        loot["gold"] += 1000;
      }
      if (level >= 2) {
        loot["legendary"] += 2;
      }
      if (level >= 3) {
        loot["gold"] += 12000;
      }
      if (level >= 4) {
        loot["gold"] += 8000;
      }
      if (level >= 5) {
        loot["gems"] += 150;
      }
      if (level >= 6) {
        loot["lWC"] += 2;
      }
      if (level >= 7) {
        loot["gems"] += 300;
      }
    } else if (
      card === "MasteryBabyDragon" ||
      card === "MasteryTornado" ||
      card === "MasteryBarbLog" ||
      card === "MasteryPoison" ||
      card === "MasteryBalloon" ||
      card === "MasteryGoblinDrill" ||
      card === "MasteryXbow" ||
      card === "MasterySkeletonWarriors" ||
      card === "MasteryGoblinBarrel" ||
      card === "MasterySkeletonArmy" ||
      card === "MasteryPrince" ||
      card === "MasteryWallbreakers" ||
      card === "MasteryGiantSkeleton" ||
      card === "MasteryHunter" ||
      card === "MasteryWitch" ||
      card === "MasteryRage" ||
      card === "MasteryPekka" ||
      card === "MasteryDarkPrince" ||
      card === "MasteryFreeze" ||
      card === "MasteryMirror" ||
      card === "MasteryMovingCannon" ||
      card === "MasteryAxeMan" ||
      card === "MasteryGoblinGiant" ||
      card === "MasteryElectroDragon" ||
      card === "MasteryRascals" ||
      card === "MasteryBowler" ||
      card === "MasteryLightning" ||
      card === "MasteryClone" ||
      card === "MasteryElectroGiant" ||
      card === "MasteryGolem"
    ) {
      if (level >= 1) {
        loot["gold"] += 1000;
      }
      if (level >= 2) {
        loot["epic"] += 20;
      }
      if (level >= 3) {
        loot["gold"] += 9000;
      }
      if (level >= 4) {
        loot["gold"] += 6000;
      }
      if (level >= 5) {
        loot["gems"] += 150;
      }
      if (level >= 6) {
        loot["eWC"] += 20;
      }
      if (level >= 7) {
        loot["gems"] += 300;
      }
    } else if (
      card === "MasteryTombstone" ||
      card === "MasteryValkyrie" ||
      card === "MasteryHogRider" ||
      card === "MasteryEarthquake" ||
      card === "MasteryBlowdartGoblin" ||
      card === "MasteryFireball" ||
      card === "MasteryInfernoTower" ||
      card === "MasteryMusketeer" ||
      card === "MasteryIceGolemite" ||
      card === "MasteryMiniSparkys" ||
      card === "MasteryDartBarrell" ||
      card === "MasteryRoyalHogs" ||
      card === "MasteryGoblinCage" ||
      card === "MasteryGiant" ||
      card === "MasteryMiniPekka" ||
      card === "MasteryGoblinHut" ||
      card === "MasteryMegaMinion" ||
      card === "MasteryBattleRam" ||
      card === "MasteryFirespiritHut" ||
      card === "MasteryRocket" ||
      card === "MasteryBarbarianHut" ||
      card === "MasteryHeal" ||
      card === "MasteryBattleHealer" ||
      card === "MasteryThreeMusketeers" ||
      card === "MasteryElixir Collector" ||
      card === "MasteryElixirGolem" ||
      card === "MasteryWizard" ||
      card === "MasteryBombTower"
    ) {
      if (level >= 1) {
        loot["gold"] += 1000;
      }
      if (level >= 2) {
        loot["rare"] += 100;
      }
      if (level >= 3) {
        loot["gold"] += 6000;
      }
      if (level >= 4) {
        loot["gold"] += 4000;
      }
      if (level >= 5) {
        loot["gems"] += 150;
      }
      if (level >= 6) {
        loot["rWC"] += 100;
      }
      if (level >= 7) {
        loot["gems"] += 300;
      }
    } else {
      if (level >= 1) {
        loot["gold"] += 1000;
      }
      if (level >= 2) {
        loot["common"] += 200;
      }
      if (level >= 3) {
        loot["gold"] += 3000;
      }
      if (level >= 4) {
        loot["gold"] += 2000;
      }
      if (level >= 5) {
        loot["gems"] += 150;
      }
      if (level >= 6) {
        loot["cWC"] += 200;
      }
      if (level >= 7) {
        loot["gems"] += 300;
      }
    }
  }

  $("#stats").show();
  $("#bars").html(
    `<p><b>Tier Completion</b></p>Tier 7<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-deep-purple" style="width:${Math.round(
      (TC[7] / 107) * 100
    )}%;height:100%">${Math.round(
      (TC[7] / 107) * 100
    )}%</div></div>Tier 6<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-amber" style="width:${Math.round(
      ((TC[7] + TC[6]) / 107) * 100
    )}%;height:100%">${Math.round(
      ((TC[7] + TC[6]) / 107) * 100
    )}%</div></div>Tier 5<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-yellow" style="width:${Math.round(
      ((TC[7] + TC[6] + TC[5]) / 107) * 100
    )}%;height:100%">${Math.round(
      ((TC[7] + TC[6] + TC[5]) / 107) * 100
    )}%</div></div>Tier 4<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-dark-grey" style="width:${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4]) / 107) * 100
    )}%;height:100%">${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4]) / 107) * 100
    )}%</div></div>Tier 3<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-bronze" style="width:${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4] + TC[3]) / 107) * 100
    )}%;height:100%">${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4] + TC[3]) / 107) * 100
    )}%</div></div>Tier 2<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-grey" style="width:${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4] + TC[3] + TC[2]) / 107) * 100
    )}%;height:100%">${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4] + TC[3] + TC[2]) / 107) * 100
    )}%</div></div>Tier 1<div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-brown" style="width:${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4] + TC[3] + TC[2] + TC[1]) / 107) * 100
    )}%;height:100%">${Math.round(
      ((TC[7] + TC[6] + TC[5] + TC[4] + TC[3] + TC[2] + TC[1]) / 107) * 100
    )}%</div></div>`
  );
  $("#loot").html(
    `<p><b>Reward Completion</b></p>Gems - <span title="${
      49950 - loot["gems"]
    } remaning">${
      loot["gems"]
    }<span style="font-size:75%">/49950</span></span><div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-green" style="width:${Math.round(
      (loot["gems"] / 49950) * 100
    )}%;height:100%">${Math.round(
      (loot["gems"] / 49950) * 100
    )}%</div></div>Gold - <span title="${1315000 - loot["gold"]} remaning">${
      loot["gold"]
    }<span style="font-size:75%">/1315000</span></span><div class="w3-light-grey" style="width:200px; height:18px;"><div class="w3-container w3-amber" style="width:${Math.round(
      (loot["gold"] / 1315000) * 100
    )}%;height:100%">${Math.round(
      (loot["gold"] / 1315000) * 100
    )}%</div></div><br><img src="assets/common.png" title="Common cards" width="20px" /> ${
      loot["common"]
    }<span style="font-size:75%">/5600</span>&nbsp;&nbsp;<img src="assets/rare.png" title="Rare cards" width="20px" /> ${
      loot["rare"]
    }<span style="font-size:75%">/2800</span> <br> <img src="assets/epic.png" title="Epic cards" width="20px" /> ${
      loot["epic"]
    }<span style="font-size:75%">/580</span>&nbsp;&nbsp;<img src="assets/legendary.png" title="Legendary cards" width="20px" /> ${
      loot["legendary"]
    }<span style="font-size:75%">/36</span>&nbsp;&nbsp;<img src="assets/champion.png" title="Champion cards" width="20px" /> ${
      loot["champion"]
    }<span style="font-size:75%">/4</span>
    <br><br><img src="assets/common-wc.png" title="Common wild-cards" width="20px" /> ${
      loot["cWC"]
    }<span style="font-size:75%">/5600</span>&nbsp;&nbsp;<img src="assets/rare-wc.png" title="Rare wild-cards" width="20px" /> ${
      loot["rWC"]
    }<span style="font-size:75%">/2800</span> <br> <img src="assets/epic-wc.png" title="Epic wild-cards" width="20px" /> ${
      loot["eWC"]
    }<span style="font-size:75%">/580</span>&nbsp;&nbsp;<img src="assets/legendary-wc.png" title="Legendary wild-cards" width="20px" /> ${
      loot["lWC"]
    }<span style="font-size:75%">/36</span>`
  );
}
