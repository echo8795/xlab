import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';


@Injectable()
export class AirtableService {

	private baseUrl:string;
	private apiKey:string;
  private sortDate:string;
  private sortSequenceNumber:string;
	constructor(private http:Http) {
		console.log("service started");
		this.baseUrl="https://api.airtable.com/v0/apphOVYXkHXl8pOqE/";
		this.apiKey="api_key=keyZCvxOTT9NwpVIi";
    this.sortDate="&sort%5B0%5D%5Bfield%5D=Submission+Date+%26+Time&sort%5B0%5D%5Bdirection%5D=desc";
    this.sortSequenceNumber="&sort%5B0%5D%5Bfield%5D=Sequence+Number&sort%5B0%5D%5Bdirection%5D=desc";

  }
  
  public getStudents() {
    return this.http.get(this.baseUrl+"Students?"+this.apiKey).map(res => res.json().records);
  }

  public getPythonSubmissions() {
  	return this.http
  	.get(this.baseUrl+"Python%20Submissions?"+this.apiKey+this.sortDate)
  	.map(res => res.json().records);
  }

  public getHtmlSubmissions() {
  	return this.http
  	.get(this.baseUrl+"HTML%2FCSS%20Submissions?"+this.apiKey+this.sortDate)
  	.map(res => res.json().records);	
  }

  public getJsSubmissions() {
  	return this.http
  	.get(this.baseUrl+"JS%20Submissions?"+this.apiKey+this.sortDate)
  	.map(res => res.json().records);	
  }

  public getPythonExercises() {
   return this.http
    .get(this.baseUrl+"Python%20Exercises?"+this.apiKey+"&fields%5B%5D=Name"+this.sortSequenceNumber)
    .map(res => res.json().records); 
  }

  public getHtmlExercises() {
   return this.http
    .get(this.baseUrl+"HTML%2FCSS%20Exercises?"+this.apiKey+"&fields%5B%5D=Name"+this.sortSequenceNumber)
    .map(res => res.json().records); 
  }

  public getJsExercises() {
   return this.http
    .get(this.baseUrl+"JS%20Exercises?"+this.apiKey+"&fields%5B%5D=Name"+this.sortSequenceNumber)
    .map(res => res.json().records); 
  }
}
