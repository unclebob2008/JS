/* global _sgames, THREE */

"use strict";

_sgames.Breakout = function() {
    
    var scene, camera, controls, renderer;
    var clock = new THREE.Clock();
    var gameW = $("#mainDiv").width();
    var gameH = $("#mainDiv").height();
    var MOVE_SPEED = 30;
    var LOOK_SPEED = 0.05;
    var HERO_H = 5;
    var WORLD_SIZE = 100;
    var WORLD_THICK = 0.5;
    
    init();
    animate();
    
    function init() {
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(60, gameW/gameH, 1, 10000);
        camera.position.y = HERO_H;
        camera.position.x = -(WORLD_SIZE/2 - 5);
        
        controls = new THREE.FirstPersonControls(camera);
        controls.movementSpeed = MOVE_SPEED; // How fast the player can walk around
        controls.lookSpeed = LOOK_SPEED; // How fast the player can look around with the mouse
        controls.lookVertical = false; // Don't allow the player to look up or down. This is a temporary fix to keep people from flying

        var directionalLight1 = new THREE.DirectionalLight(0xF7EFBE, 0.7);
        directionalLight1.position.set(0.5, 1, 0.5);
        scene.add(directionalLight1);
        
        var directionalLight2 = new THREE.DirectionalLight(0xF7EFBE, 0.5);
        directionalLight2.position.set(-0.5, -1, -0.5);
        scene.add(directionalLight2);
        
//        var ambientLight = new THREE.AmbientLight(0xcccccc);
//        scene.add(ambientLight);

        var brick = new THREE.MeshLambertMaterial(
                {map: THREE.ImageUtils.loadTexture('images/brick_bump.jpg')});
        var floor = new THREE.Mesh(new THREE.BoxGeometry(WORLD_SIZE, WORLD_THICK, WORLD_SIZE), brick);
        scene.add(floor);

        var wallF = new THREE.Mesh(new THREE.BoxGeometry(WORLD_THICK, 3*HERO_H, WORLD_SIZE), brick);
        wallF.position.x = WORLD_SIZE/2;
        wallF.position.y = HERO_H;
        scene.add(wallF);

        var wallR = new THREE.Mesh(new THREE.BoxGeometry(WORLD_SIZE, 3*HERO_H, WORLD_THICK), brick);
        wallR.position.z = WORLD_SIZE/2;
        wallR.position.y = HERO_H;
        scene.add(wallR);

        var wallL = new THREE.Mesh(new THREE.BoxGeometry(WORLD_SIZE, 3*HERO_H, WORLD_THICK), brick);
        wallL.position.z = -WORLD_SIZE/2;
        wallL.position.y = HERO_H;
        scene.add(wallL);

        var wallR = new THREE.Mesh(new THREE.BoxGeometry(WORLD_THICK, 3*HERO_H, WORLD_SIZE), brick);
        wallR.position.x = -WORLD_SIZE/2;
        wallR.position.y = HERO_H;
        scene.add(wallR);
        
        renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(0x66ffcc);
        renderer.setSize(gameW, gameH);
        
        $("#mainDiv").append(renderer.domElement);

    }
    
    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
//        if (controls.object.position.z >  WORLD_SIZE/2) controls.moveLeft = false;
//        if (controls.object.position.z < -WORLD_SIZE/2) controls.moveRight = false;
//        if (controls.object.position.x >  WORLD_SIZE/2) controls.moveBackward = false;
//        if (controls.object.position.x < -WORLD_SIZE/2) controls.moveForward = false;
 
        controls.update(clock.getDelta());
        renderer.render(scene, camera);
    }
    
};

_sgames.breakout = new _sgames.Breakout();
