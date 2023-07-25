import { Request, Response } from "express";
import { sendEmailToNaturali } from "../../utils/email";

export async function sendEmail(req: Request, res: Response) {
  const { firstName, lastName, email, company, subject, message } = req.body;

  try {
    const send = await sendEmailToNaturali(
      firstName,
      lastName,
      email,
      company,
      message,
      subject
    );
    return res.status(200).json({ success: true, msg: "Email enviado" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, msg: "Error al enviar email" });
  }
}
