import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { profile } from "../content/profile";

async function main() {
  const output = path.resolve("public/resume.pdf");
  fs.mkdirSync(path.dirname(output), { recursive: true });
  const doc = new PDFDocument({ size: "A4", margins: { top: 38, bottom: 38, left: 48, right: 48 }, info: { Title: `${profile.name} — Résumé`, Author: profile.name, Subject: profile.role } });
  const stream = fs.createWriteStream(output);
  doc.pipe(stream);
  const ink = "#1A201E";
  const muted = "#5F6762";
  const accent = "#B94B30";
  const width = doc.page.width - 96;
  const line = () => { doc.moveTo(48, doc.y).lineTo(doc.page.width - 48, doc.y).lineWidth(.6).strokeColor("#C9CCC3").stroke(); doc.moveDown(.3); };
  const heading = (text: string) => { doc.moveDown(.2).font("Helvetica-Bold").fontSize(9.5).fillColor(accent).text(text.toUpperCase(), { characterSpacing: 1.3 }); doc.moveDown(.18); };

  doc.fillColor(ink).font("Helvetica-Bold").fontSize(27).text(profile.name, { characterSpacing: -.7 });
  doc.moveDown(.18).font("Helvetica").fontSize(10.5).fillColor(accent).text(profile.role);
  const socials = Object.values(profile.socialLinks).map(link => link.replace(/^https?:\/\//, ""));
  doc.moveDown(.35).fontSize(8.5).fillColor(muted).text([profile.location, profile.email, ...socials].join("   ·   "), { width });
  doc.moveDown(.35).fontSize(9.5).fillColor(ink).text(profile.summary, { width, lineGap: 2 });
  line();

  heading("Experience");
  for (const item of profile.experience) {
    doc.font("Helvetica-Bold").fontSize(10.5).fillColor(ink).text(item.role, { continued: true, width: width - 120 });
    doc.font("Helvetica").fontSize(8.5).fillColor(muted).text(item.dates, { align: "right", continued: false });
    doc.font("Helvetica-Bold").fontSize(9).fillColor(accent).text(`${item.company}  ·  ${item.location}`);
    doc.moveDown(.18);
    doc.font("Helvetica").fontSize(8.2).fillColor(ink).list(item.bullets, {
      width,
      bulletIndent: 9,
      textIndent: 17,
      lineGap: 0,
      paragraphGap: 1,
    });
    doc.moveDown(.32);
  }

  heading("Selected project");
  const project = profile.projects[0];
  doc.font("Helvetica-Bold").fontSize(9.5).fillColor(ink).text(`${project.name} — ${project.label}`, { continued: true });
  doc.font("Helvetica").fontSize(8).fillColor(accent).text(`   ${project.url}`);
  doc.moveDown(.15).font("Helvetica").fontSize(8.4).fillColor(ink).text(`${project.role}. ${project.outcome}`, { width, lineGap: 1 });
  doc.moveDown(.25);

  heading("Skills");
  for (const group of profile.skills) {
    doc.font("Helvetica-Bold").fontSize(8.4).fillColor(ink).text(`${group.title}: `, { continued: true });
    doc.font("Helvetica").fontSize(8.2).fillColor(ink).text(group.items.join(" · "), { width, lineGap: 1 });
    doc.moveDown(.12);
  }
  heading("Certifications");
  doc.font("Helvetica").fontSize(7.6).fillColor(ink);
  profile.certifications.forEach((credential, index) => {
    if (index > 0) doc.text("   ·   ", { width, continued: true });
    doc.text(credential.name, {
      width,
      continued: index < profile.certifications.length - 1,
      link: credential.url,
    });
  });
  heading("Recognition");
  for (const item of profile.recognition) {
    doc.font("Helvetica").fontSize(7.8).fillColor(ink).text(item.name, { width, lineGap: 0, link: item.url });
  }
  heading("Education");
  doc.font("Helvetica-Bold").fontSize(8.6).fillColor(ink).text(`${profile.education.degree} — ${profile.education.field}`);
  doc.font("Helvetica").fontSize(8.2).fillColor(muted).text(`${profile.education.institution}  ·  ${profile.education.dates}`);
  doc.end();
  await new Promise<void>((resolve, reject) => { stream.on("finish", resolve); stream.on("error", reject); });
  console.log(`Generated ${output}`);
}

main().catch(error => { console.error(error); process.exitCode = 1; });
