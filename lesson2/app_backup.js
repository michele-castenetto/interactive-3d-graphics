(function() {
    

    var scene = new THREE.Scene();
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild( renderer.domElement);

    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement);

    // (apertura angolo verticale ?, rapporto width/height, min dist, max dist)
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    camera.position.y = 2;
    camera.lookAt(new THREE.Vector3(0,0,0));


    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube); 


    var cube2 = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xff0000 }));
    cube2.position.x = 4;
    scene.add(cube2); 



    // var render = function() {
    //     requestAnimationFrame( render );
    //     stats.update();
    //     renderer.render( scene, camera );
    // };
    // render();
    // var _runLoop = false;
    // var _updateFunction = function() {
    //     cube.rotation.x += 0.01;
    //     cube.rotation.y += 0.01;
    //     stats.update();
    //     renderer.render( scene, camera );
    // };
    // var _runFrame = function() {
    //     if (!_runLoop) {
    //         return;
    //     }
    //     requestAnimationFrame( _runFrame );
    //     _updateFunction();
    // };
    // var startRenderLoop = function() {
    //     _runLoop = true;
    //     _runFrame();
    // };
    // var stopRenderLoop = function() {
    //     _runLoop = false;
    // };
    // window.startRenderLoop = startRenderLoop;
    // window.stopRenderLoop = stopRenderLoop;
    // startRenderLoop();



    var Engine = (function() {
        var Engine = function(updateFunction) {
            this._runLoop = false;
            this._updateFunction = updateFunction;
        };
        Engine.prototype._runFrame = function() {
            var _this = this;
            if (!this._runLoop) {
                return;
            }
            requestAnimationFrame( _this._runFrame.bind(_this) );
            this._updateFunction();
        };
        Engine.prototype.startRenderLoop = function() {
            this._runLoop = true;
            this._runFrame();
        };
        Engine.prototype.stopRenderLoop = function() {
            this._runLoop = false;
        };
        return Engine;
    })();

    var incr = 0;
    var engine = new Engine(function() {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        incr = incr === 360 ? 0 : incr += 0.01; 
        cube2.position.y = Math.sin(incr);

        stats.update();
        renderer.render( scene, camera );
    });

    engine.startRenderLoop();


    





})();