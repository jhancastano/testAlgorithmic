import { splitAtColon } from '@angular/compiler/src/util';
import { AfterViewInit, Component,ElementRef, OnInit,ViewChild } from '@angular/core';
interface canvas{
  width:number,
  height:number
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements  AfterViewInit {
  canvas:canvas={width:0,height:0}
  file:any;
  cadenaText:any=''
  arrayText:any=[]
  @ViewChild('canvasEl', {static: false}) canvasEl: ElementRef= {} as ElementRef
  public context: CanvasRenderingContext2D= {} as CanvasRenderingContext2D ;
  



fileChanged(e:any) {
    this.file = e.target.files[0];
    this.uploadDocument(this.file)
}
  constructor( ) { 
    // this.context = this.canvasEl.nativeElement.getContext('2d')
  }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    this.context = this.canvasEl.nativeElement.getContext('2d')
  }


  createCanvas(w:number,h:number){
    this.canvas = {width:w*10,height:h*10}
    console.log('dibujando canvas')
  }  
  drawLine(x1:number,y1:number,x2:number,y2:number){
    
    this.context.lineWidth=3
        this.context.strokeStyle = "#f00";
				this.context.beginPath();
				this.context.moveTo(x1*10, y1*10);
				this.context.lineTo(x2*10, y2*10);
				this.context.stroke();
    
    
  }
  drawRectangle(x1:number,y1:number,x2:number,y2:number){
    this.context.strokeRect(x1*10,y1*10,x2*10,y2*10);
    console.log('draw rectangulo')
  }

  uploadDocument(file:any) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      console.log(e)
      console.log(fileReader.result);
      this.cadenaText = fileReader.result
    }
    fileReader.readAsText(this.file);
}

 dibujar(){
   console.log(this.cadenaText)
    this.arrayText= this.cadenaText.split('\n')
    console.log(this.arrayText)
    for (let index = 0; index < this.arrayText.length; index++) {
      const fx=this.arrayText[index].split(' ')
      console.log(this.arrayText[index])
      console.log(fx)
      if(fx[0]=='C'){
        this.createCanvas(fx[1],fx[2])
        console.log('canvas')}
      else if(fx[0]=='L'){
        this.drawLine(fx[1],fx[2],fx[3],fx[4])
        console.log('linea')}
      else if(fx[0]=='R'){console.log('rectangulo')
      this.drawRectangle(fx[1],fx[2],fx[3],fx[4])
    }
      else if(fx[0]=='B'){console.log('relleno')}
      
    }
 }
}
