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



    // #esercizio1 disegnare cubo

    // camera.position.z = 5;

    // var geometry;
    // var material;
    // var face;
    
    // // front
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(0, 0, 1), 
    //     new THREE.Vector3(1, 0, 1), 
    //     new THREE.Vector3(1, 1, 1),
    //     new THREE.Vector3(0, 1, 1)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    // material = new THREE.MeshBasicMaterial({color: 0xff0000, side: THREE.FrontSide});
    // face = new THREE.Mesh(geometry, material);
    // scene.add(face);

    // // back
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(1, 0, 0), 
    //     new THREE.Vector3(0, 0, 0), 
    //     new THREE.Vector3(0, 1, 0),
    //     new THREE.Vector3(1, 1, 0)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    // material = new THREE.MeshBasicMaterial({color: 0xff8800, side: THREE.FrontSide});
    // face = new THREE.Mesh(geometry, material);
    // scene.add(face);

    // // left
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(0, 0, 0), 
    //     new THREE.Vector3(0, 0, 1), 
    //     new THREE.Vector3(0, 1, 1),
    //     new THREE.Vector3(0, 1, 0)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    // material = new THREE.MeshBasicMaterial({color: 0x0000ff, side: THREE.FrontSide});
    // face = new THREE.Mesh(geometry, material);
    // scene.add(face);

    // // right
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(1, 0, 1), 
    //     new THREE.Vector3(1, 0, 0), 
    //     new THREE.Vector3(1, 1, 0),
    //     new THREE.Vector3(1, 1, 1)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    // material = new THREE.MeshBasicMaterial({color: 0x0088ff, side: THREE.FrontSide});
    // face = new THREE.Mesh(geometry, material);
    // scene.add(face);

    // // top
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(0, 1, 0), 
    //     new THREE.Vector3(0, 1, 1), 
    //     new THREE.Vector3(1, 1, 1),
    //     new THREE.Vector3(1, 1, 0)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    // material = new THREE.MeshBasicMaterial({color: 0x00ff00, side: THREE.FrontSide});
    // face = new THREE.Mesh(geometry, material);
    // scene.add(face);

    // // bottom
    // geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     new THREE.Vector3(0, 0, 1), 
    //     new THREE.Vector3(0, 0, 0), 
    //     new THREE.Vector3(1, 0, 0),
    //     new THREE.Vector3(1, 0, 1)
    // );
    // geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));
    // material = new THREE.MeshBasicMaterial({color: 0x00ff88, side: THREE.FrontSide});
    // face = new THREE.Mesh(geometry, material);
    // scene.add(face);





    // #esercizio2 ottedro wireframe


    // var geometry = new THREE.Geometry();
    // geometry.vertices.push(
    //     (new THREE.Vector3(-1, 0, 1)).normalize(), 
    //     (new THREE.Vector3(1, 0, 1)).normalize(), 
    //     (new THREE.Vector3(1, 0, -1)).normalize(), 
    //     (new THREE.Vector3(-1, 0, -1)).normalize(),
    //     (new THREE.Vector3(0, 1, 0)).normalize(),
    //     (new THREE.Vector3(0, -1, 0)).normalize()
    // );
    // geometry.faces.push(
    //     new THREE.Face3(0, 1, 4), 
    //     new THREE.Face3(1, 2, 4),
    //     new THREE.Face3(2, 3, 4),
    //     new THREE.Face3(3, 0, 4),
    //     new THREE.Face3(1, 0, 5),
    //     new THREE.Face3(2, 1, 5),
    //     new THREE.Face3(3, 2, 5),
    //     new THREE.Face3(0, 3, 5)
    // );
    // var material = new THREE.MeshBasicMaterial({wireframe: true, color: 0x666666, side: THREE.FrontSide});
    // var octaedron = new THREE.Mesh(geometry, material);
    // scene.add(octaedron);


    // var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({wireframe: true, color: 0xff0000 }));
    // scene.add(sphere); 
    


    // #esercizio3 geometria sfera
    
    var sphereGeometryGenerationStep = function(geometry) {

        var step_geometry = new THREE.Geometry();

        geometry.faces.forEach(function(face, index) {

            var v1 = geometry.vertices[face.a].clone();
            var v2 = geometry.vertices[face.b].clone();
            var v3 = geometry.vertices[face.c].clone();

            var m1 = v1.clone().add(v2).divideScalar(2);
            var m2 = v2.clone().add(v3).divideScalar(2);
            var m3 = v3.clone().add(v1).divideScalar(2);

            step_geometry.vertices.push(
                v1.normalize(),
                v2.normalize(),
                v3.normalize(),
                m1.normalize(),
                m2.normalize(),
                m3.normalize()
            );

            // step_faces.push(new THREE.Face3(m3, v1, m1));
            // step_faces.push(new THREE.Face3(m1, v2, m2));
            // step_faces.push(new THREE.Face3(m2, v3, m3));
            // step_faces.push(new THREE.Face3(m1, m2, m3));
            step_geometry.faces.push(
                new THREE.Face3(5 + index * 6 , 0 + index * 6, 3 + index * 6),
                new THREE.Face3(3 + index * 6, 1 + index * 6, 4 + index * 6),
                new THREE.Face3(4 + index * 6, 2 + index * 6, 5 + index * 6),
                new THREE.Face3(3 + index * 6, 4 + index * 6, 5 + index * 6)
            );

        });

        return step_geometry;
    };


    var generateSphereGeometry = function(steps) {

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            (new THREE.Vector3(-1, 0, 1)).normalize(), 
            (new THREE.Vector3(1, 0, 1)).normalize(), 
            (new THREE.Vector3(1, 0, -1)).normalize(), 
            (new THREE.Vector3(-1, 0, -1)).normalize(),
            (new THREE.Vector3(0, 1, 0)).normalize(),
            (new THREE.Vector3(0, -1, 0)).normalize()
        );
        geometry.faces.push(
            new THREE.Face3(0, 1, 4), 
            new THREE.Face3(1, 2, 4),
            new THREE.Face3(2, 3, 4),
            new THREE.Face3(3, 0, 4),
            new THREE.Face3(1, 0, 5),
            new THREE.Face3(2, 1, 5),
            new THREE.Face3(3, 2, 5),
            new THREE.Face3(0, 3, 5)
        );

        for (var i = 1; i <= steps; i++) {
            geometry = sphereGeometryGenerationStep(geometry);
        }
        
        return geometry;

    };

    var geometry = generateSphereGeometry(2);

    var material = new THREE.MeshBasicMaterial({wireframe: true, color: 0x660000, side: THREE.FrontSide});
    // var material = new THREE.MeshBasicMaterial({color: 0x666666, side: THREE.DoubleSide});
    var sphere = new THREE.Mesh(geometry, material);

    scene.add(sphere);

    

    







    
    var engine = new Engine(function() {

        stats.update();
        renderer.render( scene, camera );
    });

    engine.startRenderLoop();


    

})();