import { write, utils } from "xlsx";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

export const renderShort = (address) => {
  if (!address) return "";
  const start = address?.substring(0, 3);
  const end = address.substring(address.length - 3);
  return `${start}...${end}`;
};

export const exportToExcel = (data, filename) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet 1");
  const excelBuffer = write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
  saveAs(dataBlob, filename);
};

export const DownloadImage = async (printRef, theme) => {
  const canvas = await html2canvas(printRef, {
    scale: 2,
    backgroundColor: theme === "dark" ? "#1f1f1f" : "#fff",
  });
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.download = "zkCodex.png";
  link.href = image;
  link.click();
};

export const formatNumber = (number) => {
  if (!number) return 0;
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number);
};
