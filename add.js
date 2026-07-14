/*==========================================================
 Universal AI Prompt Builder Pro
 Version 2.0
 app.js
==========================================================*/

"use strict";

/*==========================================================
 DOM Ready
==========================================================*/

document.addEventListener("DOMContentLoaded", initialize);



/*==========================================================
 Initialize
==========================================================*/

function initialize(){

    bindEvents();

    enableAutoPreview();

    generatePrompt();

}



/*==========================================================
 Event Binding
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
        .addEventListener("click", openJSON);

    document
        .getElementById("clearForm")
        .addEventListener("click", clearForm);

    document
        .getElementById("jsonFile")
        .addEventListener("change", loadJSON);

}



/*==========================================================
 Auto Preview
==========================================================*/

function enableAutoPreview(){

    document

    .querySelectorAll("input, textarea, select")

    .forEach(element=>{

        element.addEventListener("input",generatePrompt);

        element.addEventListener("change",generatePrompt);

    });

}



/*==========================================================
 Generate Prompt
==========================================================*/

function generatePrompt(){

    const data = collectData();

    const prompt = buildPrompt(data);

    document

        .getElementById("promptOutput")

        .value = prompt;

}



/*==========================================================
 Collect Data
==========================================================*/

function collectData(){

    return{

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

        prompt:value("mainPrompt"),

        negative:value("negativePrompt")

    };

}



/*==========================================================
 Value
==========================================================*/

function value(id){

    const element=document.getElementById(id);

    if(!element)return"";

    return element.value.trim();

}



/*==========================================================
 Checked Values
==========================================================*/

function getChecked(className){

    return [...document.querySelectorAll("." + className + ":checked")]

    .map(item=>item.value);

}

/*==========================================================
 Project
==========================================================*/

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



/*==========================================================
 Scene
==========================================================*/

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



/*==========================================================
 Subject
==========================================================*/

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



/*==========================================================
 Camera
==========================================================*/

function getCamera(){

    return{

        shot:value("cameraShot"),

        angle:value("cameraAngle"),

        movement:value("cameraMovement"),

        lens:value("lens"),

        focus:value("focus")

    };

}



/*==========================================================
 Lighting
==========================================================*/

function getLighting(){

    return{

        type:value("lightingType"),

        intensity:value("lightIntensity"),

        direction:value("lightDirection"),

        description:value("lightingDescription")

    };

}



/*==========================================================
 Composition
==========================================================*/

function getComposition(){

    return{

        composition:value("composition"),

        colorGrade:value("colorGrade")

    };

}



/*==========================================================
 Audio
==========================================================*/

function getAudio(){

    return{

        music:value("music"),

        sfx:value("sfx")

    };

}
















