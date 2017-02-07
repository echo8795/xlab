import { Component, OnInit } from '@angular/core';
import { AirtableService } from '../airtable.service';
import { Record } from '../interfaces/record';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ AirtableService]
})

export class DashboardComponent implements OnInit {
  students:Array<any>;
  pythonRecords:Array<any>;
  htmlRecords:Array<any>;
  jsRecords:Array<any>;
  recentPython:Array<Record>;
  recentHtml:Array<Record>;
  recentJs:Array<Record>;
  studentNames:Array<any>;
  exerciseNames:any;
  pythonExercises:Array<any>;
  htmlExercises:Array<any>;
  jsExercises:Array<any>;
  studentSubmissions:any;
  selectedStudent:string;
  showTable:boolean;
  studentExerciseGrid:Object;
  exerciseKeys:Array<string>;


  constructor(private airtableService:AirtableService) { 
    this.exerciseNames={};
    this.showTable=false;
    this.studentExerciseGrid={};
   }
  
  ngOnInit() {
    this.airtableService.getJsExercises().subscribe(records=>this.jsExercises=records,
      (error)=>{},()=>{
        this.Map2(this.jsExercises);
        this.airtableService.getJsSubmissions().subscribe(records=>{
          this.jsRecords=records;
          this.getDictionary(this.jsRecords);
        },
      (error)=>{},()=>this.recentJs=this.findUnique(this.jsRecords));
    });

    this.airtableService.getPythonExercises().subscribe(records=>this.pythonExercises=records,
      (error)=>{},()=> {
        this.Map2(this.pythonExercises);
        this.airtableService.getPythonSubmissions().subscribe(records=> {
          this.pythonRecords=records;
          this.getDictionary(this.pythonRecords);
        },
      (error)=>{},()=>{this.recentPython=this.findUnique(this.pythonRecords);});
      });

    this.airtableService.getStudents().subscribe(records=>this.students=records,(error)=>{},()=>
      { 
        console.log(this.students);
        this.studentNames=this.Map1(this.students);
      });

    this.airtableService.getHtmlExercises().subscribe(records=>this.htmlExercises=records,
      (error)=>{},()=>{
        this.Map2(this.htmlExercises);
        this.airtableService.getHtmlSubmissions().subscribe(records=> {
          this.htmlRecords=records
          this.getDictionary(this.htmlRecords);
      },
      (error)=>{},()=>this.recentHtml=this.findUnique(this.htmlRecords));
      });
  }

  Map1(students:Array<any>):Array<any> {
    let finalMap:Array<any>=[];
    for(let i:number=0; i<students.length; i++) {
      let n=students[i].fields.Name;
      let id=students[i].id;
      finalMap[id]=n;
    }
    return finalMap;
  }

  Map2(students:Array<any>):void {
    for(let i:number=0; i<students.length; i++) {
      let n=students[i].fields.Name;
      let id=students[i].id;
      this.exerciseNames[id]=n;
    }
    this.exerciseKeys = this.getExerciseKeys();
  }

  findUnique(records:Array<any>):Array<any> {
  	let dict={};
  	let finalResult:Array<any>=[];
  	for(let i:number=0;i<records.length; i++) {
  		if(!dict[records[i].fields.Student]) {
  			dict[records[i].fields.Student]=true;
  			let name=this.studentNames[records[i].fields.Student];

  			let time=moment(records[i].fields["Submission Date & Time"]).fromNow(); 
  			let studentId=records[i].fields.Student[0];
        let exerciseName=this.exerciseNames[records[i].fields.Exercise[0]];
  			finalResult.push({	Name:name, Time:time, Id:studentId, ExerciseName:exerciseName});
  		}
  	}
  	return finalResult;
	}

	timeline(id:string,name:string):void {
      this.studentSubmissions=[];
      this.selectedStudent=name;

      for(let i:number=0; i<this.pythonRecords.length; i++) {
        if( id === this.pythonRecords[i].fields.Student[0]) {
          this.studentSubmissions.push(this.pythonRecords[i].fields);
        }
      }

      for(let i:number=0; i<this.htmlRecords.length; i++) {
        if( id === this.htmlRecords[i].fields.Student[0]) {
         this.studentSubmissions.push(this.htmlRecords[i].fields);
        }
      }

      for(let i:number=0; i<this.jsRecords.length; i++) {
        if( id === this.jsRecords[i].fields.Student[0]) {
          this.studentSubmissions.push(this.jsRecords[i].fields);
        }
      }

      this.studentSubmissions.sort( (a:string, b:string):number => {
        let p:Date=new Date((a["Submission Date & Time"]));
        let q:Date=new Date((b["Submission Date & Time"]));
        if (p<q)
          return 1;
        if (p>q)
          return -1;
        return 0;
      });

      for(let i:number=0; i<this.studentSubmissions.length; i++) {
        console.log(this.studentSubmissions[i]["Exercise"]);
        this.studentSubmissions[i]["ExerciseName"]=this.exerciseNames[this.studentSubmissions[i]["Exercise"][0]];
      }  
    }

  toggleTableView() {
    if(this.showTable)
      this.showTable=false;
    else {
      this.showTable=true;
    }
    console.log("eh");
  }

  getDictionary(records:Array<any>):void {

    for (let i=0; i<records.length; i++) {
      let studentName = records[i].fields['Student'][0];
      let exerciseName = records[i].fields['Exercise'][0];
      let approvalSatus = records[i].fields['Approval Status'];

      if (this.studentExerciseGrid[studentName]===undefined) {
        this.studentExerciseGrid[studentName] = {};
      }

      if (this.studentExerciseGrid[studentName][exerciseName]!="approved") {
        if (approvalSatus == undefined)
          approvalSatus = "notapproved";
        else if (approvalSatus == "Yes")
          approvalSatus = "approved";
        else if (approvalSatus == "No")
          approvalSatus = "rejected";

        this.studentExerciseGrid[studentName][exerciseName] = approvalSatus;
      }
    }
  }

  getExerciseKeys(): Array<string> {
    //seqence karke bhejo
    return Object.keys(this.exerciseNames);
  }
}