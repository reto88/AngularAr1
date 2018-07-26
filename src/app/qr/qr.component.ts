import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import jsQR from "jsqr";
declare var THREE: any;
declare var THREEx: any;
@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.css']
})
export class QrComponent implements OnInit {

  constructor() { }
  @ViewChild('canvas') canvasRef: ElementRef;
  ngOnInit() {
    const video = document.createElement('video');
    const buttonstop = document.getElementById('stop');
    var canvasElement = this.canvasRef.nativeElement;
   // const canvasElement = document.getElementById('canvas');
    // @ts-ignore: I don't care that it might not be a HTML Canvas Element
    const canvas = canvasElement.getContext('2d');
    const loadingMessage = document.getElementById('loadingMessage');
    const outputContainer = document.getElementById('output');
    const outputMessage = document.getElementById('outputMessage');
    const outputData = document.getElementById('outputData');
    function drawLine(begin, end, color) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment'} }).then(function(stream) {
      video.srcObject = stream;
      stream = stream;
      video.setAttribute('playsinline', 'true'); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    function tick() {
      loadingMessage.innerText = 'Loading video...'
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;


        canvasElement.height = video.videoHeight;


        canvasElement.width = video.videoWidth;


        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);


        const imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        console.log(imageData);
        if (code) {
          console.log(code);
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, '#FF3B58');
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, '#FF3B58');
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, '#FF3B58');
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, '#FF3B58');
          outputMessage.hidden = true;
          outputData.parentElement.hidden = false;
          outputData.innerText = code.data;


        } else {
          outputMessage.hidden = false;
          outputData.parentElement.hidden = true;
        }
      }
      requestAnimationFrame(tick);

    }
  }
}
