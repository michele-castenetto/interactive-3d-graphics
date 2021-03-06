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
    


    
    show_esecizio1 = function() {
        camera.position.set(3,4,6);
        camera.lookAt( new THREE.Vector3(0,0,0));
    
        var cube = new THREE.Mesh( 
            new THREE.BoxGeometry(3,3,3),
            new THREE.MeshBasicMaterial( { color: 0xaaaaaa, transparent: true, opacity:0.4 } )
        );
        scene.add(cube);
    
        
        var cylinder_geometry = new THREE.CylinderGeometry(0.5,0.5,5);
        var cylinder_material = new THREE.MeshBasicMaterial( { color: 0xaaaaff });
        var cylinder = new THREE.Mesh(cylinder_geometry, cylinder_material);
        cylinder.matrix.makeRotationAxis( new THREE.Vector3(1,0,1).normalize(), 45*Math.PI/180);
        cylinder.matrixAutoUpdate = false;
        scene.add( cylinder );
    
        Coordinates.drawAllAxes({scene: scene});
        Coordinates.drawGrid({scene: scene});
        // Coordinates.drawGround({scene: scene});

    };



    // avvio esercizio1
    // show_esecizio1();
    // var engine = new Engine(function() {
    //     stats.update();
    //     controls.update();
    //     renderer.render( scene, camera );
    // });
    // engine.startRenderLoop();




    // #esercizio2 sistema solare


    var Planet = (function() {

        var _sphere = new THREE.SphereGeometry(1, 32, 32);
        var _orbit_curve = new THREE.EllipseCurve( 0, 0, 1, 1 );
        var _orbit_points = _orbit_curve.getPoints( 50 );
        var _orbit_geometry = new THREE.BufferGeometry().setFromPoints( _orbit_points );
        var _orbit_material = new THREE.LineBasicMaterial( { color : 0xf0f0f0 } );
        var _orbit = new THREE.Line( _orbit_geometry, _orbit_material ); 
        _orbit.rotation.x = THREE.Math.degToRad(90);

        function Planet(props) {
            props = props || {};
            this.id = props.id || '';
            this.rev_radius = props.rev_radius || 0;
            this.revolution_time = props.revolution_time || 1;
            this.rotation_time = props.rotation_time || 1;
            this.radius = props.radius || 1;
            this.axis_inclination = props.axis_inclination || 0;
            this.color = props.color || 0xf0f0f0;
            

            this.angle_rev = THREE.Math.degToRad(props.angle_offset || 0);
            this.angle_rot = 0;
            this.rev_matrix = new THREE.Matrix4();
            this.rot_matrix = new THREE.Matrix4();
            this.incl_matrix = new THREE.Matrix4();
            this.scale_matrix = new THREE.Matrix4();

            this.father_planet = props.father_planet || null;
            this.planet = new THREE.Mesh(_sphere, new THREE.MeshBasicMaterial({ color: this.color, wireframe: true }));

            var d = new Date();
            this.last_time = d.getTime();

        }

        Planet.prototype.create = function() {
            this.father_planet.add(this.planet);
            var axis = new THREE.Mesh ( new THREE.CylinderGeometry(0.02, 0.02, 2.5 ), new THREE.MeshBasicMaterial({color: 0xf0f0f0}) );
            this.planet.add(axis);
            var orbit = _orbit.clone();
            orbit.scale.set(this.rev_radius, this.rev_radius, this.rev_radius);
            this.father_planet.add(orbit);
        };

        Planet.prototype.update = function() {

            var d = new Date();
            var current_time = d.getTime();
            var elapsed_time = current_time - this.last_time;
            this.last_time = current_time;

            
            var angle_rev = 2*Math.PI * (elapsed_time / this.revolution_time);
            var angle_rot = 2*Math.PI * (elapsed_time / this.rotation_time);


            // ##DEBUG
            // if (this.id === 'earth') {
            //     console.log('elapsed_time', elapsed_time);
            //     console.log('angle_rev', angle_rev);
            // }


            this.angle_rev += angle_rev;
            this.angle_rot += angle_rot;


            if (this.rev_radius === 0) {
                this.rev_matrix.identity();
            } else {
                this.rev_matrix.makeTranslation(this.rev_radius * Math.cos(this.angle_rev), 0, this.rev_radius * Math.sin(this.angle_rev));
            }
            this.incl_matrix.makeRotationAxis(new THREE.Vector3(0, 0, 1), THREE.Math.degToRad(this.axis_inclination));
            this.rot_matrix.makeRotationAxis(new THREE.Vector3(0 ,1, 0), this.angle_rot);
            this.scale_matrix.makeScale(this.radius, this.radius, this.radius);
            this.planet.matrix = this.rev_matrix.multiply(this.incl_matrix).multiply(this.rot_matrix).multiply(this.scale_matrix);
            this.planet.matrixAutoUpdate = false;
        };


        return Planet;
    })();

    var DAY_TIME = 100;
    var planets = [];


    // ##TODO ampliare con oggetto orbita con semiasse maggiore minore e angolo di inclinazione
    // ##TODO saturno con anelli, e satelliti di Giove
    // ##TODO provare a impostare parametri di tempi di rotazione e rivoluzione reali dei vari pianeti


    // ##TODO!! Errore se rev_radius = 0, capire come gestirlo
    var sun = new Planet({
        id: 'sun',
        father_planet: scene,
        rev_radius: 0.1,
        revolution_time: 50 * DAY_TIME,
        rotation_time: 24 * DAY_TIME,
        radius: 2,
        axis_inclination: 0,
        color: 0xffff00
    });
    planets.push(sun);  
    var mercury = new Planet({
        id: 'mercury',
        father_planet: scene,
        rev_radius: 6,
        revolution_time: 200 * DAY_TIME,
        rotation_time: 24 * DAY_TIME,
        radius: 0.6,
        axis_inclination: -6,
        angle_offset: 90,
        color: 0xff4400
    });
    planets.push(mercury);
    var venus = new Planet({
        id: 'venus',
        father_planet: scene,
        rev_radius: 11,
        revolution_time: 200 * DAY_TIME,
        rotation_time: 24 * DAY_TIME,
        radius: 0.9,
        axis_inclination: -15,
        angle_offset: -30,
        color: 0xcc44ee
    });
    planets.push(venus);
    var earth = new Planet({
        id: 'earth',
        father_planet: scene,
        rev_radius: 16,
        revolution_time: 365 * DAY_TIME,
        rotation_time: 24 * DAY_TIME,
        radius: 1,
        axis_inclination: 12,
        color: 0x3cb371
    });
    planets.push(earth);
    var moon = new Planet({
        id: 'moon',
        father_planet: earth.planet,
        rev_radius: 2,
        revolution_time: 20 * DAY_TIME,
        rotation_time: 0.5 * DAY_TIME,
        radius: 0.2,
        axis_inclination: 0,
        angle_offset: 0,
        color: 0x555555
    });
    planets.push(moon);
    var mars = new Planet({
        id: 'mars',
        father_planet: scene,
        rev_radius: 22,
        revolution_time: 400 * DAY_TIME,
        rotation_time: 24 * DAY_TIME,
        radius: 1.3,
        axis_inclination: 14,
        angle_offset: 200,
        color: 0xcc2200
    });
    planets.push(mars);
    var jupiter = new Planet({
        id: 'jupiter',
        father_planet: scene,
        rev_radius: 30,
        revolution_time: 400 * DAY_TIME,
        rotation_time: 24 * DAY_TIME,
        radius: 1.6,
        axis_inclination: 12,
        angle_offset: 110,
        color: 0x7c3f19
    });
    planets.push(jupiter);



    create_solarSystem = function() {

        camera.position.z = 30;
        camera.position.y = 10;
        camera.lookAt(0 ,0 ,0);

        // var plane_geometry = new THREE.PlaneGeometry(40, 40, 20, 20 );
        // var plane_material = new THREE.MeshBasicMaterial( {wireframe:true, color: 0x0000ff, side: THREE.DoubleSide} );
        // var plane = new THREE.Mesh(plane_geometry, plane_material);
        // plane.rotation.x = THREE.Math.degToRad(90);
        // scene.add(plane);

        scene.background = new THREE.Color( 0x114466 );
        planets.forEach(function(p) {
            p.create();
        });
    };
    update_solarSystem = function() {
        planets.forEach(function(p) {
            p.update();
        });
    };



    // #avvio render esercizio 2
    create_solarSystem();    
    var engine = new Engine(function() {
        update_solarSystem();
        stats.update();
        controls.update();
        renderer.render( scene, camera );
    });
    engine.startRenderLoop();




})();