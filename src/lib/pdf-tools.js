import PdfPrinter from "pdfmake";

export const getPDFReadebleStream = (blogPost) => {
  const fonts = {
    Helvetica: {
      normal: "Helvetica",
      bold: "Helvetica",
    },
  };

  const printer = new PdfPrinter(fonts);

  const docDefinition = {
    content: [
      /*  {
        image: `${blogPost.author.avatar} `,
        fit: [100, 100],
      }, */
      {
        text: `${blogPost.author.name} `,
        style: "header",
      },
      `${blogPost.title} \n\n`,

      `${blogPost.content}\n\n`,

      {
        text: `${blogPost.createdAt}\n\n`,
        style: ["quote", "small"],
      },
      /*  {
        image: `${blogPost.cover} `,
        fit: [100, 100],
      }, */
      { qr: `${blogPost.cover}` },
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
      },
      subheader: {
        fontSize: 15,
        bold: true,
      },
      small: {
        fontSize: 8,
      },
    },
    defaultStyle: {
      font: "Helvetica",
    },
  };

  const option = {
    filename: "myfile.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: true },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  const pdfReadableStream = printer.createPdfKitDocument(docDefinition, option);
  console.log(pdfReadableStream);
  pdfReadableStream.end();
  return pdfReadableStream;
};
