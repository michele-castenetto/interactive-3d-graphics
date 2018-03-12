(function() {
    

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // renderer.clearColor(0xf0f0f0);
    document.body.appendChild( renderer.domElement);

    scene.background = new THREE.Color( 0xf0f0f0 );

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement);


    // (apertura angolo verticale ?, rapporto width/height, min dist, max dist)
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.lookAt(new THREE.Vector3(0,0,0));
    var controls = new THREE.OrbitControls(camera);

    window.addEventListener( 'resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );




    // #lezione trasformazioni advanced

    
   







    









    




    var engine = new Engine(function() {
        stats.update();
        renderer.render( scene, camera );
    });
    engine.startRenderLoop();


})();