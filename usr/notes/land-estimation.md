# Estimating Land Requirements

```
(r, y, s=0, h=1) => ((r*365)/(y*h)) + (s ? ((r*365)/(y/s)/y) : 0)
```

## Input

- The **daily requirement** in grams per day. This should be
  in a form for long-term storage.

- The **organic yield** in grams per square metre. If no organic
  yield statistics are available, then a chemical yield statistic
  can be used and [reduced by 20%](https://www.sciencedirect.com/science/article/pii/S0308521X1100182X).

- The **seed rate**, or the amount to be planted, in grams per
  square metre. If this doesn't apply, then it should be *0*.

- The **hulled fraction**, or the amount left after removing
  the hulls. This should be a unit interval, e.g. if *40%* is lost,
  and *60%* remains, then this should be *0.6*. If dehulling doesn't
  apply, then this should be *1*.

## Method

- The *yearly requirement* is the *daily requirement*
  multiplied by *365*.

- The *hulled yield* is the *organic yield* reduced to the
  *hulled fraction*.

- The *dietary land requirement* is the *yearly requirement*
  divided by the *hulled yield*.

- The *harvest ratio* is the *organic yield* divided by the
  *seed rate*.

- The *seed land requirement* is the *yearly requirement*
  divided by the *harvest ratio*, divided by the *organic yield*,
  or *0* if no *seed rate* is given.

- The *result* is the *dietary land requirement* plus
  the *seed land requirement*.
