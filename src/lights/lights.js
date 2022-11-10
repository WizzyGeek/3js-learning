import * as T3 from 'three';

{
    var scene = new T3.Scene();
    scene.background = new T3.Color(0x888888)
    let fov = 75;
    let aspectRatio =  window.innerWidth / window.innerHeight;
    let nearPlaneDist = 5;
    let farPlaneDist =  20;
    var camera = new T3.PerspectiveCamera(fov, aspectRatio, nearPlaneDist, farPlaneDist);

    var renderer = new T3.WebGLRenderer();
    let updateStyle = true;
    renderer.setSize( window.innerWidth, window.innerHeight, updateStyle);
    document.body.appendChild( renderer.domElement );
}

{
    // var geometry = new T3.TorusKnotGeometry( 4, 2.4552, 44, 7, 10, 12);
    var geometry = new T3.TorusKnotGeometry(4.6, 1.23, 96, 11, 1, 2);
    // var edges = new T3.EdgesGeometry( geometry );
    // var line = new T3.LineSegments( edges, new T3.LineBasicMaterial( { color: 0xffffff } ) );
    let material = new T3.MeshStandardMaterial( {
        color: "#ffffff",
        metalness: 0.6,
        roughness: 0.7
    } );
    var mesh = new T3.Mesh(geometry, material)
    scene.add(mesh);
    // scene.add( line );
    // scene.fog = new T3.Fog({ color: "#ff0000" });

    const light = new T3.DirectionalLight( 0x666666 );
    //const amb = new T3
    // const helper = new T3.DirectionalLightHelper( light );
    // scene.add( helper );
    light.target = mesh;
    light.position.x = 3;
    light.position.y = 3;
    light.position.z = 5;
    scene.add(light);

    camera.position.z = 13;
}

let animate = function() {
    requestAnimationFrame( animate );
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
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