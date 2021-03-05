import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SecondDependencyService {
  constructor() { }

  start(): void {
      console.log("it's a real second dependency");
  }
}
