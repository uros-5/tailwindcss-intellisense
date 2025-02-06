import { CompletionItem, CompletionItemKind } from "vscode-languageserver";
import { State } from "./state";
import { naturalExpand } from "./naturalExpand";
import * as culori from "culori";
import { formatColor } from "./color";

export function trimClass(className: string): string {
  let parts = className.split(" ")
  let last = parts[parts.length - 1]
  if (last) {
    if (last.trim().length != 0) {
      if (last.includes(":")) {
        const last2 = last.split(":");
        let newLast = last2[last2.length - 1];
        if (newLast) {
          return newLast
        }
        return last
      }
      return last
    }
  }
  return ""
}

export function sortClasses(className: string, lastClass: string, isFirst: boolean, items: CompletionItem[], index: number, state: State): [string, CompletionItem[], boolean] | undefined {
  let precise = className.includes(lastClass);
  if (precise) {
    if (isFirst == false) {
      isFirst = true;
      items = [];
    }
    let sortText = precise ? "-000000000" : naturalExpand(index, state.classList.length);
    return [sortText, items, isFirst]
  }
  return undefined;
}
