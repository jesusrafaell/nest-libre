export default function (terminals: any[]) {
  let list: any[] = [];
  for (let i = 0; i < terminals.length; i++) {
    list.push(terminals[i].id);
  }
  return list;
}
