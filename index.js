const owner = "csfrey";
const repo = "csfrey";
const path = "documents/resume.md";

const fileUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

async function fetchResumeBlob() {
  try {
    const mdText = await fetch(fileUrl)
      .then((response) => response.json())
      .then((data) => atob(data.content));

    const converter = new showdown.Converter();
    const html = converter.makeHtml(mdText);

    document.getElementById("resume-text").innerHTML = html;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
