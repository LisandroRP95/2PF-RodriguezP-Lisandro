import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTitleSize]'
})
export class TitleSizeDirective {

  constructor(private elementRef: ElementRef, private renderer2: Renderer2) {
    console.log(this.elementRef);

    this.renderer2.setStyle(
      this.elementRef.nativeElement,
      'font-size',
      '50px'
      );
  }
}
