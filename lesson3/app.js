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







    // #esempio triangolo e quadrato con mesh costruita a mano

    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(new THREE.Vector3(0, 0, 0), 
    //     new THREE.Vector3(2, 0, 0), 
    //     new THREE.Vector3(0, 2, 0),
    //     new THREE.Vector3(2, 2, 0)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(1, 3, 2));


    // // ##NOTA renderizzare entrambe le facce ha costo doppio  
    // // var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
    // var material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.FrontSide});

    // var triangle = new THREE.Mesh(geometry, material);

    // scene.add(triangle);






    // #esempio load di geometria da file .obj
    
    // camera.position.z = 5;

    // var loader = new THREE.ObjectLoader();
    // loader.load('../data/models/tazza/model.obj', function(mesh) {
    //     scene.add(mesh);
    // });
    // ##TODO Far funzionare il loader, confronto con il codice del prof su github ?


    // #esercizio1


    // #esercizio2

    
    // #esercizio3





    
    var engine = new Engine(function() {

        stats.update();
        renderer.render( scene, camera );
    });

    engine.startRenderLoop();


    

})();