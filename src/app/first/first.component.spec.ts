import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FirstComponent } from "./first.component";
import { By } from "@angular/platform-browser";
import { FirstDependencyService } from "../infrastructure/first-dependency.service";

describe("FirstComponent", () => {
  let component: FirstComponent;
  let fixture: ComponentFixture<FirstComponent>;

  const fakeFirstDependencyService = jasmine.createSpyObj("fakeFirstDep", ["start"]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FirstComponent ],
      providers: [{
        provide: FirstDependencyService, useValue: fakeFirstDependencyService
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstComponent);
    component = fixture.componentInstance;
    fakeFirstDependencyService.start.and.callFake(() => console.log("it's a fake dependency"));

    component.user = {
      firstName: "John",
      secondName: "Weak"
    };

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("Комопнент выводит имя и фамилию через инпут", () => {
    component.user = {
      firstName: "John",
      secondName: "Doe"
    };
    expect(component.userFirstName).toBe("John");
    expect(component.userSecondName).toBe("Doe");
  });

  it("Метод sum возвращает сумму", () => {
    const result = component.sum(1, 2);
    expect(result).toBe(3);
  });

  it("Компонент должен отправлять событие клика с имененм пользователя", () => {
    const event = spyOn(component.buttonClicked, "emit");
    component.user = {
      firstName: "Lisa",
      secondName: "Pavlova"
    };

    component.clickOnButton();
    expect(event).toHaveBeenCalledWith("Lisa");
  });

  it("Компонент должен отправлять событие, по клику на кнопку в шаблоне", () => {
    const event = spyOn(component.buttonClicked, "emit");
    const button = fixture.debugElement.query(By.css("button"));
    event.calls.reset();
    button.nativeElement.click();
    expect(event).toHaveBeenCalledWith("John");
  });

  it("Компонент добавляет класс fill, если заполнены имя и фамилия", () => {
    const newUser = {
      firstName: "Olga",
      secondName: undefined
    };
    component.user = newUser;
    fixture.detectChanges();

    const firstSpan = fixture.debugElement.query(By.css("span.fill"));
    expect(firstSpan).toBeNull();
  });
});
