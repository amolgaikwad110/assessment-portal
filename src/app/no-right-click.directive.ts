import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appNoRightClick]'
})
export class NoRightClickDirective {

  @HostListener('contextmenu', ['$event'])
  onRightClick(event: any) {
    event.preventDefault();
  }


  @HostListener('document:keyup', ['$event'])
  public handleKeyboardEvent(event: KeyboardEvent): void {
    const keycode = event.key;

    if (event.altKey ||
      keycode.toLowerCase() == 'alt') {
      debugger;
      event.returnValue = false;
      event.preventDefault();
      return;
    }
  }

  constructor() { }

}
