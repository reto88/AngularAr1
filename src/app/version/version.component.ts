import {Component, OnInit, ViewChild, AfterViewInit, ElementRef,HostListener} from '@angular/core';
import { MeshText2D, textAlign } from 'three-text2d'

import jsQR from "jsqr";
declare var THREE: any;
declare var THREEx: any;
declare var ARController: any;
@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.css']
})
export class VersionComponent implements OnInit {

  constructor() { }
  @ViewChild('canvas') canvasRef: ElementRef;
  title = 'Sali';
  //test = "TEST";
code2;
  @HostListener('click') onClickHandler(e) {
    alert("geilo");
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element

    console.log('clicled parent');
  }
  ngOnInit() {

    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
   // const canvas = document.createElement('canvas');

   const canvas = this.canvasRef.nativeElement;//.getContext('2d');
    // var canvas = document.getElementById('canvas');

    canvas.width  = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    const canvasElement = canvas.getContext('2d');



 /*  var video=document.createElement('video');

    var canvasElement = this.canvasRef.nativeElement;//.getContext('2d');

    const canvas = canvasElement.getContext('2d');

    // var canvas = document.getElementById('canvas');
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    var canvasElement = document.getElementById('myCanvas2');

    var renderer = new THREE.WebGLRenderer({canvas: canvasElement});*/
  // var canvasElement = this.canvasRef.nativeElement;
 /*  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment'} }).then(function(stream) {
      video.srcObject = stream;
      stream = stream;
      video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    }); */

 /*   var video = ARController.getUserMedia({
      maxARVideoSize: 640, // do AR processing on scaled down video of this size
      facing: "environment",
      onSuccess: function(video) {
        console.log('got video', video);
      }
    });*/

    function drawLine(begin, end, color) {
      canvasElement.beginPath();
      canvasElement.moveTo(begin.x, begin.y);
      canvasElement.lineTo(end.x, end.y);
      canvasElement.lineWidth = 4;
      canvasElement.strokeStyle = color;
      canvasElement.stroke();
    }


    function tick() {
    //  loadingMessage.innerText = 'Loading video...'
   //   if (video.readyState === video.HAVE_ENOUGH_DATA) {
       // loadingMessage.hidden = true;
      canvas.hidden = false;
   //     outputContainer.hidden = false;


   //     canvasElement.height = video.videoHeight;


    //    canvasElement.width = video.videoWidth;

//zeichnet video frame
     // canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);

      const canvas2 = arToolkitContext.arController.canvas.getContext('2d');

      const imageData2 = canvas2.getImageData(0, 0,   640, 480);
      const code2 = jsQR(imageData2.data, imageData2.width, imageData2.height);

        const imageData = canvasElement.getImageData(0, 0,   640, 480);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
     //   console.log(arToolkitContext.arController.canvas);
     //console.log(code2);

        if (code2) {
          document.getElementById("demo").innerHTML = code2.data;
          this.test="blabla";code2.data;
          console.log(code2.data);
          /*    drawLine(code2.location.topLeftCorner, code2.location.topRightCorner, '#FF3B58');
          drawLine(code2.location.topRightCorner, code2.location.bottomRightCorner, '#FF3B58');
          drawLine(code2.location.bottomRightCorner, code2.location.bottomLeftCorner, '#FF3B58');
          drawLine(code2.location.bottomLeftCorner, code2.location.topLeftCorner, '#FF3B58');*/
       /*   outputMessage.hidden = true;
          outputData.parentElement.hidden = false;
          outputData.innerText = code.data;*/


        } else {
        /*  outputMessage.hidden = false;
          outputData.parentElement.hidden = true;*/
        }
      }
      requestAnimationFrame(tick);

   // }

    //////////////////////////////////////////////////////////////////////////////////
    //		Init
    //////////////////////////////////////////////////////////////////////////////////
    // init renderer
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    // var renderer = new THREE.WebGLRenderer( { canvas: 'canvas' } );
    var renderer	= new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize( 640, 480 );
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild( renderer.domElement );
    // array of functions for the rendering loop
    var onRenderFcts= [];
    // init scene and camera
    var scene	= new THREE.Scene();
    var width = window.innerWidth, height =  window.innerHeight;
    console.log(width+"__hight"+height);
    //////////////////////////////////////////////////////////////////////////////////
    //		Initialize a basic camera
    //////////////////////////////////////////////////////////////////////////////////
    // Create a camera
    var camera = new THREE.Camera();
    scene.add(camera);
    ////////////////////////////////////////////////////////////////////////////////
    //          handle arToolkitSource
    ////////////////////////////////////////////////////////////////////////////////
    var arToolkitSource = new THREEx.ArToolkitSource({
      // to read from the webcam
      sourceType : 'webcam',
// resolution of at which we initialize the source image

      // // to read from an image
      // sourceType : 'image',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/images/img.jpg',
      // to read from a video
      // sourceType : 'video',
      // sourceUrl : THREEx.ArToolkitContext.baseURL + '../data/videos/headtracking.mp4',
    })
    arToolkitSource.init(function onReady(){
      onResize()
    })

    // handle resize
    window.addEventListener('resize', function(){
      onResize()
    })
    function onResize(){
      arToolkitSource.onResize()
      arToolkitSource.copySizeTo(renderer.domElement)
      if( arToolkitContext.arController !== null ){
        arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
      }
    }
    // handle resize
    window.addEventListener('click', function(){
      //alert("clicked");
      onButtonClick(event);
    })
    var buttons = document.getElementsByTagName("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", onButtonClick, false);
    };

