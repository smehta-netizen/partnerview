// Helpers used by the generated views.
// on(x): the prototype's <sc-if> test. Treats the string 'false' as false.
export const on = (x) => !!x && x !== 'false';
// list(x): the prototype's <sc-for> source; anything that is not an array renders nothing.
export const list = (x) => (Array.isArray(x) ? x : []);
