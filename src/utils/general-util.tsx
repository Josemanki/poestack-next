import { ImageLoaderProps } from "next/dist/client/image";

import { ItemGroup, StashViewItemSummary } from "@generated/graphql";

export class GeneralUtils {
  public static compactNumberFormat(number: number): string {
    let formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
  }

  public static roundToFirstNoneZeroN(number: number): number {
    return +number.toFixed(
      Math.max(Math.min(1 - Math.floor(Math.log(number) / Math.log(10)), 99), 0)
    );
  }

  public static capitalize(
    str: string | undefined | null
  ): string | undefined | null {
    if (!str) return str;

    return str
      ?.trim()
      ?.split(" ")
      .map((w) => {
        return w[0].toUpperCase() + w.slice(1);
      })
      .join(" ");
  }

  public static itemGroupToDisplayName(
    itemGroup: ItemGroup | undefined | null
  ): string {
    if (!itemGroup) return "";

    return (
      GeneralUtils.capitalize(itemGroup?.displayName ?? itemGroup?.key) ?? ""
    );
  }

  public static chaosToDivPlusChaos(
    divRate: number,
    totalChaos: number,
    useEmotes: boolean = true
  ): string {
    if (totalChaos < divRate) {
      return `${GeneralUtils.roundToFirstNoneZeroN(totalChaos!)}${
        useEmotes ? " :chaos:" : "c"
      }`;
    }

    const div = Math.floor(totalChaos / divRate);
    const chaos = Math.round(totalChaos % divRate);
    const divMsg = `${Math.floor(totalChaos / divRate)}${
      useEmotes ? " :divine:" : " div"
    }`;
    return (
      (div > 0 ? divMsg : "") +
      (chaos > 0 ? ` + ${chaos}${useEmotes ? " :chaos:" : "c"}` : "")
    );
  }

  public static debounce(func, delay = 80) {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  public static random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  public static hashPropValue(prop): number | string | boolean | null {
    if (prop["nValue"] !== undefined) return prop["nValue"];
    if (prop["bValue"] !== undefined) return prop["bValue"];
    if (prop["sValue"] !== undefined) return prop["sValue"];
    return prop["value"];
  }
}

export const myLoader = (p: ImageLoaderProps) => {
  return `${p.src}`;
};
