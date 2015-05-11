/* global _sgames, THREE */

"use strict";

_sgames.Breakout = function() {
    
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 45, 600 / 400, 0.1, 1000 );
    
    var pointLight =
    new THREE.PointLight(0xFFFFFF);

// set its position
    pointLight.position.x = 5
    pointLight.position.y = 10;
    pointLight.position.z = 10;

// add to the scene
    scene.add(pointLight);
    
//   scene.add(camera);
    camera.position.z = 8;

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( 600, 400 );
    $("#mainDiv").append(renderer.domElement);
    

    var boxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
    
    var cubeMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var sphereMaterial = new THREE.MeshBasicMaterial({color: 0xcc0000});

    var cube = new THREE.Mesh( boxGeometry, cubeMaterial );
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 0.1, 0.1),
        sphereMaterial);
    
    sphere.position.x = -1.5;
    cube.position.x = 1.5;
 
    scene.add(sphere);
    scene.add(cube);

    
    function render() {
	requestAnimationFrame( render );
//        cube.rotation.x += 0.01;
//        cube.rotation.y += 0.01;
	renderer.render( scene, camera );
    }
    render();
 
};

_sgames.breakout = new _sgames.Breakout();
