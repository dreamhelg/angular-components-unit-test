import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FirstDependencyService } from "../infrastructure/first-dependency.service";

@Component({
  selector: "app-first",
  templateUrl: "./first.component.html",
  styleUrls: ["./first.component.less"]
})
export class FirstComponent implements OnInit {
  @Input() user: User;

  @Output() buttonClicked: EventEmitter<string> = new EventEmitter<string>();

  get userFirstName(): string {
    return this.user.firstName;
  }

  get userSecondName(): string {
    return this.user.secondName;
  }

  get isNameFull(): boolean {
    return !!(this.user.firstName && this.user.secondName);
  }

  constructor(private fd: FirstDependencyService) { }

  ngOnInit(): void {
    this.fd.start();
  }

  sum(a: number, b: number): number {
    return a + b;
  }

  clickOnButton(): void {
    this.buttonClicked.emit(this.user.firstName);
  }
}

export interface User {
  firstName: string;
  secondName: string | undefined;
}

