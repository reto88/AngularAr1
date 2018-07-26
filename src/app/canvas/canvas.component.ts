import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';

declare var THREE: any;
@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }
  @ViewChild('myCanvas') canvasRef: ElementRef;
  ngOnInit() {

    function onResize(element, callback) {
      var height = element.clientHeight;
      var width  = element.clientWidth;

      return setInterval(function() {
        if (element.clientHeight != height || element.clientWidth != width) {
          height = element.clientHeight;
          width  = element.clientWidth;
          callback();
        }
      }, 500);
    }
    var canvas = this.canvasRef.nativeElement;//.getContext('2d');
   // var canvas = document.getElementById('canvas');

    var renderer = new THREE.WebGLRenderer({canvas: canvas});
    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000);
    camera.position.z = 3;
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshPhongMaterial({ color: 0x1C4A8C });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    var light = new THREE.DirectionalLight(0xffffff, 0.55);
    light.position.set(0, 0, 1);
    scene.add(light);

    onResize(canvas, function () {
      canvas.width  = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      renderer.setViewport(0, 0, canvas.clientWidth, canvas.clientHeight);
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    });
    var render = function () {
      requestAnimationFrame( render );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    render();







  }

}
