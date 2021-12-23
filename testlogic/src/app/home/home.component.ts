import { splitAtColon } from '@angular/compiler/src/util';
import { AfterViewInit, Component,ElementRef, OnInit,ViewChild } from '@angular/core';
import * as fs from 'file-saver';
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
  matchar : Array<Array<string>> =  new Array<Array<string>>()
  @ViewChild('canvasEl', {static: false}) canvasEl: ElementRef= {} as ElementRef
  public context: CanvasRenderingContext2D= {} as CanvasRenderingContext2D ;
  row:number=0
  column:number=0
  outputText:string=''

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
    this.row=w
    this.column=h    
    this.canvas = {width:w*10,height:h*10}
    console.log('dibujando canvas')
    let column =[]
    for(let i=0;i<h;i++){
      let row =[]
      for(let j=0;j<w;j++){
        row.push(" ")
      }  
      column.push(row)
    }
    this.matchar = column
    console.log(this.matchar)
  }  
  drawLineText(x1:number,y1:number,x2:number,y2:number,char:string){
    let numberXmin:number= Math.min(x1-1, x2-1)
    let numberYmin:number= Math.min(y1-1, y2-1)
    let deltaX:number= Math.abs(x1-x2)
    let deltaY:number= Math.abs(y1-y2) 
   if(deltaX==0){
      for (let index = numberYmin; index < numberYmin+deltaY+1; index++) {
        this.matchar[index][numberXmin]=char
        
      }
    }
    else if(deltaY==0){
      for (let index = numberXmin; index < numberXmin+deltaX+1; index++) {
        this.matchar[numberYmin][index]=char
      }
    console.log(this.matchar)
    }
  }
  drawLine(x1:number,y1:number,x2:number,y2:number){
    this.drawLineText(x1,y1,x2,y2,'X')
        this.context.lineWidth=10
        this.context.strokeStyle = "#f00";
				this.context.beginPath();
				this.context.moveTo((x1-1)*10, (y1-1)*10);
				this.context.lineTo((x2-1)*10, (y2-1)*10);
				this.context.stroke();
        console.log('draw linea')
  }
  drawRectangle(x1:number,y1:number,x2:number,y2:number){
    this.drawLineText(x1,y1,x1,y2,'X')
    this.drawLineText(x2,y1,x2,y2,'X')
    this.drawLineText(x1,y1,x2,y1,'X')
    this.drawLineText(x1,y2,x2,y2,'X')
    this.context.strokeRect((x1-1)*10,(y1-1)*10,(x2-1)*10,(y2-1)*10);
    console.log('draw rectangulo')
  }
  
  BucketFill(x:number,y:number,char:string){
    let character=this.matchar[y-1][x-1]
    // this.matchar[y-1][x-1]=char
    this.matchar = this.paintFill(this.matchar,y-1,x-1,char)
    
    console.log('rellenando')
  }
  paintFill(grid: Array<Array<string>>, x:number, y:number, newColor:string) {
    let currentVal = grid[x][y];
    grid[x][y] = newColor;
    if (x - 1 >= 0 && grid[x-1][y] === currentVal) {
        this.paintFill(grid, x-1, y, newColor);
    }
    if (x + 1 < grid.length && grid[x + 1][y] === currentVal) {
        this.paintFill(grid, x+1, y, newColor);
    }
    if (y - 1 >= 0 && grid[x][y-1] === currentVal) {
        this.paintFill(grid, x, y-1, newColor);
    }
    if (y + 1 < grid[x].length && grid[x][y+1] === currentVal) {
        this.paintFill(grid, x, y+1, newColor)
    }
    return grid;
}
  fillRecurive(x:number,y:number,char:string,character:string){

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
        this.drawLine(fx[1],fx[2],fx[3],fx[4])}
      else if(fx[0]=='R'){console.log('rectangulo')
      this.drawRectangle(fx[1],fx[2],fx[3],fx[4])
    }
      else if(fx[0]=='B'){
        this.BucketFill(fx[1],fx[2],fx[3])
        console.log('relleno')}
      
    }
 }
 generateOutput(text:any) {
  var data = new Blob([text], { type: 'text/plain;charset=utf-8' });
  fs.saveAs(data, 'output.txt');
};
matrizToString(matriz: Array<Array<string>>){
  let texto=''
  let fila=[]
  for (let index = 0; index < matriz.length; index++) {
    let element = matriz[index].join();
    fila.push(element)
  }
  texto = fila.join('\n')
  return texto
}

}
