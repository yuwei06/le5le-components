import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  public constructor() {
  }

  random(len?) {
    let rand = 'xxxxxxxxxxxx'.replace(/[x]/g, function (c) {
      // tslint:disable-next-line:no-bitwise
      let r: number = (Math.random() * 16) | 0;
      // tslint:disable-next-line:no-bitwise
      let v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    return rand.substr(0, len);
  }
}
