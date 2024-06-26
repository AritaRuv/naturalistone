import dotenv from "dotenv";
// import path from "path";
dotenv.config({ path: "./src/.env" });
// dotenv.config({ path: "../src/.env" });
import * as postmark from "postmark";

const postmarkApi = "f284c88e-28fe-4c17-858e-899f0b8ebb44";

// Send an email:
const imageNaturaliStone =
  "https://drive.google.com/uc?id=1EpYJ-SvGsqGsDVwjRGYO16oZlVea0KDU";
const client = new postmark.ServerClient(postmarkApi);
const companyName = "NaturaliStone";
const companyAddress = "261 NW 71st St, Miami, FL 33150, United States";
const fromEmail = "irina@naturalistone.com";
const imgDrive =
  "https://netorg8591642-my.sharepoint.com/:i:/g/personal/irina_naturalistone_com/EUJMsPLT2jBLokqZ-cz1SVMBijZhI9_At-atEYcxV48L7Q?e=46P25n";

export function sendEmailUser(resetToken: number, toEmail: string) {
  const optionsEmail = {
    From: fromEmail,
    To: toEmail,
    Subject: "Hello from Postmark",
    HtmlBody: `<strong>Hello</strong> ${resetToken}`,
    TextBody: "Hello from Postmark!",
    MessageStream: "outbound",
  };

  return client.sendEmail(optionsEmail);
}

function sendInvoiceEmail(
  clientEmail,
  name_value,
  invoiceId,
  // naturali_Invoice,
  invoice_details,
  description,
  amount_value,
  total_value,
  date
) {
  const optionsEmail = {
    From: fromEmail,
    To: clientEmail,
    TemplateId: 31786965,
    TemplateModel: {
      product_name: companyName,
      name: name_value, // "name_value"
      image: imageNaturaliStone,
      invoice_id: invoiceId,
      date: date,
      invoice_details: [
        //array for products
        {
          description: description, // description_value name products
          amount: amount_value, // "amount_value" amount products
        },
      ],
      total: total_value, // total value for products
      company_name: companyName,
      company_address: companyAddress,
    },
  };
  return client.sendEmailWithTemplate(optionsEmail);
}

export function sendEmailToNaturali(
  firstName: string,
  lastName: string,
  fromEmail: string,
  company: string,
  body_Value: string,
  subject_value: string
) {
  const optionsEmail = {
    From: "irina@naturalistone.com",
    To: "eduardoasm19@gmail.com",
    TemplateId: 32024830,
    TemplateModel: {
      product_name: companyName,
      body: body_Value,
      company_name: companyName,
      company_address: companyAddress,
      image: imageNaturaliStone,
      subject: subject_value,
    },
  };

  return client.sendEmailWithTemplate(optionsEmail);
}
