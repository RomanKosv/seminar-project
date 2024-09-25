

select = document.getElementById("selectlang");

select.addEventListener("change", changeURLLanguage);

function changeURLLanguage(){
    let lang = select.value;
    location.href = window.location.pathname + "#" + lang;
    //location.reload();
    changeLanguage();
}

function changeLanguage() {
    let hash = window.location.hash;
    hash = hash.substr(1);
    select.value = hash;
    document.querySelector("title").innerHTML = langArr['titled'][hash];
    document.querySelector(".languages-buttonText").innerHTML = langArr['buttonText'][hash];
    document.querySelector(".languages-questions").innerHTML = langArr['questions'][hash];
    localization.accuracy_not_integer=langArr.accuracy_not_integer[hash];
    localization.complex_not_parse_c2=langArr.complex_not_parse_c2[hash];
    localization.rational_not_parse_c2=langArr.rational_not_parse_c2[hash];
    localization.rational_less_than_0_c2=langArr.rational_less_than_0_c2[hash];
    document.getElementById("select title").innerHTML=langArr["select title"][hash];
    document.getElementById("accuracy title").innerHTML=langArr["accuracy title"][hash];
    document.getElementById("result title").innerHTML=langArr["result title"][hash];
    document.getElementById("mode1").innerHTML=langArr["mode1"][hash];
    document.getElementById("mode2").innerHTML=langArr["mode2"][hash];
    document.getElementById('input title').innerHTML=langArr.input_title[hash];
    document.getElementById("instructions").innerHTML=langArr.instructions[hash]+"<summary id='instructions title'>"+langArr["instructions title"][hash]+"</summary>"
    state.comment1='';
    state.comment2='';
    state.comment3='';
    render();
    console.log(localization);
}

{
    let s="";
    langnames.forEach(element => {
        s+="<option value='"+element+"'>"+element.toUpperCase()+"</option>"
    });
    document.getElementById("selectlang").innerHTML=s;
    let lang=langnames[0];
    location.href = window.location.pathname + "#" + lang;
    changeLanguage();
};
