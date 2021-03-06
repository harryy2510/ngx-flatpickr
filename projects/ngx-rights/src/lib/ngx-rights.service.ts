import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

import * as mm_ from 'multimatch';

const mm = mm_;

export interface PatternRight {
  resource: string;
  values: number[];
}

export interface PatternUserRight {
  userId: string;
  allowed: PatternRight[];
  notAllowed: PatternRight[];
}

export interface PatternUserRightTest {
  resource: string | string[];
  value: number;
}

@Injectable()
export class NgxRightsService {

  private _rights: PatternUserRight;
  public rights: BehaviorSubject<PatternUserRight> = new BehaviorSubject<PatternUserRight>(this._rights);
  private _parsedRights: PatternRight[];

  setRights(rights: PatternUserRight): void {
    if (rights.allowed && rights.notAllowed && rights.userId) {
      this._rights = rights;
      this._parsedRights = [
        ...this._rights.allowed,
        ...this._rights.notAllowed.map((_r: { resource: string | string[]; values: number[] }) => {
          return {
            ..._r,
            resource: `!${_r.resource}`
          }
        })
      ];
      this.rights.next(this._rights);
    }
  }

  public check(_test: PatternUserRightTest) {
    let can = false;
    if (this._rights && _test && _test.resource && _test.value) {
      const rights = this._parsedRights.filter((_r: PatternRight) => _r.values.indexOf(+_test.value) > -1);
      can = !!mm(_test.resource, rights.map(r => r.resource), {nobrace: true}).length;
    }
    return can;
  }
}

