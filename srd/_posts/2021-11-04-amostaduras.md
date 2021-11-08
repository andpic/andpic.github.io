---
title: "Amostaduras interativas in Javascript e d3.js" 
categories:
- "Data visualisation"
- Javascript
- d3.js
reference: first-visualisation 
comments: true
---

Is chi mi connoscint de diora, sciint ca seu interessau meda a s' amostamentu de is
informus, ca mi parit ca est una manera bona meda po imparai e cumprendi mellus. Difatis,
candu femu studianti de dotorau, emu fatu [un' amostadura de is informus chi femu
studiendi](https://andpic.github.io/en/slideshow) chi fiat pràxïa meda a s' urretori de s'
Imperial College, e chi nd' iant scritu finsas [noas in su giassu de s'
Universidadi](https://www.imperial.ac.uk/news/173587/imperial-student-shows-diagrams-used-make/)
e in phys.org.

Custa faina de is amostaduras m' iat a praxi a dda sighiri. Unas cantu cidas a oi, apu
agatau [unu cursu de Curran Kelleher in YouTube](https://www.youtube.com/watch?v=30lR5BlcO48), e in is cidas passadas mi-ddu seu
fatu totu.

La' una pariga de amostaduras chi apu fatu deu comenti fainas de su cursu.

Un' amostadura de is migrantis mortus o pèrdius in su mundu de su 2014 a su 2020.
<iframe id="migrants" width="100%" src="https://vizhub.com/andpic/0ffe08fc63f547ad9a24e6d6f529827c?mode=embed" title="Migrantis cun spumadori" frameborder="0" ></iframe>

Un' amostadura de is mortus de Coronavirus in is primus mesis de su 2020.

<iframe id="covidDeaths" width="100%" src="https://vizhub.com/andpic/9dfe83a861bb45318e3cf77d83ff5f8f?mode=embed" title="Mortus de COVID in su mundu po paisu" frameborder="0" ></iframe>

Speru ca custu m' agiudit finsas po sa faina de *[Sardinia
Sustainability](https://sardiniasustainability.github.io)*, chi est adelantendi-sì abellu
abellu.

<script>
let migrants = document.getElementById('migrants');
const migrantsAspectRatio = 960/800;
migrants.onload = () => {
    migrants.style.height = migrants.parentElement.clientWidth/migrantsAspectRatio + 'px';
}

let covidDeaths = document.getElementById('covidDeaths');
const covidDeathsAspectRatio = 960/500;
covidDeaths.onload = () => {
    covidDeaths.style.height = covidDeaths.parentElement.clientWidth/covidDeathsAspectRatio + 'px';
}
</script>