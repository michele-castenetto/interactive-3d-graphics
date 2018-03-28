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




    // #lezione shaders


    camera.position.z = 10;    
    camera.position.y = 10;    
    camera.lookAt(0 ,0 ,0);


    // #esempio1

    // var uniforms = {
    //     "materialColor": { type: "v3", value: new THREE.Vector3() }
    // };
       
    // var v_shader = document.getElementById("s_vertex_1").textContent;
    // var f_shader = document.getElementById("s_fragment_1").textContent;
    
    // uniforms.materialColor.value = new THREE.Vector3(1.0,0.0,0.0);
    
    // var sphereMaterial = new THREE.ShaderMaterial({ 
    //     uniforms: uniforms,
    //     vertexShader: v_shader,
    //     fragmentShader: f_shader 
    // });
    
    // sphere = new THREE.Mesh(new THREE.SphereGeometry(2, 32, 16), sphereMaterial);
    
    // scene.add( sphere );

    // #esempio2

    // var vs = document.getElementById("s_vertex_2").textContent;
    // var fs = document.getElementById("s_fragment_2").textContent;
    
    // var sphereMaterial = new THREE.ShaderMaterial({ 
    //     vertexShader: vs,
    //     fragmentShader: fs 
    // });
    
    // var sphere = new THREE.Mesh( new THREE.SphereBufferGeometry(2, 32, 16), sphereMaterial);
    
    // var displacement = new Float32Array( sphere.geometry.attributes.position.count );
    
    // displacement = displacement.map(function(item) {
    //     return Math.random() * 10;
    // });

    
    // sphere.geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1));

    // scene.add( sphere );


    // #esercizio1
    // sfera con displacement and amplitude per modificare la posizione dei vertici nel vertex shader


    var uniforms;
    show_esecizio1 = function() {

        uniforms = {
            amplitude: { 
                type: "float", 
                value: 0 
            }
        };

        var vs = document.getElementById("s_vertex_3").textContent;
        var fs = document.getElementById("s_fragment_3").textContent;
        
        var sphereMaterial = new THREE.ShaderMaterial({ 
            uniforms: uniforms,
            vertexShader: vs,
            fragmentShader: fs 
        });
        
        var sphere = new THREE.Mesh( new THREE.SphereBufferGeometry(2, 32, 16), sphereMaterial);
        
        var displacement = new Float32Array( sphere.geometry.attributes.position.count );
        
        // displacement = displacement.map(function(item) {
        //     return Math.random();
        // });

        noise.seed(Math.random());
        displacement = displacement.map(function(item, index) {
            return noise.perlin2(Math.random()/5, Math.random()/5);
        });


        
        
        sphere.geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1));

        scene.add( sphere );


    };


    var _animate = function() {
        var d = new Date(); 
        var time = d.getTime();
        
        // uniforms.amplitude.value = 3 * Math.sin(time/1000);
        uniforms.amplitude.value = 3 * Math.sin( Date.now()/1000 );
    };



    show_esecizio1();
    var engine = new Engine(function() {
        _animate();
        stats.update();
        controls.update();
        renderer.render( scene, camera );
    });
    engine.startRenderLoop();



    // #esercizio2
    // esercizio per lavorare con le normali nel fragment shader


    show_esecizio2 = function() {
    
        var uniforms = {
            amplitude: { 
                type: "float", 
                value: 0 
            }
        };

        var vs = document.getElementById("s_vertex_4").textContent;
        var fs = document.getElementById("s_fragment_4").textContent;
        
        var sphereMaterial = new THREE.ShaderMaterial({ 
            uniforms: uniforms,
            vertexShader: vs,
            fragmentShader: fs 
        });
        
        var sphere = new THREE.Mesh( new THREE.SphereBufferGeometry(2, 32, 16), sphereMaterial);
        
        var displacement = new Float32Array( sphere.geometry.attributes.position.count );
        
        displacement = displacement.map(function(item) {
            return Math.random();
        });

        
        sphere.geometry.addAttribute('displacement', new THREE.BufferAttribute(displacement, 1));

        scene.add( sphere );
    };

    // show_esecizio2();
    // var engine = new Engine(function() {
    //     stats.update();
    //     controls.update();
    //     renderer.render( scene, camera );
    // });
    // engine.startRenderLoop();

    


})();