    function onButtonClick(event) {
      var x = location.href;

      //alert(event.target.id+ "uuuuu" +x);
     // document.location.reload();
    }
    ////////////////////////////////////////////////////////////////////////////////
    //          initialize arToolkitContext
    ////////////////////////////////////////////////////////////////////////////////

    // create atToolkitContext
    var arToolkitContext = new THREEx.ArToolkitContext({
      cameraParametersUrl: THREEx.ArToolkitContext.baseURL + '../data/data/camera_para.dat',
      detectionMode: 'mono',
    })
    // initialize it
    arToolkitContext.init(function onCompleted(){
      // copy projection matrix to camera
      camera.projectionMatrix.copy( arToolkitContext.getProjectionMatrix() );
    })
    // update artoolkit on every frame
    onRenderFcts.push(function(){
      if( arToolkitSource.ready === false )	return
      arToolkitContext.update( arToolkitSource.domElement )

      // update scene.visible if the marker is seen
      scene.visible = camera.visible
    })

    ////////////////////////////////////////////////////////////////////////////////
    //          Create a ArMarkerControls
    ////////////////////////////////////////////////////////////////////////////////

    // init controls for camera
    var markerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
      type : 'pattern',
      patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.hiro',
      // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
      // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
      changeMatrixMode: 'cameraTransformMatrix'
    })
    // as we do changeMatrixMode: 'cameraTransformMatrix', start with invisible scene
    scene.visible = false




 ////////////////////////////////////////////////////////
    //		add an object in the scene
    //////////////////////////////////////////////////////////////////////////////////
    // add a torus knot
  var geometry	= new THREE.CubeGeometry(1,1,1);
    var material	= new THREE.MeshNormalMaterial({
      transparent : true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.position.y	= geometry.parameters.height/2
    scene.add( mesh );

    var geometry	= new THREE.TorusKnotGeometry(0.3,0.1,64,16);
    var material	= new THREE.MeshNormalMaterial();
    var mesh	= new THREE.Mesh( geometry, material );
    mesh.position.y	= 0.5
    scene.add( mesh );
    onRenderFcts.push(function(delta){
      mesh.rotation.x += Math.PI*delta
    })
    //////////////////////////////////////////////////////////////////////////////////
    //		render the whole thing on the page
    //////////////////////////////////////////////////////////////////////////////////
    // render the scene
    onRenderFcts.push(function(){
      requestAnimationFrame(tick);
      renderer.render( scene, camera );
    })
    // run the rendering loop
    var lastTimeMsec= null
    requestAnimationFrame(function animate(nowMsec){
      // keep looping

      requestAnimationFrame( animate );
      // measure time
      lastTimeMsec	= lastTimeMsec || nowMsec-1000/60
      var deltaMsec	= Math.min(200, nowMsec - lastTimeMsec)
      lastTimeMsec	= nowMsec
      // call each update function
      onRenderFcts.forEach(function(onRenderFct){
        onRenderFct(deltaMsec/1000, nowMsec/1000)
      })
    })
  }

}

