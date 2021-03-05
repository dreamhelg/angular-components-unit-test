import { Injectable } from "@angular/core";
import { SecondDependencyService } from "./second-dependency.service";

@Injectable({
  providedIn: "root"
})
export class FirstDependencyService {
  constructor(private sd: SecondDependencyService) { }

  start(): void {
    console.log("it's a real first dependency");
  }

  startSecond(): void {
    this.sd.start();
  }
}
