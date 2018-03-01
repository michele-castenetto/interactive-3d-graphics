(function() {
    

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement);

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement);


    scene.background = new THREE.Color( 0xf0f0f0 );


    // (apertura angolo verticale ?, rapporto width/height, min dist, max dist)
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(new THREE.Vector3(0,0,0));
    var controls = new THREE.OrbitControls(camera);



    var ambientLight = new THREE.AmbientLight(0xffffff, 10);
    scene.add( ambientLight );

    var pointLight = new THREE.PointLight(0xffffff, 10);
    pointLight.position.y = 6;
    pointLight.decay = 1;
    scene.add( pointLight );



    window.addEventListener( 'resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );







    var geometry = new THREE.BoxGeometry(2, 2, 2);
    // var green_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var green_material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    var green_material = new THREE.MeshPhongMaterial({
        color: 0x00ff00,
        // specular:0xffffff,
        shininess:10,
    });
    var cube = new THREE.Mesh(geometry, green_material);
    scene.add(cube); 

    // var cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    // cube2.position.x = 4;
    // scene.add(cube2); 
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    sphere.position.x = 4;
    scene.add(sphere); 

    // var geometry = new THREE.ConeGeometry( 5, 20, 32 );

    var cone = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), new THREE.MeshBasicMaterial({ color: 0x0000ff }));
    cone.position.x = -4;
    scene.add(cone); 


    var incr = 0;
    var engine = new Engine(function() {

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        incr = incr === 360 ? 0 : incr += 0.01; 
        sphere.position.y = Math.sin(incr);

        cone.scale.x =  1 + Math.abs( 0.5 * Math.sin(incr) );
        cone.scale.z =  1 + Math.abs( 0.5 * Math.sin(incr) );

        stats.update();
        renderer.render( scene, camera );
    });

    engine.startRenderLoop();


    

})();