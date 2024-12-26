export const stringifyFilter = (filter: any, allowNull?: boolean): string => {
  let filterString = "";
  if (!filter || typeof filter !== "object") {
    return "";
  }
  for (const item in filter) {
    if (
      item &&
      filter[item] !== undefined &&
      filter[item] !== "" &&
      (filter[item] !== null || allowNull)
    ) {
      filterString = filterString ? `${filterString}&` : filterString;
      filterString += `${item}=${filter[item]}`;
    }
  }
  filterString = filterString ? `?${filterString}` : filterString;
  return filterString;
};

export function toProperCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

export function generateRandomId(length = 10) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";
  for (let i = 0; i < length; i++) {
    randomId += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  return randomId;
}

export function truncateText(text: string, charLimit: number): string {
  if (!text) {
    return "";
  }
  if (text.length <= charLimit) {
    return text;
  }

  return text.slice(0, charLimit) + "...";
}

export function getPercentage(currentPage: number, totalPage: number) {
  const percentageRead = (currentPage / totalPage) * 100;
  return percentageRead;
}
