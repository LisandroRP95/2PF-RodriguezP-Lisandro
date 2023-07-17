import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessage'
})
export class ControlErrorMessagePipe implements PipeTransform {

  transform(error: {key: string, value: any }, ...args: unknown[]): unknown {
    
    const errorMessages: Record<string, string> = {
 
      required: 'este campo es requerido',
      email: 'El email debe ser valido'

    };

    console.log(error);
    return errorMessages[error.key] || 'Campo invalido';
  }

}
