// @flow

import highland from 'highland';

import type {
  HighlandStreamT
} from 'highland';


// should error.
const s = highland([1, 2, 3]);
(s:HighlandStreamT<string>);

//should pass.
const n = highland([1, 2, 3]);
(n:HighlandStreamT<number>);

const n2 = n.map(x => x + 's');
(n2:HighlandStreamT<string>);

const n3 = n2.filter(x => x.length > 2);
(n3:HighlandStreamT<string>);

//should error
const g = highland(push => {
  push(null, 1);
});
(g:HighlandStreamT<string>);

//should pass
const g2 = highland(push => {
  push(null, 1);
});
(g2:HighlandStreamT<number>);