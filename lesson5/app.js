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
    camera.lookAt(new THREE.Vector3(0,0,0));
    var controls = new THREE.OrbitControls(camera);

    window.addEventListener( 'resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }, false );




    // #lezione trasformazioni advanced


    // camera.position.z = 10;    
    // camera.position.x = -10;    


    // var cube_node = new THREE.Object3D();
    // cube_node.position.z = 3;
    // scene.add(cube_node);

    // var geometry = new THREE.CubeGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    // var cube = new THREE.Mesh(geometry, material);
    // scene.add(cube);
    
    // var cube2 = cube.clone();
    // cube2.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    // scene.add(cube2);

    // // per eseguire piu operazioni assieme si puo impostare la matrice locale
    // // quella globale invece soolitamente non si puo impostare nelle libreire
    // // im quanto viene calcolata dopo la composizione di altre trasformazioni (e.g. quelle sui nodi genitori e scena)

    // // matrice in row major form
    // cube2.matrix.set(
    //     1, 0, 0, 2,
    //     0, 2, 0, 0,
    //     0, 0, 1, 2,
    //     0, 0, 0, 1
    // );

    // // altrimenti la trasformazione della matrice viene sovrascritta dai valori di scale, rotation e position nel singolo frame
    // cube2.matrixAutoUpdate = false;


    // var cylinder_node = new THREE.Object3D();
    // cylinder_node.position.z = -3;
    // scene.add(cylinder_node);

    // geometry = new THREE.CylinderGeometry(1, 1, 3);
    // material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    // var cylinder = new THREE.Mesh(geometry, material);
    // cylinder_node.add(cylinder); 

    // var cylinder2 = cylinder.clone();
    // cylinder2.material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
    // cylinder_node.add(cylinder2); 

    // var axis = new THREE.Vector3(1, 1, 1);
    // var angle = THREE.Math.degToRad(45);
    // cylinder2.matrix.makeRotationAxis(axis, angle);

    // cylinder2.matrixAutoUpdate = false;

    // window.scene = scene;





    // #esercizio1 rotazioni con matrici
    // vedere lezione a 1:11:22




    // #esercizio2 sistema solare

    camera.position.z = 10;
    // camera.position.y = 5;
    

    var DAY = 1;
    var EARTH_SUN_DISTANCE = 10;


    
    var sphere = new THREE.SphereGeometry(1, 32, 32);

    var sun = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true }));
    sun.scale.set(3, 3, 3);
    scene.add(sun);
    

    var earth = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true }));
    scene.add(earth);


    var position_matrix = new THREE.Matrix4();
    var rotation_matrix = new THREE.Matrix4();
    var earth_angle1 = 0;
    var earth_axis_angle = THREE.Math.degToRad(78);
    var earth_axis = new THREE.Vector3(Math.cos(earth_axis_angle), Math.sin(earth_axis_angle), 0);

    var earth_axis_line = new THREE.Mesh ( new THREE.CylinderGeometry(0.02, 0.02, 2.5 ), new THREE.MeshBasicMaterial({color: 0xff0000}) );
    earth_axis_line.rotation.z = THREE.Math.degToRad(-12);
    earth.add(earth_axis_line);


    earth_axis.normalize();
    var earth_angle2 = 0;
    update_solarSystem = function() {
        earth_angle1 += 0.001;
        earth_angle2 += 0.01;
        position_matrix.makeTranslation(EARTH_SUN_DISTANCE * Math.cos(earth_angle1), 0, EARTH_SUN_DISTANCE * Math.sin(earth_angle1));
        rotation_matrix.makeRotationAxis(earth_axis, earth_angle2);
        earth.matrix = position_matrix.multiply(rotation_matrix);
        earth.matrixAutoUpdate = false;
    };

    





    var engine = new Engine(function() {
        stats.update();
        update_solarSystem();
        renderer.render( scene, camera );
    });
    engine.startRenderLoop();


})();