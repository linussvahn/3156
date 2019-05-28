const boldify = (str: string, find: string) => {
  str = str.toLocaleLowerCase();
  find = find.toLocaleLowerCase();
  let re = new RegExp(find, "g");
  return { __html: str.replace(re, "<b>" + find + "</b>") };
};

export { boldify };
