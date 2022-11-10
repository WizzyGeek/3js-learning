import * as T3 from 'three';

{
    var scene = new T3.Scene();
    scene.background = new T3.Color(0x888888)
    let fov = 75;
    let aspectRatio =  window.innerWidth / window.innerHeight;
    let nearPlaneDist = 1;
    let farPlaneDist =  200;
    var camera = new T3.PerspectiveCamera(fov, aspectRatio, nearPlaneDist, farPlaneDist);

    var renderer = new T3.WebGLRenderer();
    let updateStyle = true;
    renderer.setSize( window.innerWidth, window.innerHeight, updateStyle);
    document.body.appendChild( renderer.domElement );
    // camera.setRotationFromQuaternion(new T3.Quaternion(0.035, 0, 0, 0.99));
    camera.position.x = 14;
    camera.position.y = 14;
    camera.position.z = 0;
    camera.lookAt(0, 0, 0);
}

import { GLTFLoader } from 'https://unpkg.com/three@0.145.0/examples/jsm/loaders/GLTFLoader.js';
var loader = new GLTFLoader();
loader.load( './untitled.gltf', function ( gltf )
{
    var gltfs = gltf.scene;
    gltfs.scale.set(2, 2, 2);
    scene.add(gltfs);
} );

let animate = function() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();
// let body = document.getElementsByTagName("body")[0];

// body.addEventListener("resize", (ev) => {console.info(ev)})

window.addEventListener("resize", (ev) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    setTimeout(() => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        //renderer.domElement.style.height = `${window.innerHeight}px`;
        //renderer.domElement.style.width = `${window.innerWidth}px`;
    });
})