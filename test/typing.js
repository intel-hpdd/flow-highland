// @flow

import highland from 'highland';

import { Readable, Writable, Duplex } from 'stream';

import type { HighlandStreamT } from 'highland';

// $ExpectError
const s = highland([1, 2, 3]);
(s: HighlandStreamT<string>);

const n = highland([1, 2, 3]).onDestroy(() => {});
(n: HighlandStreamT<number>);

const n2 = n.map(x => x + 's');
(n2: HighlandStreamT<string>);

(n: HighlandStreamT<number>);

const n3 = n2.filter(x => x.length > 2);
(n3: HighlandStreamT<string>);

const g = highland(push => {
  // $ExpectError
  push(null, 1);
});
(g: HighlandStreamT<string>);

const g2 = highland(push => {
  push(null, 1);
});
(g2: HighlandStreamT<number>);

const s3 = highland([[1, 2, 3]]).flatten();

(s3: HighlandStreamT<number>);

const s4 = highland.map(x => x + 1);

(s4: (xs: HighlandStreamT<number>) => HighlandStreamT<number>);

const s5 = highland.filter(x => x != null);

(s5: (xs: HighlandStreamT<number>) => HighlandStreamT<number>);

const zipper1 = highland([[{ name: 'John Doe' }, { name: 'Jane Doe' }]]).zip([
  [{ id: 1 }, { id: 2 }]
]);
(zipper1: HighlandStreamT<[{ name: string }[], { id: number }[]]>);

const zipper2 = highland([{ name: 'John Doe' }, { name: 'Jane Doe' }]).zip([
  { id: 1 },
  { id: 2 }
]);
(zipper2: HighlandStreamT<[{ name: string }, { id: number }]>);

const zipper3 = highland([[{ name: 'John Doe' }, { name: 'Jane Doe' }]]).zip([
  { id: 1 },
  { id: 2 }
]);
(zipper3: HighlandStreamT<[{ name: string }[], { id: number }]>);

const zipper4 = highland([{ name: 'John Doe' }, { name: 'Jane Doe' }]).zip([
  [{ id: 1 }, { id: 2 }]
]);
(zipper4: HighlandStreamT<[{ name: string }, { id: number }[]]>);

const parallel = highland([
  highland(['1', '2']),
  highland(['3', '4'])
]).parallel(2);
(parallel: HighlandStreamT<string>);

const readable = new Readable();
(readable: Readable);

const writable = new Writable();
(writable: Writable);

const duplex = new Duplex();
(duplex: Duplex);

const otherwise = highland([]).otherwise(highland([4, 5, 6]));
(otherwise: HighlandStreamT<number>);

const otherwise2 = highland(['a', 'b', 'c']).otherwise(
  highland(['d', 'e', 'f'])
);
(otherwise2: HighlandStreamT<string>);
