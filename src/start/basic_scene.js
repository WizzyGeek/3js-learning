{
    var scene = new THREE.Scene();
    let fov = 75;
    let aspectRatio =  window.innerWidth / window.innerHeight;
    let nearPlaneDist = 0.1;
    let farPlaneDist =  1000;
    var camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearPlaneDist, farPlaneDist);

    var renderer = new THREE.WebGLRenderer();
    let updateStyle = true;
    renderer.setSize( window.innerWidth, window.innerHeight, updateStyle);
    document.body.appendChild( renderer.domElement );
}

{
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial( {color: "#22222f"} );

    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 2
}

let animate = function() {
    cube.rotation.x += Math.random() * 0.01;
    cube.rotation.y += Math.random() * 0.01;
    cube.rotation.z += Math.random() * 0.01;

    requestAnimationFrame( animate );
    renderer.render( scene, camera );
}
animate();