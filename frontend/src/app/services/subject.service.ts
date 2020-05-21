import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject} from "../models/subject.model";

@Injectable()
export class SubjectService {
  private baseUrl: string = '/api/subjects';

  constructor(private http: HttpClient) {
  }

  public getSubjectByTeacherId(teacherId: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl + "?teacherId=" + teacherId);
  }

  public getSubjectByStudentId(studentId: string): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl + "/student/" + studentId);
  }

  public createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.baseUrl, subject);
  }

  public updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(this.baseUrl, subject);
  }

  public deleteSubject(subjectId: string){
    return this.http.delete(this.baseUrl + "/" + subjectId);
  }

}
