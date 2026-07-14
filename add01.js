/*==========================================================
 Universal AI Prompt Builder Pro
 Version 2.1
 app.js COMPLETE
==========================================================*/

"use strict";


document.addEventListener(
    "DOMContentLoaded",
    initialize
);



function initialize(){

    bindEvents();

    enableAutoPreview();

    generatePrompt();

}



function bindEvents(){

    document
    .getElementById("generatePrompt")
    .addEventListener(
        "click",
        generatePrompt
    );


    document
    .getElementById("copyPrompt")
    .addEventListener(
        "click",
        copyPrompt
    );


    document
    .getElementById("saveJSON")
    .addEventListener(
        "click",
        saveJSON
    );


    document
    .getElementById("loadJSON")
    .addEventListener(
        "click",
        openJSON
    );


    document
    .getElementById("clearForm")
    .addEventListener(
        "click",
        clearForm
    );


    document
    .getElementById("jsonFile")
    .addEventListener(
        "change",
        loadJSON
    );

}



function enableAutoPreview(){

    document
    .querySelectorAll(
        "input,textarea,select"
    )
    .forEach(
        element=>{

            element.addEventListener(
                "input",
                generatePrompt
            );

            element.addEventListener(
                "change",
                generatePrompt
            );

        }
    );

}





function generatePrompt(){

    const data = collectData();

    const result = buildPrompt(data);


    document
    .getElementById("promptOutput")
    .value = result;

}







function collectData(){

return {

project:getProject(),

scene:getScene(),

subject:getSubject(),

camera:getCamera(),

lighting:getLighting(),

composition:getComposition(),

style:getChecked("styleCheck"),

mood:getChecked("moodCheck"),

quality:getChecked("qualityCheck"),

audio:getAudio(),

mainPrompt:value("mainPrompt"),

negativePrompt:value("negativePrompt")

};

}







function buildPrompt(data){


let prompt=`


MASTER AI VIDEO PROMPT


PROJECT
${data.project.name}


AI ENGINE
${data.project.ai}


FORMAT
Aspect Ratio : ${data.project.aspect}
FPS : ${data.project.fps}
Resolution : ${data.project.resolution}
Duration : ${data.project.duration}s



SCENE

Scene Number :
${data.scene.number}

Location :
${data.scene.location}

Location Description :
${data.scene.locationDescription}

Time :
${data.scene.time}

Weather :
${data.scene.weather}



SUBJECT

Gender :
${data.subject.gender}

Age :
${data.subject.age}

Nationality :
${data.subject.nationality}

Job :
${data.subject.job}

Appearance :
${data.subject.appearance}

Outfit :
${data.subject.outfit}

Hair :
${data.subject.hair}

Accessory :
${data.subject.accessory}

Shoes :
${data.subject.shoes}

Action :
${data.subject.action}

Expression :
${data.subject.expression}



CAMERA

Shot :
${data.camera.shot}

Angle :
${data.camera.angle}

Movement :
${data.camera.movement}

Lens :
${data.camera.lens}

Focus :
${data.camera.focus}



LIGHTING

Type :
${data.lighting.type}

Intensity :
${data.lighting.intensity}

Direction :
${data.lighting.direction}

Description :
${data.lighting.description}



COMPOSITION

${data.composition.composition}

Color Grade :
${data.composition.colorGrade}



STYLE

${data.style.join(", ")}



MOOD

${data.mood.join(", ")}



QUALITY

${data.quality.join(", ")}



AUDIO

Music :
${data.audio.music}

Sound Effects :
${data.audio.sfx}



MAIN CREATIVE IDEA

${data.mainPrompt}



NEGATIVE PROMPT

${data.negativePrompt}


`;

return prompt.trim();

}







function value(id){

const el=document.getElementById(id);

return el ? el.value.trim() : "";

}






function getChecked(className){

return [

...document.querySelectorAll(
"." + className + ":checked"
)

]

.map(
item=>item.value
);

}






function getProject(){

return{

name:value("projectName"),

ai:value("aiType"),

aspect:value("aspectRatio"),

fps:value("fps"),

resolution:value("resolution"),

duration:value("videoDuration")

};

}






function getScene(){

return{

number:value("sceneNumber"),

duration:value("sceneDuration"),

location:value("location"),

locationDescription:value("locationDescription"),

time:value("time"),

weather:value("weather")

};

}






function getSubject(){

return{

gender:value("gender"),

age:value("age"),

nationality:value("nationality"),

job:value("job"),

appearance:value("appearance"),

outfit:value("outfit"),

hair:value("hairStyle"),

accessory:value("accessory"),

shoes:value("shoes"),

action:value("action"),

expression:value("expression")

};

}






function getCamera(){

return{

shot:value("cameraShot"),

angle:value("cameraAngle"),

movement:value("cameraMovement"),

lens:value("lens"),

focus:value("focus")

};

}






function getLighting(){

return{

type:value("lightingType"),

intensity:value("lightIntensity"),

direction:value("lightDirection"),

description:value("lightingDescription")

};

}






function getComposition(){

return{

composition:value("composition"),

colorGrade:value("colorGrade")

};

}






function getAudio(){

return{

music:value("music"),

sfx:value("sfx")

};

}









/* COPY */

function copyPrompt(){

const text =
document.getElementById(
"promptOutput"
).value;


navigator.clipboard.writeText(text);


alert(
"Prompt copied!"
);

}







/* SAVE JSON */

function saveJSON(){


const data=collectData();


const blob=new Blob(

[
JSON.stringify(
data,
null,
2
)
],

{
type:"application/json"
}

);



const url=
URL.createObjectURL(blob);



const a=document.createElement("a");


a.href=url;


a.download=
"AI_Prompt_Project.json";


a.click();


URL.revokeObjectURL(url);


}







function openJSON(){

document
.getElementById("jsonFile")
.click();

}







function loadJSON(event){


const file=
event.target.files[0];


if(!file)return;


const reader=
new FileReader();



reader.onload=function(e){


const data=
JSON.parse(
e.target.result
);



restoreData(data);



generatePrompt();


};



reader.readAsText(file);


}







function restoreData(data){


Object.keys(data)
.forEach(section=>{


if(
typeof data[section]
!=="object"
) return;



Object.keys(data[section])
.forEach(key=>{


const el=
document.getElementById(key);



if(el)
el.value=
data[section][key];


});


});

}








function clearForm(){


document
.querySelectorAll(
"input,textarea"
)
.forEach(
el=>{


if(
el.type==="checkbox"
)
el.checked=false;


else
el.value="";


});


generatePrompt();


}
// vovovo