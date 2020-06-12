import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Journal} from "../models/journal.model";

@Injectable()
export class JournalService {
  private baseUrl: string = '/api/journal';

  constructor(private http: HttpClient) {
  }

  public getJournalBySubjectId(subjectId: string): Observable<Journal[]> {
    return this.http.get<Journal[]>(this.baseUrl + "?subjectId=" + subjectId);
  }


  public updateJournal(journal: Journal): Observable<Journal> {
    return this.http.put<Journal>(this.baseUrl, journal);
  }

  public createJournal(journal: Journal): Observable<Journal> {
    return this.http.post<Journal>(this.baseUrl, journal);
  }

  public delete(subject: string, date: string): Observable<Journal[]> {
    return this.http.delete<Journal[]>(this.baseUrl + "/subject/" + subject + "/date/" + date);
  }

}
