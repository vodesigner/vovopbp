/*==========================================================
 Universal AI Prompt Builder Pro
 app.js
 Version 1.0
==========================================================*/


/*==========================================================
 프로그램 시작
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initialize();

});



/*==========================================================
 초기화
==========================================================*/

function initialize(){

    bindEvents();

}




/*==========================================================
 이벤트 연결
==========================================================*/

function bindEvents(){

    document
        .getElementById("generatePrompt")
        .addEventListener("click", generatePrompt);



    document
        .getElementById("copyPrompt")
        .addEventListener("click", copyPrompt);



    document
        .getElementById("saveJSON")
        .addEventListener("click", saveJSON);



    document
        .getElementById("loadJSON")
        .addEventListener("click", loadJSON);



    document
        .getElementById("clearForm")
        .addEventListener("click", clearForm);

}




/*==========================================================
 Prompt 생성
==========================================================*/

function generatePrompt(){

    const prompt = buildPrompt();

    document
        .getElementById("promptOutput")
        .value = prompt;

}




/*==========================================================
 Prompt 작성
==========================================================*/

function buildPrompt(){

    const projectName = value("projectName");

    const location = value("location");

    const appearance = value("appearance");

    const outfit = value("outfit");

    const action = value("action");

    const expression = value("expression");

    const lighting = value("lightingType");

    const lens = value("lens");

    const movement = value("cameraMovement");

    const shot = value("cameraShot");

    const style = getCheckedValues(".styleCheck");

    const mood = getCheckedValues(".moodCheck");

    const mainPrompt = value("mainPrompt");

    const negative = value("negativePrompt");



    let prompt = "";



    prompt += "Project : " + projectName + "\n\n";



    prompt += shot + ".\n";



    prompt += appearance + ".\n";



    prompt += outfit + ".\n";



    prompt += action + ".\n";



    prompt += expression + ".\n";



    prompt += "Lighting : " + lighting + ".\n";



    prompt += "Lens : " + lens + ".\n";



    prompt += "Camera Movement : " + movement + ".\n";



    prompt += "Location : " + location + ".\n";



    if(style.length > 0){

        prompt +=
        "Style : "
        + style.join(", ")
        + ".\n";

    }



    if(mood.length > 0){

        prompt +=
        "Mood : "
        + mood.join(", ")
        + ".\n";

    }



    prompt += "\n";



    prompt += mainPrompt;



    prompt += "\n\n";



    prompt += "Negative Prompt :\n";



    prompt += negative;



    return prompt;

}




/*==========================================================
 INPUT VALUE
==========================================================*/

function value(id){

    return document
        .getElementById(id)
        .value
        .trim();

}




/*==========================================================
 체크박스 읽기
==========================================================*/

function getCheckedValues(selector){

    return [...document.querySelectorAll(selector + ":checked")]

        .map(item => item.value);

}
/*==========================================================
 Prompt 복사
==========================================================*/

function copyPrompt(){

    const text =
        document
        .getElementById("promptOutput")
        .value;

    if(text.trim()===""){

        alert("먼저 Prompt를 생성하세요.");

        return;

    }

    navigator.clipboard
        .writeText(text)
        .then(()=>{

            alert("Prompt가 복사되었습니다.");

        });

}



/*==========================================================
 JSON 저장
==========================================================*/

function saveJSON(){

    const data = collectFormData();

    const json =
        JSON.stringify(data,null,4);

    const blob =
        new Blob(
            [json],
            {type:"application/json"}
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download = "prompt.json";

    link.click();

    URL.revokeObjectURL(url);

}



/*==========================================================
 JSON 불러오기
==========================================================*/

function loadJSON(){

    document
        .getElementById("jsonFile")
        .click();

}



document

.getElementById("jsonFile")

.addEventListener("change",function(e){

    const file =
        e.target.files[0];

    if(!file) return;

    const reader =
        new FileReader();

    reader.onload=function(event){

        const json =
            JSON.parse(event.target.result);

        restoreFormData(json);

    };

    reader.readAsText(file);

});



/*==========================================================
 입력값 초기화
==========================================================*/

function clearForm(){

    if(!confirm("모든 입력값을 삭제하시겠습니까?")){

        return;

    }

    document
        .querySelectorAll("input,textarea,select")

        .forEach(item=>{

            switch(item.type){

                case "checkbox":

                    item.checked=false;

                    break;

                case "file":

                    item.value="";

                    break;

                default:

                    item.value="";

            }

        });

    document
        .getElementById("promptOutput")
        .value="";

}



/*==========================================================
 Form 데이터 수집
==========================================================*/

function collectFormData(){

    return{

        projectName:value("projectName"),

        aiType:value("aiType"),

        aspectRatio:value("aspectRatio"),

        fps:value("fps"),

        resolution:value("resolution"),

        videoLength:value("videoLength"),

        sceneNumber:value("sceneNumber"),

        sceneDuration:value("sceneDuration"),

        location:value("location"),

        locationDescription:value("locationDescription"),

        time:value("time"),

        weather:value("weather"),

        gender:value("gender"),

        age:value("age"),

        nationality:value("nationality"),

        job:value("job"),

        appearance:value("appearance"),

        outfit:value("outfit"),

        hairStyle:value("hairStyle"),

        accessory:value("accessory"),

        shoes:value("shoes"),

        action:value("action"),

        expression:value("expression"),

        cameraShot:value("cameraShot"),

        cameraAngle:value("cameraAngle"),

        cameraMovement:value("cameraMovement"),

        lens:value("lens"),

        focus:value("focus"),

        lightingType:value("lightingType"),

        lightIntensity:value("lightIntensity"),

        lightDirection:value("lightDirection"),

        lightingDescription:value("lightingDescription"),

        colorGrade:value("colorGrade"),

        composition:value("composition"),

        music:value("music"),

        sfx:value("sfx"),

        mainPrompt:value("mainPrompt"),

        negativePrompt:value("negativePrompt")

    };

}



/*==========================================================
 Form 복원
==========================================================*/

function restoreFormData(data){

    Object.keys(data).forEach(key=>{

        const el =
            document.getElementById(key);

        if(el){

            el.value=data[key];

        }

    });

}



