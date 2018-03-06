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




    // #lezione trasformazioni


    // var cylinder_geometry = new THREE.CylinderGeometry(0.3, 0.3, 3);
    // var cylinder_material = new THREE.MeshBasicMaterial({color: 0xff0000});
    // var cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);

    // scene.add(cylinder);



    // #section traslazione
    // cylinder.position.x += 2;
    // non funziona! questo perchè per questioni di performance position è immutabile
    // cylinder.position = new THREE.Vector3(2, 0, 0);
    // va utilizzato il metodo position.set
    // cylinder.position.set(2, 0,0 );


    // #section rotazione
    // cylinder.rotation.z = Math.PI * 30 / 180;


    // #section scalatura
    // cylinder.scale.set(2, 1, 2);
    // ##NOTA le scalature non uniformi sono delicate perche cambiano le normali
    // a meno che non si adottino accorgimenti particolari


    // #section composizione trasformazioni 


    // composizione1
    // cylinder.position.set(0, 2, 0);
    // cylinder.rotation.z = Math.PI * 90 / 180;

    // composizione2
    // cylinder.rotation.z = Math.PI * 90 / 180;
    // cylinder.position.set(0, 2, 0);

    // le due danno lo stesso risultato perchè nella composizione si segue l'ordine
    // TRS (translate rotate scale, ordine di composizione tra funzioni quindi letto all'inverso)


    // Si possono effettuare le operazioni in ordine diverso attribuendo un nodo padre 
    // al cilindro e per esempio effettuando la rotazione su di lui

    // var pivot = new THREE.Object3D();
    // scene.add(pivot);
    // pivot.rotation.z = 90 * Math.PI/180;

    // var cylinder_geometry = new THREE.CylinderGeometry(0.3, 0.3, 3);
    // var cylinder_material = new THREE.MeshBasicMaterial({color: 0xff0000});
    // var cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);

    // pivot.add(cylinder);
    // cylinder.position.set(0, 2, 0);

    // ##NOTA Da questo emerge che non conta in che ordine vengono scritte come codice le operazioni!!
    


    
    // #esercizio disegno fiore




    
    var engine = new Engine(function() {

        stats.update();
        renderer.render( scene, camera );
    });

    engine.startRenderLoop();


    

})();